// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Comment this out if Edge causes issues in your setup.
// export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const vehicleProfile = body?.vehicleProfile ?? null;

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Missing GOOGLE_API_KEY env var" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
You are AutoAid, a vehicle breakdown assistant.
Safety first; concise steps; escalate risky issues.
Focus: battery, tyre, engine light, overheating, electrical.
Vehicle: ${JSON.stringify(vehicleProfile ?? {})}.
`;

    const history =
      messages.length > 0
        ? messages.map((m: any) => `${m.role?.toUpperCase?.() || "USER"}: ${m.content || ""}`).join("\n")
        : "USER: Hi, I need help with my vehicle.";

    const result = await model.generateContent(`${systemPrompt}\n\n${history}`);
    const text = result?.response?.text?.() ?? "";

    return NextResponse.json({ reply: text || "No reply generated" });
  } catch (e: any) {
    // Return full details so you can see the root cause in the UI
    return NextResponse.json(
      { error: e?.message ?? String(e), stack: e?.stack ?? null },
      { status: 500 }
    );
  }
}
