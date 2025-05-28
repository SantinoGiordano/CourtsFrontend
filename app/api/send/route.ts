import { NextRequest, NextResponse } from 'next/server';
import { EmailTemplate } from "@/app/components/EmailTemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const emailTemplate = await EmailTemplate({ name, email, message });

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['santinogiordano13@gmail.com'], 
    subject: 'New Contact Form Message',
    react: emailTemplate, 
  });

  if (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}