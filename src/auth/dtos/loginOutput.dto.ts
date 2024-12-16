import { ApiProperty } from '@nestjs/swagger';

export class LoginOutputDto {
    @ApiProperty({ description: 'token de acesso', example: 'hashedsenha' })
    access_token: string;

    @ApiProperty({ description: 'identificador do usuário', example: '213874' })
    id: string;

    @ApiProperty({ description: 'nome do usuário', example: 'usuario.exemplo' })
    name: string;

    @ApiProperty({
        description: 'email do usuário',
        example: 'usuario@gmail.com',
    })
    e_mail: string;
}
