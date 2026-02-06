import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { childName, gender, firstName, lastName, email, phone, age, postCode, imageUrl } = body;

        // Validate required fields
        if (!childName || !email || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create a transporter using SMTP2GO credentials from environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'mail.smtp2go.com',
            port: Number(process.env.SMTP_PORT) || 2525, // SMTP2GO usually supports 2525, 80, 465, 587
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.SMTP_SENDER || 'no-reply@tinytalent.uk', // Ensure this sender is verified in SMTP2GO
            to: process.env.ADMIN_EMAIL || 'admin@tinytalent.uk', // Where to send the lead
            subject: `${childName} (${gender}) - EdgeKidLead`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2D3748;">New Model Application Received</h2>
          
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 18px; font-weight: bold; margin: 0;">${childName}</p>
            <p style="margin: 5px 0 0 0; color: #718096;">${age} Years • ${gender}</p>
          </div>

          <h3 style="border-bottom: 1px solid #edf2f7; padding-bottom: 10px;">Parent/Contact Details</h3>
          <p><strong>Parent Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Post Code:</strong> ${postCode}</p>
          
          <div style="margin-top: 20px;">
            <p><strong>Photo:</strong></p>
            <img src="${imageUrl}" alt="Applicant Photo" style="max-width: 100%; border-radius: 8px; border: 1px solid #E2E8F0;" />
            <p><a href="${imageUrl}" target="_blank">View Full Image</a></p>
          </div>
          
          <p style="margin-top: 30px; font-size: 12px; color: #718096;">
            Sent from TinyTalent Application Form via SMTP2GO.
          </p>
        </div>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}
