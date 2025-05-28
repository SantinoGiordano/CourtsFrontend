import { EmailTemplate } from "@/app/components/EmailTemplate";
import { Resend } from "resend";
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["santinogiordano13@gmail.com"],
    subject: "Hello world",
    react: await EmailTemplate({ firstName: "John" }),
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}
