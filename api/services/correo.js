const config = require('../config')
const nodemailer = require('nodemailer')
const pdfService = require('./pdf')

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.gmailUser, // generated ethereal user
    pass: config.gmailPass, // generated ethereal password
  },
});

async function correo(to, subject){
  try {
    
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      // text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

  } catch (err) {
    
    throw new Error(err)

  }
}

async function correoConfirmation(to){
  try {
    
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject: 'Confirmación de compra ✨', // Subject line
      // text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
      attachments: [{ filename: 'MisCartonesBingoloteando.pdf', content: await pdfService.pdf() }]
    });

  } catch (err) {
    
    throw new Error(err)

  }
}

correoConfirmation('28nicoooo12@gmail.com')

module.exports = {
  correo,
  correoConfirmation,
}