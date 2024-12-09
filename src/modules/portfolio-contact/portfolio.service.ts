import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service.ts/prisma.service";
import { PortfolioEmailDto } from "./dto/portfolio.dto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class PortfolioService {

    constructor(private readonly prisma: PrismaService, private readonly mail: MailerService) { }

    async sendEmail(dto: PortfolioEmailDto) {
        const contactInfo = await this.prisma.portfolio_contact.create({
            data: dto
        });

        // Email template
        const template = `
<div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    <!-- Header Section -->
    <div style="background-color: #4b9cd3; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">New Form Submission</h1>
        <p style="margin: 5px 0 0; font-size: 16px;">A user submitted a form on <a href="https://portfolio-git-main-sagar-patils-projects-3ef8dd1c.vercel.app/" style="color: #bbdefb; text-decoration: underline;">sagar-patil-portfolio</a>. Here are the details:</p>
    </div>

    <!-- Content Section -->
    <div style="padding: 20px; color: #333333;">
        <div style="margin-bottom: 15px;">
            <strong style="display: block; margin-bottom: 5px;">User name:</strong>
            <span>${dto.user_name}</span>
        </div>
        <div style="margin-bottom: 15px;">
            <strong style="display: block; margin-bottom: 5px;">User email:</strong>
            <span>${dto.user_email}</span>
        </div>
        <div style="margin-bottom: 15px;">
            <strong style="display: block; margin-bottom: 5px;">Subject:</strong>
            <span>${dto.subject}</span>
        </div>
        <div style="margin-bottom: 15px;">
            <strong style="display: block; margin-bottom: 5px;">Message:</strong>
            <p style="margin: 0; line-height: 1.6;">${dto.message}</p>
        </div>
    </div>

    <!-- Footer Section -->
    <div style="background-color: #f3f4f6; text-align: center; padding: 15px; font-size: 14px; color: #666666;">
        <p style="margin: 0;">Thank you for staying connected with us.</p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} sagar-patil-portfolio</p>
    </div>
</div>
`;

        try {
            this.mail.sendMail({
                subject: dto.subject,
                to: 'sagarpatil35137@gmail.com',
                html: template,
                from: 'Portfolio <codeplus26@gmail.com>',
            })
        } catch (error) {
            console.error('Error sending email:', error.message);
        }

        return { message: 'Message sent successfully!', data: contactInfo }

    }
}