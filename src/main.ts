import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation automatique des DTOs (class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // Ignore les champs non définis dans le DTO
      forbidNonWhitelisted: true, // Retourne une erreur si des champs inconnus sont envoyés
      transform: true,       // Convertit automatiquement les types (string → number, etc.)
    }),
  );
  //linkiw fl frontend khassna ndirlo l cors bsh yfahm b3diyat bch ywsl l backend
  // Active CORS pour autoriser les requêtes du frontend Vite (port 5173/5174)
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`SGRH Backend démarré sur http://localhost:${port}`);
}
bootstrap();
