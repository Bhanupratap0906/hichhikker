import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // #region swagger setup 
  const config = new DocumentBuilder()
    .setTitle('Hichhikker API')
    .setDescription('The Hichhikker API description')
    .setVersion('1.0')
    .addTag('Hichhikker')
    .build();
 
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);



  // #region ws adptor
  app.useWebSocketAdapter(new WsAdapter(app));
 


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
  