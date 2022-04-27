import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserSerializer } from './user.model';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) createUserDTO: CreateUserDTO): Promise<UserSerializer> {
        return this.authService.signUp(createUserDTO);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) createUserDTO: CreateUserDTO): Promise<UserSerializer> {
        return this.authService.signIn(createUserDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req.user)
    }
}
