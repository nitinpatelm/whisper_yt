import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

export interface IChat extends Document {
  participants?: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
  lastMessageAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const ChatSchema = new Schema<IChat>(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message", default: null },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Chat = model<IChat>("Chat", ChatSchema);
