// app/api/jobs/apply/route.ts

import { Resend } from "resend";
import { applicationReceivedEmail } from "@/lib/emails/applicationReceived";

const resend = new Resend(process.env.RESEND_API_KEY);

// After successful DB save:
const { subject, html } = applicationReceivedEmail({
  applicantName: fields.name, // whatever your FormData field is called
  roleTitle: job.title,
});

await resend.emails.send({
  from: `Élan Careers <${process.env.RESEND_FROM}>`,
  to: fields.email,
  subject,
  html,
});
