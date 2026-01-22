import { InjectRepository } from "@nestjs/typeorm";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { User } from "src/common/entities/user.entity";
import { Repository } from "typeorm";
import { Server  , WebSocket} from "ws";

interface Client {
    id: string;
    username?: string;
    send(data: string): void;
    readyState: number; 
}

@WebSocketGateway(8080, { path: '/ws' })

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
    @WebSocketServer()
    server: Server

    private clients: Map<string, Client> = new Map();

    async handleConnection(client: Client) {
        const userId = (client as any).userId || (client as any).handshake?.query?.userId;

        if (!userId) {
            client.send(JSON.stringify({ type: 'error', message: 'Unauthorized' }));
            return;
        }

        client.id = userId;
        client.username = await this.getUsername(userId);
        this.clients.set(client.id, client);
        console.log('Client connected:', client.id);

        this.sendToClient(client, { type: 'system', message: 'Welcome to the chat!', timestamp: new Date().toISOString() });

        this.broadcast({ type: 'system', message: 'A new user has joined the chat.', timestamp: new Date().toISOString() });
    }


    async handleDisconnect(client: Client) {
        console.log('Client disconnected:', client.id);

        this.clients.delete(client.id);

        this.broadcast({ type: 'system', message: `A user ${client.id} has left the chat.`, timestamp: new Date().toISOString() }, client.id);
    }


    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any,
        @ConnectedSocket() client: Client) {
        const messageData = {
            type: 'message',
            senderId: client.username || 'anonymous',
            message: data.message,
            timestamp: new Date().toISOString(),
        };

        this.broadcast(messageData);
    }

    @SubscribeMessage('typing')
    handleTyping(@MessageBody() data: any,
        @ConnectedSocket() client: Client) {
        const typingData = {
            type: 'typing',
            senderId: client.username || 'anonymous',
            isTyping: data.isTyping,
        };

        this.broadcast(typingData, client.id);
    }

    private sendToClient(client: Client, data: any) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    }

    private broadcast(data: any, excludeId?: string) {
        this.clients.forEach((client, id) => {
            if (id !== excludeId && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }

    private async getUsername(userId: string) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        return user ? user.name : 'anonymous';
    }
}

