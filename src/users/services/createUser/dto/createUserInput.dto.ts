import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserInputDto {
    @ApiProperty({
        description: 'primeiro nome do usuário',
        example: 'Jonhnatah',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'sobrenome do usuário',
        example: 'Santos',
    })
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty({
        description: 'email do usuário',
        example: 'jonas@gmail.com',
    })
    @IsString()
    @IsNotEmpty()
    e_mail: string;

    @ApiProperty({ description: 'senha do usuário', example: 'jonas123' })
    @IsString()
    @IsNotEmpty()
    @Min(4)
    password: string;
}
