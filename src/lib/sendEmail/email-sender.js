import { createTransport } from "nodemailer"
import { BREVO_EMAIL_TOKEN, BREVO_HOST, BREV_PORT, PLATFORM_EMAIL } from "../env/env.js"

let transporter = createTransport({
    host: BREVO_HOST,
    port: BREV_PORT,
    auth: {
        user: PLATFORM_EMAIL,
        pass: BREVO_EMAIL_TOKEN
    }
})

export const mailSender = (receiverEmail) => {
    let mailOptions = {
        from: PLATFORM_EMAIL,
        to: receiverEmail,
        subject: 'Regarding resource',
        text: `Hi sample , There is a resource share with you`
    }

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log('finding some error', error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}

// mailSender()