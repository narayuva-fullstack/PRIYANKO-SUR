import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, bookingTypes } = body;

    // Server-side validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Phone, Message)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.CONTACT_SENDER_EMAIL || "onboarding@resend.dev";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@priyankosur.com";

    // If API key is missing, throw a configuration error
    if (!apiKey || apiKey === "your_resend_api_key_here") {
      console.error("Resend API key is not configured in environment variables.");
      return NextResponse.json(
        { error: "Form submission is currently unavailable. Please contact info@priyankosur.com directly." },
        { status: 500 }
      );
    }

    // Format the booking targets tag markup
    const tagsHtml = bookingTypes && bookingTypes.length > 0
      ? bookingTypes.map((type: string) => `
          <span style="
            background: rgba(212, 175, 55, 0.1); 
            border: 1px solid rgba(212, 175, 55, 0.3); 
            color: #b38f2d; 
            padding: 4px 10px; 
            border-radius: 9999px; 
            font-size: 11px; 
            font-weight: 600;
            display: inline-block;
            margin: 2px;
          ">${type}</span>
        `).join('')
      : `<span style="color: #71717a; font-style: italic;">None selected</span>`;

    // Construct the structured HTML email body
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Collaboration Inquiry</title>
      </head>
      <body style="
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
        line-height: 1.6; 
        color: #1a1a1a; 
        margin: 0; 
        padding: 24px; 
        background-color: #f8f9fa;
      ">
        <div style="
          background-color: #ffffff; 
          border-radius: 12px; 
          border: 1px solid #e1e4e6; 
          max-width: 600px; 
          margin: 0 auto; 
          overflow: hidden; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        ">
          <!-- Header block -->
          <div style="
            background: linear-gradient(135deg, #050505 0%, #0c0c0e 100%); 
            color: #d4af37; 
            padding: 32px 24px; 
            text-align: center;
          ">
            <h2 style="
              margin: 0; 
              font-family: 'Georgia', serif; 
              font-size: 22px; 
              font-weight: normal; 
              letter-spacing: 0.05em;
            ">Priyanko Sur</h2>
            <p style="
              margin: 8px 0 0 0; 
              color: #a1a1aa; 
              font-size: 10px; 
              font-weight: bold; 
              font-family: monospace; 
              text-transform: uppercase; 
              letter-spacing: 0.15em;
            ">Collaboration Inquiry</p>
          </div>
          
          <!-- Content block -->
          <div style="padding: 32px 24px;">
            <div style="margin-bottom: 20px;">
              <div style="font-size: 10px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Collaborator Name / Entity</div>
              <div style="font-size: 14px; color: #09090b; font-weight: 600;">${name}</div>
            </div>

            <div style="margin-bottom: 20px;">
              <div style="font-size: 10px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Email Address</div>
              <div style="font-size: 14px; color: #09090b; font-weight: 500;">
                <a href="mailto:${email}" style="color: #b38f2d; text-decoration: none;">${email}</a>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <div style="font-size: 10px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Contact Number</div>
              <div style="font-size: 14px; color: #09090b; font-weight: 500; font-family: monospace;">${phone}</div>
            </div>

            <div style="margin-bottom: 24px;">
              <div style="font-size: 10px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">Inquiry Focus Targets</div>
              <div style="margin-top: 4px;">
                ${tagsHtml}
              </div>
            </div>

            <div style="margin-top: 28px; border-top: 1px solid #f4f4f5; pt-20: 20px; padding-top: 20px;">
              <div style="font-size: 10px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Proposal & Details</div>
              <div style="
                background-color: #f4f4f5; 
                border-radius: 8px; 
                padding: 16px; 
                font-size: 13px; 
                color: #27272a; 
                white-space: pre-wrap; 
                margin-top: 6px;
                border-left: 3px solid #d4af37;
              ">${message}</div>
            </div>
          </div>
          
          <!-- Footer block -->
          <div style="
            text-align: center; 
            font-size: 10px; 
            color: #71717a; 
            padding: 20px 24px; 
            border-top: 1px solid #f4f4f5; 
            background-color: #fafafa;
          ">
            This inquiry was automatically dispatched from the Priyanko Sur portfolio website contact form.
          </div>
        </div>
      </body>
      </html>
    `;

    // POST request to Resend API endpoint
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `Priyanko Sur Inquiry <${senderEmail}>`,
        to: receiverEmail,
        subject: `New Collaboration: ${name}`,
        html: emailHtml,
      }),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API Error details:", resendResult);
      return NextResponse.json(
        { error: resendResult.message || "Failed to dispatch email via Resend API." },
        { status: resendResponse.status }
      );
    }

    return NextResponse.json({ success: true, id: resendResult.id });
  } catch (error: any) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred on the server." },
      { status: 500 }
    );
  }
}
