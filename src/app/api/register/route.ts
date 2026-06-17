import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return Response.json({ error: "Email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
