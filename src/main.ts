import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, INestApplication } from '@nestjs/common';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const TIMEZONE: string = '-03:00';
const ENABLECORS: boolean = true;
const BASE_URL: string = 'http://localhost:';

async function bootstrap() {
  dotenv.config();

  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Swagger setup can be added here if needed
  swaggerSetup(app);
  
  process.env.TZ = TIMEZONE;

  if (ENABLECORS) {
    app.enableCors();
  }

  app.useGlobalPipes(new ValidationPipe());

  const port: number = Number(process.env.PORT) || 4000;
  await app.listen(port);

  logStartupMessage(port);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

function swaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal API')
    .setDescription('API do Blog Pessoal desenvolvida com NestJS')
    .setContact('Daniel Ribeiro', 'dann.ribeiroo@gmail.com', 'Contato para suporte')
    .setVersion('1.0')
    .addTag('blog-pessoal')
    .build();
  // Swagger setup can be added here if needed

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
}

function logStartupMessage(port: number) {
  const logger: Logger = new Logger('Startup');

  console.log(
    '\n' + chalk.bold.cyan('╔════════════════════════════════════════╗'),
  );
  console.log(
    chalk.bold.cyan('║') +
    chalk.bold.white('   🚀 SERVER STARTED SUCCESSFULLY! 🚀 ') +
    chalk.bold.cyan('║'),
  );
  console.log(
    chalk.bold.cyan('╚════════════════════════════════════════╝') + '\n',
  );

  console.log(
    chalk.bold.green('✓') +
    chalk.white(' Application: ') +
    chalk.bold.yellow('Blog Pessoal'),
  );
  console.log(
    chalk.bold.green('✓') + chalk.white(' Port: ') + chalk.bold.yellow(port),
  );
  console.log(
    chalk.bold.green('✓') +
    chalk.white(' URL: ') +
    chalk.bold.blue.underline(`${BASE_URL}${port}`),
  );
  console.log(
    chalk.bold.green('✓') +
    chalk.white(' Environment: ') +
    chalk.bold.magenta(process.env.NODE_ENV || 'development'),
  );
  console.log(
    chalk.bold.green('✓') +
    chalk.white(' CORS: ') +
    chalk.bold.green(ENABLECORS ? 'Enabled' : 'Disabled'),
  );
  console.log(
    chalk.bold.green('✓') +
    chalk.white(' Timezone: ') +
    chalk.bold.cyan(TIMEZONE),
  );

  console.log('\n' + chalk.gray('────────────────────────────────────────'));
  console.log(
    chalk.bold.white('  Press ') +
    chalk.bold.red('CTRL+C') +
    chalk.bold.white(' to stop the server'),
  );
  console.log(chalk.gray('────────────────────────────────────────') + '\n');

  logger.log(chalk.green('Server ready to receive requests!'));
}
