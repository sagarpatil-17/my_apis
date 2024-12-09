import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class PortfolioEmailDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    user_name: string;

    @ApiProperty()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty()
    user_email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subject: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;
}