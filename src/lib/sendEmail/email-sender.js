import { createTransport } from "nodemailer"
import { PASSWORD, USERNAME } from "../env/env.js"

export const mailSender = ({senderEmail,receiverEmail}) => {
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
        text: `Hi ${receiverEmail} , There is a resource share with you by ${senderEmail}`
    }

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log('finding some error', error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}