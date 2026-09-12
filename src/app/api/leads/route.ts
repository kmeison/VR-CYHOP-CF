import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const NOTIFICATION_RECIPIENTS = [
  "kevin@thexd.co",
  "josh@virtuerealitymedia.com",
  "valen@virtuerealitymedia.com",
];

const TRACKER_SHEET_NAME = "CYHOP VR Site Tracket started Sept 2026.xlsx";
const TRACKER_SHEET_URL =
  "https://netorgft7359623-my.sharepoint.com/:x:/g/personal/kevin_thexd_co/IQBifncx1nTAQICQ1i0Q5_-jAe0zajG78F4OUgscFYjfztg?e=kIcaoP";

interface LeadPayload {
  fullName: string;
  email: string;
  focus?: string;
  phone?: string;
  notes?: string;
  source?: string;
  page?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const focus = String(body.focus || "investor-updates").trim();
    const phone = String(body.phone || "").trim();
    const notes = String(body.notes || "").trim();
    const source = String(body.source || "offering-page").trim();
    const page = String(body.page || "/offering").trim();

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email address are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const now = new Date();
    const timestampIso = now.toISOString();
    const timestampFormatted = now.toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " EST";

    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      timestamp: timestampIso,
      submittedAt: timestampFormatted,
      fullName,
      email,
      focus,
      phone,
      notes,
      source,
      page,
      trackerSheet: TRACKER_SHEET_NAME,
      trackerUrl: TRACKER_SHEET_URL,
      recipients: NOTIFICATION_RECIPIENTS,
    };

    // 1. Persist locally to data/leads.json as audit log / backup
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      const filePath = path.join(dataDir, "leads.json");

      let existingLeads: Array<Record<string, unknown>> = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        existingLeads = JSON.parse(fileContent);
      } catch {
        existingLeads = [];
      }

      existingLeads.push(leadRecord);
      await fs.writeFile(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
    } catch (saveErr) {
      console.warn("Could not persist lead to local audit file:", saveErr);
    }

    // 2. Dispatch to external webhook (e.g., Power Automate / Zapier / Make / SharePoint sync)
    const webhookUrl =
      process.env.LEAD_WEBHOOK_URL ||
      process.env.POWER_AUTOMATE_WEBHOOK_URL ||
      process.env.EXCEL_WEBHOOK_URL ||
      process.env.ZAPIER_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...leadRecord,
            sheetName: TRACKER_SHEET_NAME,
            sharePointUrl: TRACKER_SHEET_URL,
            notificationRecipients: NOTIFICATION_RECIPIENTS,
          }),
        });
      } catch (webhookErr) {
        console.error("Failed to forward lead to webhook:", webhookErr);
      }
    }

    // 3. Dispatch direct email notifications via Resend if API key is provided
    if (process.env.RESEND_API_KEY) {
      try {
        const emailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
            <h2 style="color: #0f172a; margin-bottom: 8px;">New CYHOP Site Submission: Stay Close to the Launch</h2>
            <p style="color: #64748b; font-size: 14px; margin-top: 0;">A new lead has submitted their interest on the CYHOP site.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Full Name:</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${phone}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Interest Area:</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${focus}</td>
              </tr>
              ${notes ? `
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Notes:</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${notes}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Submitted From:</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${page} (${source})</td>
              </tr>
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Timestamp:</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${timestampFormatted}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 6px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #334155;">Tracked in Excel Workbook:</p>
              <a href="${TRACKER_SHEET_URL}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 16px; border-radius: 6px; font-size: 14px; font-weight: 500;">
                Open ${TRACKER_SHEET_NAME}
              </a>
            </div>
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "CYHOP Launch <notifications@virtuerealitymedia.com>",
            to: NOTIFICATION_RECIPIENTS,
            subject: `New CYHOP Launch Lead: ${fullName} (${focus})`,
            html: emailHtml,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send notification email via Resend:", emailErr);
      }
    }

    // 4. SendGrid fallback
    if (process.env.SENDGRID_API_KEY) {
      try {
        await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: NOTIFICATION_RECIPIENTS.map((em) => ({ email: em })),
              },
            ],
            from: {
              email: process.env.SENDGRID_FROM_EMAIL || "notifications@virtuerealitymedia.com",
              name: "CYHOP Launch",
            },
            subject: `New CYHOP Launch Lead: ${fullName} (${focus})`,
            content: [
              {
                type: "text/plain",
                value: `New Lead:\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nFocus: ${focus}\nNotes: ${notes}\nPage: ${page}\nTime: ${timestampFormatted}\n\nTracker: ${TRACKER_SHEET_URL}`,
              },
            ],
          }),
        });
      } catch (sgErr) {
        console.error("Failed to send notification email via SendGrid:", sgErr);
      }
    }

    console.log(
      `[LEAD CAPTURED] ${fullName} <${email}> - ${focus} from ${page}. Notified: ${NOTIFICATION_RECIPIENTS.join(", ")}`
    );

    return NextResponse.json({
      success: true,
      message: "Interest successfully recorded.",
      leadId: leadRecord.id,
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while saving your interest." },
      { status: 500 }
    );
  }
}