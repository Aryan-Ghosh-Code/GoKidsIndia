import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IOtpToken extends Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}

const OtpTokenSchema = new Schema<IOtpToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // MongoDB TTL index — auto-deletes expired tokens
    },
  },
  { timestamps: true }
);

export const OtpToken = models.OtpToken || model<IOtpToken>("OtpToken", OtpTokenSchema);
