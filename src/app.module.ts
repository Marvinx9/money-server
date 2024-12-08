import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TransationsModule } from './transactions/services/transactionsServices.module';
import { UserModule } from './users/usuario.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SharedModule,
        TransationsModule,
        UserModule,
    ],
})
export class AppModule {}
