import { Module } from '@nestjs/common';
import { PortfolioModule } from './modules/portfolio-contact/portfolio.module';
import { GymModule } from './modules/gym-contact/gym.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestModule } from './modules/test-api/test.module';
import { ProposalModule } from './modules/my-proposal/proposal.module';

@Module({
  imports: [
    TestModule,
    PortfolioModule,
    GymModule,
    ProposalModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.getOrThrow('SMTP_HOST'),
          port: config.getOrThrow<number>('SMTP_PORT'),
          secure: false,
          auth: {
            user: config.getOrThrow('SMTP_AUTH_USER'),
            pass: config.getOrThrow('SMTP_AUTH_PASS'),
          },
        },
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true })
  ],
})
export class AppModule { }
