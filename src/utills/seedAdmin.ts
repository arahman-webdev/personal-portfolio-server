import { Prisma } from "@prisma/client"
import { prisma } from "../config/db"
import bcrypt from "bcrypt"
export const seedAdmin = async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing in env");
    }

    const isAdminExist = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL },
    });

    if (isAdminExist) {
      console.log("Admin already exists");
      return isAdminExist;
    }

    console.log("Creating super admin...");

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
    if (isNaN(saltRounds)) throw new Error("Invalid BCRYPT_SALT_ROUNDS");

    const hashAdminPass = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);

    const payload: Prisma.UserCreateInput = {
      name: "Admin",
      role: "ADMIN",
      email: process.env.ADMIN_EMAIL,
      password: hashAdminPass,
      isVerified: true,
    };

    const admin = await prisma.user.create({ data: payload });

    console.log("Super admin created successfully:", {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    return admin;
  } catch (err) {
    console.error("Failed to seed admin:", (err as Error).message);
    throw err;
  }
};
