import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProposalService } from "./proposal.service";
import { ProposalDto } from "./dto/proposal.dto";

@ApiTags('ProposalController')
@Controller('proposal')
export class ProposalController {
    constructor(private readonly proposalService: ProposalService) { }

    @Post('response')
    async getResponse(@Body() dto: ProposalDto) {
        return await this.proposalService.getResponse(dto);
    }
}