import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../services/createUser/service/createUser.service';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateUserInputDto } from '../services/createUser/dto/createUserInput.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    @ApiCreatedResponse()
    @ApiBadRequestResponse({ description: 'Usuário já criado com esse e-mail' })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao criar o usuário. Tente novamente!',
    })
    async createUsuario(@Body() data: CreateUserInputDto) {
        await this.createUserService.execute(data);
    }
}
