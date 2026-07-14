import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";
export interface IMessage extends Document {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export const MessageSchema = new Schema<IMessage>(
  {
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

// indexes for efficient querying
MessageSchema.index({ chat: 1, createdAt: 1 }); //oldest one first, so 1 is ascending and -1 is descending order

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
