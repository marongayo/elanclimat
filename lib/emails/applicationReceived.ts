// lib/emails/applicationReceived.ts

export function applicationReceivedEmail({
  applicantName,
  roleTitle,
  withdrawUrl,
}: {
  applicantName: string;
  roleTitle: string;
  withdrawUrl: string;
}) {
  return {
    subject: `Your application at Élan Climat & Énergie`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Application Received</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'DM Sans',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- ── Main card ── -->
          <tr>
            <td style="background:#ffffff;border:0.5px solid #e2ddd8;">

              <!-- Gold top rule -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#c9a96e;height:2px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Logo + badge header -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:32px 48px;border-bottom:0.5px solid #ece8e2;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:18px;color:#1a1a18;letter-spacing:0.01em;font-weight:400;">
                            Élan Climat &amp; Énergie
                          </p>
                          <p style="margin:3px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#b0aa9f;">
                            Engineering Excellence &nbsp;·&nbsp; Nairobi
                          </p>
                        </td>
                        <td align="right" valign="middle">
                          <span style="font-family:'DM Sans',Arial,sans-serif;font-size:9px;letter-spacing:0.16em;text-transform:uppercase;color:#c9a96e;border:0.5px solid #e0c88a;padding:5px 10px;">
                            Application Received
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Body copy -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:44px 48px 0;">

                    <p style="margin:0 0 28px;font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#1a1a18;font-weight:400;line-height:1.3;">
                      Dear ${applicantName},
                    </p>

                    <p style="margin:0 0 18px;font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#6b6560;line-height:1.9;font-weight:300;">
                      Thank you for applying to the
                      <span style="color:#1a1a18;font-weight:500;">${roleTitle}</span>
                      position at Élan Climat &amp; Énergie.
                    </p>

                    <p style="margin:0 0 18px;font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#6b6560;line-height:1.9;font-weight:300;">
                      Our hiring team has received your application and it is currently under review.
                      Should you be among our shortlisted candidates, a member of our team will reach
                      out to schedule a phone or in-person interview. Regardless of the outcome, we
                      will keep you informed on the status of your application.
                    </p>

                    <p style="margin:0 0 18px;font-family:'DM Sans',Arial,sans-serif;font-size:14px;color:#6b6560;line-height:1.9;font-weight:300;">
                      In the meantime, if you have any questions, please do not hesitate to reach us at
                      <a href="mailto:careers@elanclimat.co.ke"
                        style="color:#c9a96e;text-decoration:none;border-bottom:0.5px solid rgba(201,169,110,0.5);padding-bottom:1px;">
                        careers@elanclimat.co.ke
                      </a>.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:32px 48px 36px;">
                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="height:0.5px;background:#ece8e2;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                    <p style="margin:0 0 4px;font-family:'DM Sans',Arial,sans-serif;font-size:13px;color:#9a9490;line-height:1.75;font-weight:300;">
                      Best regards,
                    </p>
                    <p style="margin:2px 0 0;font-family:'Playfair Display',Georgia,serif;font-size:15px;color:#1a1a18;font-weight:400;">
                      Hiring Team
                    </p>
                    <p style="margin:4px 0 0;font-family:'DM Sans',Arial,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#b0aa9f;">
                      Élan Climat &amp; Énergie
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Withdraw section -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#f9f7f4;border-top:0.5px solid #ece8e2;padding:28px 48px;">
                    <p style="margin:0 0 16px;font-family:'DM Sans',Arial,sans-serif;font-size:12px;color:#9a9490;line-height:1.8;font-weight:300;">
                      Changed your mind? You may withdraw your application at any time using the
                      link below. This link remains valid for 30 days.
                    </p>
                    <a
                      href="${withdrawUrl}"
                      style="display:inline-block;font-family:'DM Sans',Arial,sans-serif;font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:#6b6560;text-decoration:none;border:0.5px solid #cac5bc;padding:10px 22px;background:#ffffff;"
                    >
                      Withdraw Application
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Values strip -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:0.5px solid #ece8e2;padding:24px 48px;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-right:20px;">
                          <p style="margin:0 0 5px;font-family:'DM Sans',Arial,sans-serif;font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a96e;">01</p>
                          <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:11px;color:#8a8480;font-style:italic;line-height:1.5;">Precision over speed</p>
                        </td>
                        <td style="padding-right:20px;">
                          <p style="margin:0 0 5px;font-family:'DM Sans',Arial,sans-serif;font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a96e;">02</p>
                          <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:11px;color:#8a8480;font-style:italic;line-height:1.5;">Sustainability as identity</p>
                        </td>
                        <td style="padding-right:20px;">
                          <p style="margin:0 0 5px;font-family:'DM Sans',Arial,sans-serif;font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a96e;">03</p>
                          <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:11px;color:#8a8480;font-style:italic;line-height:1.5;">Craft in everything</p>
                        </td>
                        <td>
                          <p style="margin:0 0 5px;font-family:'DM Sans',Arial,sans-serif;font-size:8px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a96e;">04</p>
                          <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:11px;color:#8a8480;font-style:italic;line-height:1.5;">Long-term thinking</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:20px 48px 28px;border-top:0.5px solid #ece8e2;">
                    <p style="margin:0 0 3px;font-family:'DM Sans',Arial,sans-serif;font-size:10px;color:#b0aa9f;letter-spacing:0.06em;">
                      Élan Climat &amp; Énergie &nbsp;·&nbsp; Nairobi, Kenya &nbsp;·&nbsp; Est. 2018
                    </p>
                    <p style="margin:0;font-family:'DM Sans',Arial,sans-serif;font-size:10px;color:#cac5bc;letter-spacing:0.04em;">
                      HVAC &nbsp;·&nbsp; Solar &nbsp;·&nbsp; Battery Storage &nbsp;·&nbsp; Refrigeration &nbsp;·&nbsp; Elevators &nbsp;·&nbsp; Electrical
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Bottom notice ── -->
          <tr>
            <td style="padding:14px 2px 0;">
              <p style="margin:0;font-family:'DM Sans',Arial,sans-serif;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#c0bbb3;">
                You are receiving this because you applied for a role at Élan Climat &amp; Énergie
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `.trim(),
  };
}
