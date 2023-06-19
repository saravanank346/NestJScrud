
import * as nodemailer from "nodemailer"


export class node_Mailer{
    private transporter: nodemailer.Transporter;

    constructor() {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '84f70f5c963bbc',
          pass: 'a4dcb5a2ca85ed',
        },
      });
    }
  
    async sendEmail(tokens:string) {
      await this.transporter.sendMail({
        from: 'k.saravanan12001@gmail.com',
        to:"k.saravanan12001@gmail.com",
        subject:"Verify Link",
        html:"<a href='http://localhost:4200/verifyToken/"+tokens+"'>Click here to verify</a>"
        
      });
    }
  }

  
  
  

  
  


