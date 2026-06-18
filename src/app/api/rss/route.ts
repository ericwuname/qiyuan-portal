import { getContentByType } from "@/lib/content";

export async function GET() {
  const updates = getContentByType("updates");
  const items = updates.map((u) => `
    <item>
      <title>${u.meta.title}</title>
      <description>${u.meta.description || ""}</description>
      <link>https://qiyuan.beauty/updates</link>
      <pubDate>${u.meta.date ? new Date(u.meta.date).toUTCString() : ""}</pubDate>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Qiyuan Intelligence - Updates</title>
    <link>https://qiyuan.beauty</link>
    <description>Latest updates from Qiyuan Intelligence</description>
    <language>zh-CN</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}