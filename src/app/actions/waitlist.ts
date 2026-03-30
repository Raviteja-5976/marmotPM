"use server";

import nodemailer from "nodemailer";
import { Client, Databases, ID, Query } from "node-appwrite";

// Appwrite setup
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID || "")
  .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DB_ID = process.env.APPWRITE_DB_ID || "";
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID || "";

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendWaitlistOtp(formData: FormData) {
  const email = formData.get("email")?.toString();

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.APPWRITE_PROJECT_ID) {
    return { success: false, error: "Server configuration missing." };
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Check if user already exists
    const existingUsers = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal("email", email)
    ]);

    if (existingUsers.documents.length > 0) {
      const userDoc = existingUsers.documents[0];
      if (userDoc.verified) {
        return { success: true, alreadyExists: true, message: "You are already in the waitlist." };
      } else {
        // Update existing user's OTP
        await databases.updateDocument(DB_ID, COLLECTION_ID, userDoc.$id, {
          OTP: otp,
        });
      }
    } else {
      // Create new user
      await databases.createDocument(DB_ID, COLLECTION_ID, ID.unique(), {
        email: email,
        OTP: otp,
        verified: false,
      });
    }

    // Send OTP email
    const transporter = getTransporter();
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

    const mailOptions = {
      from: `"no-reply MarmotPM" <${fromEmail}>`,
      to: email,
      subject: "Your MarmotPM Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdf9f3; padding: 30px; border-radius: 12px; border: 1px solid #e5e7eb;">
          <center>
            <img src="cid:marmotlogo" alt="MarmotPM Logo" style="width: 80px; height: 80px; margin-bottom: 10px; display: block;" />
            <h1 style="color: #6d4c41; margin-bottom: 20px;">Verify your email</h1>
            <p style="color: #4b5563; font-size: 16px;">Here is your 6-digit confirmation code:</p>
            <div style="background-color: #fff; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #ea580c; display: inline-block; margin: 20px 0; text-align: center;">
              ${otp}
            </div>
            <p style="color: #4b5563; font-size: 14px; margin-top: 30px;">
              If you didn't request this, please ignore this email.
            </p>
          </center>
        </div>
      `,
      text: `Verify your email. Your 6-digit confirmation code is: ${otp}`,
      attachments: [{
        filename: 'marmot-logo.png',
        path: process.cwd() + '/public/logo/marmot-logo.png',
        cid: 'marmotlogo'
      }]
    };

    await transporter.sendMail(mailOptions);
    return { success: true, email };

  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return { success: false, error: "Failed to send OTP. Please try again." };
  }
}

export async function verifyWaitlistOtp(email: string, otpInput: string) {
  try {
    const existingUsers = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal("email", email)
    ]);

    if (existingUsers.documents.length === 0) {
      return { success: false, error: "Email not found. Please sign up first." };
    }

    const userDoc = existingUsers.documents[0];
    
    // Check if OTP matches
    const storedOtp = userDoc.OTP.toString();
    if (storedOtp !== otpInput.toString()) {
      return { success: false, error: "Invalid OTP. Please try again." };
    }

    if (userDoc.verified) {
      return { success: true }; // already verified
    }

    // Mark as verified
    await databases.updateDocument(DB_ID, COLLECTION_ID, userDoc.$id, {
      verified: true
    });

    // Send Final welcome email from founder
    const transporter = getTransporter();
    const fromEmail = process.env.SMTP_USER; 
    
    const mailOptions = {
      from: `"Founder MarmotPM" <${fromEmail}>`, 
      to: email,
      subject: "Welcome to MarmotPM Waitlist! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fdf9f3; padding: 30px; border-radius: 12px; border: 1px solid #e5e7eb;">
          <center>
            <img src="cid:marmotlogo" alt="MarmotPM Logo" style="width: 80px; height: 80px; margin-bottom: 10px; display: block;" />
          </center>
          <h1 style="color: #6d4c41; margin-bottom: 20px; text-align: center;">You're officially on the list!</h1>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Hi there,
          </p>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Thank you for joining the MarmotPM waitlist! We are absolutely thrilled to have you on board.
            You'll be the first to know when we launch our AI Project Manager.
          </p>
          <p style="color: #4b5563; font-size: 14px; margin-top: 40px; border-top: 1px solid #d1d5db; padding-top: 20px;">
            Cheers,<br>
            <strong>The MarmotPM Team</strong>
          </p>
        </div>
      `,
      text: `You're officially on the list! Thank you for joining the MarmotPM waitlist. You'll be the first to know when we launch our AI Project Manager.`,
      attachments: [{
        filename: 'marmot-logo.png',
        path: process.cwd() + '/public/logo/marmot-logo.png',
        cid: 'marmotlogo'
      }]
    };

    await transporter.sendMail(mailOptions);
    return { success: true };

  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: "Failed to verify code. Please try again." };
  }
}
