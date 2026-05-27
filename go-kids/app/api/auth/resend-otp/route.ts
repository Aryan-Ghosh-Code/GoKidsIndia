import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db/connect";
import { User } from "@/lib/db/models/User";
import { OtpToken } from "@/lib/db/models/OtpToken";
import { sendOtpEmail } from "@/lib/auth/mailer";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found." },
        { status: 404 }
      );
    }

    if (user.isEmailVerified) {
      return NextResponse.json(
        { success: false, error: "Email is already verified." },
        { status: 400 }
      );
    }

    // Rate-limit: check if last OTP was sent within 60 seconds
    const recentToken = await OtpToken.findOne({ userId: user._id }).sort({ createdAt: -1 });
    if (recentToken) {
      const secondsSinceLastOtp = (Date.now() - recentToken.createdAt.getTime()) / 1000;
      if (secondsSinceLastOtp < 60) {
        return NextResponse.json(
          {
            success: false,
            error: `Please wait ${Math.ceil(60 - secondsSinceLastOtp)} seconds before requesting a new OTP.`,
          },
          { status: 429 }
        );
      }
    }

    // Generate new OTP
    const otp = generateOtp();
    const tokenHash = crypto.createHash("sha256").update(otp).digest("hex");

    await OtpToken.deleteMany({ userId: user._id });
    await OtpToken.create({
      userId: user._id,
      tokenHash,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    await sendOtpEmail(user.email, user.name, otp);

    return NextResponse.json({
      success: true,
      data: { message: "A new OTP has been sent to your email." },
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
