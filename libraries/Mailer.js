const mg = require("nodemailer-mailgun-transport")
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const juice = require('juice')
const {htmlToText} = require('html-to-text')
const dotenv = require('dotenv')

const Mailer = {

    mailgunAuth: {
        auth: {
            api_key: process.env.MAILGUN_KEY,
            domain: process.env.MAILGUN_DOMAIN
        }
    },

    sendMail: (option, file, vars, callback) => {
        const smtp = nodemailer.createTransport(mg(Mailer.mailgunAuth))

        const TemplatePath = path.join(__dirname, '../templates/'+file+'.html')
        if (fs.existsSync(TemplatePath)) {
            const template = fs.readFileSync(TemplatePath, 'utf-8')
            const html = ejs.render(template, vars)
            const text = htmlToText(html)
            const styledHtml = juice(html)

            option.html = styledHtml
            option.text = text
        }
        smtp.sendMail(option, (err, info) => {
            if (err) {
                return callback(err)
            } else {
                return callback(info)
            }
        })
    }
}

module.exports = Mailer