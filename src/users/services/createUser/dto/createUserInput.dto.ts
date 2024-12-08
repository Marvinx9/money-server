import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserInputDto {
    @ApiProperty({
        description: 'primeiro nome do usuário',
        example: 'Jonhnatah',
    })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({
        description: 'sobrenome do usuário',
        example: 'Santos',
    })
    @IsString()
    @IsNotEmpty()
    sobrenome: string;

    @ApiProperty({
        description: 'email do usuário',
        example: 'jonas@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'senha do usuário', example: 'jonas123' })
    @IsString()
    @IsNotEmpty()
    @Min(4)
    password: string;
}
