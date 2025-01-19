import { Injectable } from "@nestjs/common";
import { ProposalDto } from "./dto/proposal.dto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class ProposalService {
    constructor(private readonly mail: MailerService) { }

    async getResponse(dto: ProposalDto) {
        const yesTemp = `
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
    <h1 style="color: #f472b6;">${dto.hers_name} Said YES! 🎉</h1>
    <p style="font-size: 18px; color: #333333;">Congratulations! ${dto.hers_name} just gave you the best answer in the world.</p>
    <p style="font-size: 16px; color: #666666;">This is the beginning of something beautiful. Cherish every moment together. 💖</p>
</div>
`
        const noTemp = `
<div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
    <h1 style="color: #f44336;">It's a No from ${dto.hers_name}... 💔</h1>
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
}