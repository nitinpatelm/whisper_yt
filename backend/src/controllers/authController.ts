import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";

export async function getMe(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    next(error);
  }
}

export async function authCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
    let user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      // getUserInf
      const clerkUser = await clerkClient.users.getUser(clerkId);
      if (!clerkUser) {
        return res.status(404).json({ message: "Clerk user not found" });
      }
      // Create a new user in your database
      user = await User.create({
        clerkId,
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
          : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0],
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        avatar: clerkUser.imageUrl || "",
      });
      //   await user.save();
      res.json({ message: "User created successfully", user });
    }
  } catch (error) {
    console.error("Error in auth callback", error);
    res.status(500);
    next(error);
  }
}
