import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRequestBody {
    @ApiProperty({ description: 'email do usuário' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'senha do usuário' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
