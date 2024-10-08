require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
})); // Allow requests from different origins (for cross-domain form submissions)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { firstName, lastName, areaCode, telNum, email, contactRadios, feedback } = req.body;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use any email service, like SendGrid, SMTP, etc.
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password (or app-specific password)
        },
        secure: true,
        tls:{
            rejectUnauthorized: false
        }
    });

    // Create email options
    const mailOptions = {
        from: email, // Sender address
        to: process.env.RECIPIENT_EMAIL, // Recipient (your email to receive notifications)
        subject: 'New Session Booking', // Email subject
        text: `
        You have a new session booking:

        Name: ${firstName} ${lastName}
        Contact Number: (${areaCode}) ${telNum}
        Email: ${email}
        Preferred Contact Method: ${contactRadios}
        About Me: ${feedback}
        `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error while sending mail: ", error);
            return res.status(500).json({ message: 'Error sending email', error });
        }
        console.log('Email sent: ', info.response);
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
