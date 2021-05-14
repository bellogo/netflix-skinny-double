import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let hostURL = "https://netflix-skinny-double.herokuapp.com";
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  hostURL = `http://localhost:${process.env.PORT || 3000}`;
}

const msg = {
  from: `Netflix-skinny-double <${process.env.SENDGRID_EMAIL}>`,
  mail_settings: {
    sandbox_mode: {
      enable: false
    }
  }
};

export default class {
  static sandboxMode() {
    msg.mail_settings.sandbox_mode.enable = true;
  }

  static async sendVerificationEmail(email, userName) {
    const link = `${hostURL}/api/v1/user/verify/${email}`;
    msg.to = email;
    msg.subject = "Welcome to Netflix-skinny-double! Confirm Your Email";
    msg.html = `<div style ="background-color: rgb(227, 223, 222); width:100%">
    <div style= "display: flex; padding-top: 50px; ">
      <div style= "line-height: 1.6; margin: auto; text-align: left; width: 50%; padding-top: 50px; background-color: white; margin-bottom:20px;">
      <div><p style ="text-align: center; font-size: 40px; margin: auto; width: 70%; padding-bottom:50px">Welcome to Netflix-skinny-double!</p></div>
      <p style="margin: 10px">Dear <strong>${userName}</strong>,</p> 
      <div style="margin: 10px">
          <p>Thank you for joining Netflix-skinny-double.<br> Please click the button below to confirm your email address</p>
        </div>
            <a href="${link}" style ="text-decoration:none; padding:5px 15px;color:white;background-color:rgb(75,203,250);font-weight:bold; border-radius:30px;
            margin: 18px; width:40%;">Verify Me</a>
              <div style= "padding-top:20px; margin-bottom: 20px; display:flex; justify-content:center">
            <p style = "font-variant: small-caps; opacity: 0.5; margin: 10px;">Regards, Netflix-skinny-double Team!</p>
          </div>
      </div>
  </div>`;
    try {
      await sgMail.send(msg);
    } catch (err) {
      return err;
    }
  }
}
