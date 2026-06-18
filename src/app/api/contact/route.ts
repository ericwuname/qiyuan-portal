import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

function getClient() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });
}

// Initialize tables
async function initDB(client: ReturnType<typeof createClient>) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL DEFAULT '/',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: "留言过长" }, { status: 400 });
    }

    const client = getClient();
    await initDB(client);

    await client.execute({
      sql: "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      args: [name, email, message],
    });

    // Notification: Send via Resend if configured
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;
    if (resendKey && notifyEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "启元智能门户 <noreply@qiyuan.beauty>",
            to: notifyEmail,
            subject: `[门户] 新留言来自 ${name}`,
            html: `<p><strong>${name}</strong> (${email}) 留言：</p><p>${message}</p><p><small>${new Date().toLocaleString('zh-CN')}</small></p>`,
          }),
        });
      } catch { /* notification failure is non-blocking */ }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "服务器错误，请稍后重试" }, { status: 500 });
  }
}

// GET: Query messages (admin)
export async function GET() {
  try {
    const client = getClient();
    await initDB(client);
    const result = await client.execute(
      "SELECT * FROM messages ORDER BY created_at DESC LIMIT 20"
    );
    const count = await client.execute(
      "SELECT COUNT(*) as total FROM messages"
    );
    const visitors = await client.execute(
      "SELECT COUNT(*) as total FROM visitors"
    );
    return NextResponse.json({
      messages: result.rows,
      total: Number((count.rows[0] as any).total),
      visitors: Number((visitors.rows[0] as any).total),
    });
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}