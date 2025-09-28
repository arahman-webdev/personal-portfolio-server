import { Prisma } from "@prisma/client"
import { prisma } from "../config/db"
import bcrypt from "bcrypt"
export const seedAdmin = async () => {
    try {
        const isAdminExist = await prisma.user.findUnique({
            where: { email: process.env.ADMIN_EMAIL }
        })
        if (isAdminExist) {
          return  console.log("Admin already exists")
        }


        console.log("Trying to create super admin.................")

        const hashAdminPass = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, Number(process.env.BCRYPT_SALT_ROUNDS))

        const payload:Prisma.UserCreateInput = {
            name: "Admin",
            role: "ADMIN",
            email: process.env.ADMIN_EMAIL as string,
            password: hashAdminPass,
            isVerified: true,
        }

        const admin = await prisma.user.create({
            data:payload
        })

        console.log("User created successfully")

        console.log(admin)


    } catch (err) {
        console.log(err)
    }
}