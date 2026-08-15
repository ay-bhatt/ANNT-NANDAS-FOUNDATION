import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ANNT NANDAS FOUNDATION Website" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; color: #1e293b;">

          <div style="
            background: linear-gradient(135deg, #2563eb, #16a34a);
            padding: 25px;
            border-radius: 12px 12px 0 0;
          ">
            <h1 style="color: white; margin: 0;">
              New Contact Message
            </h1>

            <p style="color: white; margin-bottom: 0;">
              ANNT NANDAS FOUNDATION
            </p>
          </div>

          <div style="
            padding: 25px;
            border: 1px solid #e2e8f0;
            border-top: none;
          ">

            <h2 style="color: #2563eb;">
              Contact Information
            </h2>

            <p>
              <strong>Name:</strong> ${name}
            </p>

            <p>
              <strong>Email:</strong> ${email}
            </p>

            <p>
              <strong>Subject:</strong> ${subject}
            </p>

            <h2 style="color: #16a34a;">
              Message
            </h2>

            <div style="
              background: #f8fafc;
              padding: 18px;
              border-radius: 8px;
              line-height: 1.6;
            ">
              ${message}
            </div>

            <hr style="
              margin: 30px 0;
              border: none;
              border-top: 1px solid #e2e8f0;
            " />

            <p style="font-size: 12px; color: #64748b;">
              This message was submitted through the ANNT NANDAS FOUNDATION website.
            </p>

          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
  console.error("========== CONTACT EMAIL ERROR ==========");
  console.error(error);
  console.error("=========================================");

  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Email sending failed",
    },
    { status: 500 }
  );
}
  }