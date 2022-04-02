const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nicruireq.academic@outlook.com',
        subject: 'Welcome to the Task App',
        text: `Welcome to the app, ${name}. Letme know how you get alone with the app'`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nicruireq.academic@outlook.com',
        subject: 'Your cancellation confirmation',
        text: `Dear ${name}, we are sad for your cancellation. Please give us a feedback.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

// SendGrid Example
// sgMail.send({
//     to: 'nicruireq.academic@outlook.com', // Change to your recipient
//     from: 'nicruireq.academic@outlook.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }).then(()=>{
//     console.log('email sent')
// }).catch((e)=>{
//     console.error(e)
// })