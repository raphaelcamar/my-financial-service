import { EmailServiceRepository } from "@core/generic/data/protocols"
import { EmailServiceData } from "@core/generic/domain/entities/mail.entity"
import nodemailer, { Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { UnexpectedError } from "../domain/errors"

export class EmailServiceRepositoryData implements EmailServiceRepository {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>

  constructor(private data: EmailServiceData) {
    this.transporter = this.create()
  }

  private create(): Transporter<SMTPTransport.SentMessageInfo> {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    return transporter
  }

  async send(): Promise<void> {
    await this.transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to: this.data.to,
        subject: this.data.subject,
        text: this.data.text,
        html: this.data?.html,
        attachments: this.data?.attachment,
      })
      .catch(err => {
        throw new UnexpectedError(err)
      })
  }
}
