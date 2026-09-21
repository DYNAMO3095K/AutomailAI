import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.static('./'));

console.log("--- SYSTEM CHECK ---");
if (!process.env.GEMINI_API_KEY) {
    console.log("❌ ERROR: No GEMINI_API_KEY found in .env!");
} else {
    console.log("✅ All API keys and secrets loaded.");
}
console.log("--------------------");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- ROUTE 1: GENERATE EMAIL ---
app.post('/generate-email', async (req, res) => {
    try {
        console.log("📩 Received draft request...");
        const { prompt } = req.body;

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: "You are 'Automail', a professional assistant. Provide ONLY the subject line and email body without conversational filler."
        });

        const result = await model.generateContent(prompt);
        const emailDraft = result.response.text();

        console.log("🤖 AI generated the draft successfully.");
        res.json({ draft: emailDraft });

    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);
        res.status(500).json({ error: "Failed to generate email content." });
    }
});

// --- ROUTE 2: SEND EMAIL (Multiple Recipients, BCC, & Multiple Attachments) ---
app.post('/send-email', async (req, res) => {
    // Catch the 'attachments' array from the frontend
    const { accessToken, senderEmail, to, bcc, body, subject, attachments } = req.body;

    if (!accessToken) {
        return res.status(401).json({ error: "Unauthorized: Missing Access Token" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: senderEmail, 
                accessToken: accessToken 
            }
        });

        const mailOptions = {
            from: senderEmail, 
            to: to,
            bcc: bcc,
            subject: subject || "Sent via Automail AI",
            text: body
        };

        // If the attachments array exists and has files, map them for Nodemailer
        if (attachments && attachments.length > 0) {
            mailOptions.attachments = attachments.map(att => ({
                filename: att.name,
                content: att.data.split("base64,")[1], 
                encoding: 'base64'
            }));
            console.log(`📎 Processing ${attachments.length} attachment(s)`);
        }

        await transporter.sendMail(mailOptions);
        console.log("✅ Email successfully sent!");
        res.json({ success: true });

    } catch (error) {
        console.error("❌ Email Delivery Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Automail server active at http://localhost:${PORT}`);
});