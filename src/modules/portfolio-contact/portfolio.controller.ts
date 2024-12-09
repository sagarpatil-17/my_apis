import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PortfolioService } from "./portfolio.service";
import { PortfolioEmailDto } from "./dto/portfolio.dto";

@ApiTags('PortfolioController')
@Controller('portfolio')
export class PortfolioController {

    constructor(private readonly portfolioService: PortfolioService) { }

    @Post('contact')
    async sendEmail(@Body() dto: PortfolioEmailDto) {
        return await this.portfolioService.sendEmail(dto);
    }

}