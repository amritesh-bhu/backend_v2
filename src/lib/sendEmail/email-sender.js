import { createTransport } from "nodemailer"
import { PASSWORD, USERNAME } from "../env/env"

export const mailSender = ({senderEmail,receiverEmail,msg}) => {
    let transporter = createTransport({
        service: "gmail",
        auth: {
            user: USERNAME,
            pass: PASSWORD
        }
    })

    let mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: mailSubject,
        text: msg
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('finding some error', error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}