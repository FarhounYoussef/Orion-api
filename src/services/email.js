import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  name: 'smtp.mailtrap.io',
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '37be9c4a66a4b5',
    pass: 'f5a6dfce245ec9',
  },
});

export default transport;
