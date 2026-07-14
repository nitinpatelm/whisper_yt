import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { User } from "../models/User";
import { requireAuth } from "@clerk/express";

export type AuthRequest = Request & { userId?: string };

export const protectRoute = [
  requireAuth(),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
    try {
      const user = await User.findOne({ clerkId: clerkId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Attach the user to the request object for further use in the route handler
      //   (req as any).user = user;
      req.userId = user._id.toString(); // Attach the user ID to the request object
      next();
    } catch (error) {
      console.error("Error fetching user or in protected route", error);
      res.status(500);
      next(error);
    }
  },
];
