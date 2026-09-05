export interface EmailContent {
  subject: string;
  html: string;
}

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}
