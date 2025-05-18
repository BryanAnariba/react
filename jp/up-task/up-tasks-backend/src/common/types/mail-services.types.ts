export type MailOptions = {
  from: string; // sender address '"Tu App" <tu-email@gmail.com>'
  to: string;
  text: string;
  subject: string; // Subject line 'Reactivación de cuenta'
  html: string;
};

export type SentMessageInfo = {
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
  accepted: string[];
  rejected: string[];
  pending?: string[];
  response: string;
  // otros campos adicionales
}

