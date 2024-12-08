import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthRequest } from '../dtos/authRequest';
import { AuthService } from '../service/login/auth.service';
import {
    ApiBody,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestBody } from '../dtos/loginRequestBody';
import { LoginOutputDto } from '../dtos/loginOutput.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginRequestBody })
    @ApiUnauthorizedResponse({ description: 'Usuário ou senha incorretos!' })
    @ApiResponse({
        type: LoginOutputDto,
    })
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest): Promise<LoginOutputDto> {
        return this.authService.login(req.user);
    }
}
