import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) createUserDTO: CreateUserDTO) {
        return this.authService.signUp(createUserDTO);
    }
}
