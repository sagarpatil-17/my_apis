import { Module } from "@nestjs/common";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";
import { PrismaService } from "src/prisma.service.ts/prisma.service";

@Module({
    controllers: [PortfolioController],
    providers: [PortfolioService, PrismaService]
})

export class PortfolioModule { }