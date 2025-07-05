import { Injectable } from "@nestjs/common";
import { ProposalDto } from "./dto/proposal.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { PrismaService } from "src/prisma.service.ts/prisma.service";
import { PickupLineDto, PickupLineRepDto } from "./dto/pickupLine.dto";

@Injectable()
export class ProposalService {
    constructor(private readonly mail: MailerService, private prisma: PrismaService) { }

    async getResponse(dto: ProposalDto) {
        const yesTemp = `
        <div style="max-width: 600px; margin: auto; background-color: #fbfbfb; padding: 20px; border-radius: 10px; text-align: center;">
    <h1 style="color: #f472b6;">${dto.hers_name} Said YES! 🎉</h1>
    <p style="font-size: 18px; color: #333333;">Congratulations! ${dto.hers_name} just gave you the best answer in the world.</p>
    <p style="font-size: 16px; color: #666666;">This is the beginning of something beautiful. Cherish every moment together. 💖</p>
</div>
`
        const noTemp = `
<div style="max-width: 600px; margin: auto; background-color: #fbfbfb; padding: 20px; border-radius: 10px; text-align: center;">
    <h1 style="color:rgb(226, 70, 59);">It's a No from ${dto.hers_name}... 💔</h1>
    <p style="font-size: 18px; color: #333333;">${dto.reason}</p>
    <p style="font-size: 16px; color: #666666;">But don't lose hope! Sometimes hearts need more time to connect.</p>
</div>
`

        try {
            this.mail.sendMail({
                subject: `${dto.hers_name} said ${dto.response}`,
                to: 'sagarpatil35137@gmail.com',
                html: dto.response == 'yes' ? yesTemp : noTemp,
                from: 'Proposal <codeplus26@gmail.com>',
            })
        } catch (error) {
            console.error('Error sending email:', error.message);
        }

        return { message: 'Response sent successfully!' }
    }

    async getPickupLine() {
        return await this.prisma.pickup_lines.findFirst();
    }

    async addPickupLine(dto: PickupLineDto) {
        await this.prisma.pickup_lines.create({
            data: { content: dto.content }
        })
        return { msg: 'success!' }
    }

    async pickupLineResponse(dto: PickupLineRepDto) {
        await this.prisma.pickup_line_response.create({
            data: {
                pickup_line: dto.pickup_line,
                response: dto.response,
                created_by: dto.created_by
            }
        })
        return { msg: 'success!' }
    }
}