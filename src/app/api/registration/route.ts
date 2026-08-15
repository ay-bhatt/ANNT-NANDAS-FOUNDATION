import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      type,
      name,
      email,
      phone,
      whatsapp,
      gender,
      dob,
      address,
      emergencyContact,
      occupation,
      skills,
      availability,
      category,
      experience,
      position,
      qualifications,
    } = data;

    if (!name || !email || !phone || !address) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // 1. SAVE REGISTRATION TO BACKEND
    // --------------------------------

    const registrationsDir = path.join(process.cwd(), "data");
    const registrationsFile = path.join(
      registrationsDir,
      "registrations.json"
    );

    await fs.mkdir(registrationsDir, { recursive: true });

 type Registration = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  gender: string;
  dob: string;
  address: string;
  emergencyContact: string;
  occupation: string;
  skills: string;
  availability: string;
  category: string;
  experience: string;
  position: string;
  qualifications: string;
  submittedAt: string;
};

let registrations: Registration[] = [];

    try {
      const existingData = await fs.readFile(
        registrationsFile,
        "utf-8"
      );

      registrations = JSON.parse(existingData);

      if (!Array.isArray(registrations)) {
        registrations = [];
      }
    } catch {
      registrations = [];
    }

    const registration = {
      id: `REG-${Date.now()}`,
      type: type || "general",
      name,
      email,
      phone,
      whatsapp: whatsapp || "",
      gender: gender || "",
      dob: dob || "",
      address,
      emergencyContact: emergencyContact || "",
      occupation: occupation || "",
      skills: skills || "",
      availability: availability || "",
      category: category || "",
      experience: experience || "",
      position: position || "",
      qualifications: qualifications || "",
      submittedAt: new Date().toISOString(),
    };

    registrations.push(registration);

    await fs.writeFile(
      registrationsFile,
      JSON.stringify(registrations, null, 2),
      "utf-8"
    );

    // --------------------------------
    // 2. SEND EMAIL
    // --------------------------------

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const registrationType =
      type?.charAt(0).toUpperCase() + type?.slice(1);

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;color:#1e293b">

        <div style="
          background:linear-gradient(135deg,#2563eb,#16a34a);
          padding:25px;
          border-radius:12px 12px 0 0;
        ">
          <h1 style="color:white;margin:0">
            New ${registrationType} Registration
          </h1>

          <p style="color:white;margin-bottom:0">
            ANNT NANDAS FOUNDATION
          </p>
        </div>

        <div style="
          padding:25px;
          border:1px solid #e2e8f0;
          border-top:none;
        ">

          <p>
            <strong>Registration ID:</strong>
            ${registration.id}
          </p>

          <h2 style="color:#2563eb">
            Personal Information
          </h2>

          <p><strong>Registration Type:</strong> ${registrationType}</p>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp || "Not provided"}</p>
          <p><strong>Gender:</strong> ${gender || "Not provided"}</p>
          <p><strong>Date of Birth:</strong> ${dob || "Not provided"}</p>
          <p><strong>Occupation:</strong> ${occupation || "Not provided"}</p>
          <p><strong>Emergency Contact:</strong> ${emergencyContact || "Not provided"}</p>

          <h2 style="color:#16a34a">
            Address
          </h2>

          <p>${address}</p>

          ${
            type === "volunteer"
              ? `
                <h2 style="color:#2563eb">
                  Volunteer Information
                </h2>

                <p>
                  <strong>Skills / Expertise:</strong>
                  ${skills || "Not provided"}
                </p>

                <p>
                  <strong>Availability:</strong>
                  ${availability || "Not provided"}
                </p>
              `
              : ""
          }

          ${
            type === "running"
              ? `
                <h2 style="color:#2563eb">
                  Running Information
                </h2>

                <p>
                  <strong>Running Category:</strong>
                  ${category || "Not provided"}
                </p>

                <p>
                  <strong>Previous Experience:</strong>
                  ${experience || "Not provided"}
                </p>
              `
              : ""
          }

          ${
            type === "employee"
              ? `
                <h2 style="color:#2563eb">
                  Employment Information
                </h2>

                <p>
                  <strong>Position Applied For:</strong>
                  ${position || "Not provided"}
                </p>

                <p>
                  <strong>Qualifications:</strong>
                  ${qualifications || "Not provided"}
                </p>
              `
              : ""
          }

          <hr style="
            margin:30px 0;
            border:none;
            border-top:1px solid #e2e8f0;
          "/>

          <p style="font-size:12px;color:#64748b">
            This registration was submitted through the
            ANNT NANDAS FOUNDATION website.
          </p>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"ANNT NANDAS FOUNDATION" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New ${registrationType} Registration - ANNT NANDAS FOUNDATION`,
      html: emailHtml,
    });

    // --------------------------------
    // 3. RETURN SUCCESS
    // --------------------------------

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully.",
      registrationId: registration.id,
    });

  } catch (error) {
    console.error("REGISTRATION ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit registration. Please try again later.",
      },
      { status: 500 }
    );
  }
}