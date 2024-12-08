import { Module } from '@nestjs/common';
import { UserServiceModule } from './services/usuarioService.module';
@Module({
    imports: [UserServiceModule],
    exports: [UserServiceModule],
})
export class UserModule {}
