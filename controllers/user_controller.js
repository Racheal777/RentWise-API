import { secret, SMTP_PASS, SMTP_USER } from "../index.js";
import { User } from "../models/user_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';


const otpGenerator = (length = 6) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10)
    }
    return otp;
};

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    console.log('userData', firstName, lastName, email, password, role)

    const findUser = await User.findOne({ email })
    console.log(findUser, "found")

    if (findUser) {
        return res.status(200).json({ message: `User already exist`});
    } else {
        const hashPassword = await bcrypt.hash(password, 12);
        console.log("hashPassword", hashPassword)

        const otp = otpGenerator(4);

        // const fullName = new req.Data(req.firstName + req.lastName);

        const saveUserData = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role: role,
            otp: otp,
            otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000)
        })

        // send token for verification using nodemailer

        // // Create a transporter for SMTP
        // const transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     secure: false, // upgrade later with STARTTLS
        //     auth: {
        //         user: SMTP_USER,
        //         pass: SMTP_PASS,
        //     },
        // });

        // try {
        //     const info = await transporter.sendMail({
        //         from: '"RentWise Team" <RentWiseteam@gmail.com>', // sender address
        //         to: findUser, // list of receivers
        //         subject: "OTP MESSAGE", // Subject line
        //         text: `Verify your account with this OTP:${otp}`,  // plain text body
        //         html: `<b>${otp} Deactivates within 5mins </b>`, // html body
        //     });

        //     console.log("Message sent: %s", info.messageId);
        //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // } catch (err) {
        //     console.error("Error while sending mail", err);
        // }

        // secrete key with jwt
        console.log(`Secret key: ${secret}`)
        const token = jwt.sign(
            { id: saveUserData.id },
            secret,
            { expiresIn: "1h" }
        )
        console.log("token", token);
        return res.status(201).json({ user: saveUserData, token: token });

    };
};


export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) 
        return res.status(401).json({ message: 'Invalid credentials' });
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) 
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};