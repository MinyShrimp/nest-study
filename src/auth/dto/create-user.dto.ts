import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, {
        message: "8자 이상, 20자 이하의 특수문자, 영어, 숫자를 포함해야 합니다."
    })
    password: string;
}