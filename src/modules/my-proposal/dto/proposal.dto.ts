import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProposalDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    hers_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    response: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    reason: string;
}