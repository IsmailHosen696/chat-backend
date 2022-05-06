const nodemailer = require('nodemailer');
const { google } = require("googleapis")
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const P_EMAIL = process.env.P_EMAIL

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendmail(to, token) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: `${P_EMAIL}`,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const options = {
            from: `No Reply <noreply@gmail.com>`,
            to: `${to}`,
            subject: "Verify email account",
            html: `<div style='display:flex;width:100%;flex-direction: column;max-width:500px' >
            <p>Please visite the url to verify your gmail account and start chating with your friend . Thank You</p>
            <a href='http://localhost:3000/auth/verify/user/${token}'>Click here</a>
            </div>`
        }
        const result = await transport.sendMail(options)
        return result
    } catch (error) {
        return error
    }
}
async function forgetpassword(to, token) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: `${P_EMAIL}`,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const options = {
            from: `No Reply <noreplychat@chat.com>`,
            to: `${to}`,
            subject: "Reset password link",
            html: `<div style='display:flex; width:100%; flex-direction: column ; max-width:500px;' >
            <p>Please visite the url to reset your password . The link will expire in 9000 second .Thank You</p>
            <a href='http://localhost:3000/auth/reset/password/${token}'>Click here</a>
            </div>`
        }
        return await transport.sendMail(options)
    } catch (error) {
        return error
    }
}
module.exports = { forgetpassword, sendmail }