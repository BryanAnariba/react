import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { SentMessageInfo } from '../types/mail-services.types';

// https://myaccount.google.com/security
// https://myaccount.google.com/apppasswords
// App: UpTaskNestJS

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  public async testConnection(): Promise<void> {
    const result = await this.transporter.verify();
    console.log(`Mail service connection: ${result ? 'OK' : 'Failed'}`);
  }

  public async sendEmailData(mailOptions: MailOptions): Promise<SentMessageInfo> {
    return await this.transporter.sendMail(mailOptions) as SentMessageInfo;
  }
}
