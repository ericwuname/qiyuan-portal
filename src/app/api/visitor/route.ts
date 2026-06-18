import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
    await client.execute(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page TEXT NOT NULL DEFAULT '/',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await client.execute("INSERT INTO visitors (page) VALUES ('/')");
    const count = await client.execute("SELECT COUNT(*) as total FROM visitors");
    return NextResponse.json({ visitors: Number((count.rows[0] as any).total) });
  } catch {
    return NextResponse.json({ visitors: 0 });
  }
}