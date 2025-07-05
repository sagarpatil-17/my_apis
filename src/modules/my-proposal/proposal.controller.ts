import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProposalService } from "./proposal.service";
import { ProposalDto } from "./dto/proposal.dto";
import { PickupLineDto, PickupLineRepDto } from "./dto/pickupLine.dto";

@ApiTags('ProposalController')
@Controller('proposal')
export class ProposalController {
    constructor(private readonly proposalService: ProposalService) { }

    @Post('response')
    async getResponse(@Body() dto: ProposalDto) {
        return await this.proposalService.getResponse(dto);
    }

    @Get('pickup_line')
    async getPickupLine() {
        return await this.proposalService.getPickupLine();
    }

    @Post('add_pickup_line')
    async addPickupLine(@Body() dto: PickupLineDto) {
        return await this.proposalService.addPickupLine(dto);
    }

    @Post('pickup_line_response')
    async pickupLineResponse(@Body() dto: PickupLineRepDto) {
        return await this.proposalService.pickupLineResponse(dto);
    }
}