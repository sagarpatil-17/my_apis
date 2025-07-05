import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PickupLineDto {
    @ApiProperty()
    @IsNotEmpty()
    content: any;
}

export class PickupLineRepDto {
    @ApiProperty()
    @IsNotEmpty()
    pickup_line: any;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    response: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    created_by: string;
}