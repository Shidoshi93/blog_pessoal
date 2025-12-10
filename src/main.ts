import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import chalk from 'chalk';

const TIMEZONE: string = '-03:00';
const ENABLECORS: boolean = true;
const BASE_URL: string = 'http://localhost:';

async function bootstrap() {
  require('dotenv').config();
  
  const logger: Logger = new Logger('Bootstrap');
  const app: any = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  process.env.TZ = TIMEZONE;
  ENABLECORS && app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const port: number = Number(process.env.PORT) || 4000;
  await app.listen(port);

  logStartupMessage(port);
}

bootstrap();

function logStartupMessage(port: number) {
  const logger: Logger = new Logger('Startup');

  console.log('\n' + chalk.bold.cyan('╔════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║') + chalk.bold.white('   🚀 SERVER STARTED SUCCESSFULLY! 🚀 ') + chalk.bold.cyan('║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════╝') + '\n');
  
  console.log(chalk.bold.green('✓') + chalk.white(' Application: ') + chalk.bold.yellow('Blog Pessoal'));
  console.log(chalk.bold.green('✓') + chalk.white(' Port: ') + chalk.bold.yellow(port));
  console.log(chalk.bold.green('✓') + chalk.white(' URL: ') + chalk.bold.blue.underline(`${BASE_URL}${port}`));
  console.log(chalk.bold.green('✓') + chalk.white(' Environment: ') + chalk.bold.magenta(process.env.NODE_ENV || 'development'));
  console.log(chalk.bold.green('✓') + chalk.white(' CORS: ') + chalk.bold.green(ENABLECORS ? 'Enabled' : 'Disabled'));
  console.log(chalk.bold.green('✓') + chalk.white(' Timezone: ') + chalk.bold.cyan(TIMEZONE));
  
  console.log('\n' + chalk.gray('────────────────────────────────────────'));
  console.log(chalk.bold.white('  Press ') + chalk.bold.red('CTRL+C') + chalk.bold.white(' to stop the server'));
  console.log(chalk.gray('────────────────────────────────────────') + '\n');
  
  logger.log(chalk.green('Server ready to receive requests!'));
}