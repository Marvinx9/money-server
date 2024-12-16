import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TransationsModule } from './transactions/services/transactionsServices.module';
import { UserModule } from './users/usuario.module';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        UserModule,
        TransationsModule,
        SharedModule,
    ],
})
export class AppModule {}
