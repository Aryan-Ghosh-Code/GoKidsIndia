import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(email: string, name: string, otp: string) {
  await transporter.sendMail({
    from: `"Go Kids" <${process.env.EMAIL_FROM || "noreply@gokids.co.in"}>`,
    to: email,
    subject: "Your Go Kids OTP Code",
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#FAFAF8;font-family:Inter,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding:40px 20px;">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="background:#F5C518;padding:28px 40px;">
                      <h1 style="margin:0;font-family:Nunito,Arial,sans-serif;font-size:28px;font-weight:800;color:#1A1A1A;">
                        🌟 Go Kids
                      </h1>
                      <p style="margin:4px 0 0;color:#1A1A1A;font-size:14px;opacity:0.7;">
                        India's Future Readiness Platform
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="margin:0 0 12px;font-family:Nunito,Arial,sans-serif;font-size:22px;color:#1A1A1A;">
                        Hi ${name}! 👋
                      </h2>
                      <p style="margin:0 0 28px;color:#6B7280;font-size:15px;line-height:1.6;">
                        Here's your one-time verification code for Go Kids:
                      </p>
                      <div style="background:#FAFAF8;border-radius:12px;padding:24px;text-align:center;margin-bottom:28px;">
                        <p style="margin:0;font-size:48px;font-weight:800;letter-spacing:12px;color:#1A1A1A;font-family:Nunito,Arial,sans-serif;">
                          ${otp}
                        </p>
                      </div>
                      <p style="margin:0 0 8px;color:#6B7280;font-size:14px;">
                        This code expires in <strong>15 minutes</strong>.
                      </p>
                      <p style="margin:0;color:#6B7280;font-size:13px;">
                        If you didn't create a Go Kids account, please ignore this email.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#1A1A1A;padding:20px 40px;text-align:center;">
                      <p style="margin:0;color:#6B7280;font-size:12px;">
                        © ${new Date().getFullYear()} Go Kids India · Made with ❤️ in India
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}
