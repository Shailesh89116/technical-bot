/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismadb = new PrismaClient().$extends(withAccelerate());

export default prismadb;