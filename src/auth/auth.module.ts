import { Module } from '@nestjs/common';
import { AuthServiceModule } from './service/authService.module';

@Module({
    imports: [AuthServiceModule],
    exports: [AuthServiceModule],
})
export class AuthModule {}
