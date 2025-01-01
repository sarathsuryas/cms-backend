import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class UserDto {
    @IsNotEmpty({message:"name must not bet empty"})
    @Matches(/^[A-Za-z]+$/, {
        message: 'Name must contain alphabets only',
      })
    readonly username: string;

    @IsNotEmpty({message:"email must not be empty"})
    @IsEmail({},{message:"email is not valid"})
    readonly email: string;

    @IsNotEmpty({message:"password is mandatory"})
    @MinLength(6,{message:"password length at least 6"})
    readonly password: string;

}