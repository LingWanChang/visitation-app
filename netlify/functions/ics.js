export async function handler(event, context) {
  // 從 query string 取出 year 和 month
  const params = event.queryStringParameters;
  const year = params.year || "2026";
  const month = params.month || "7";

  // 這裡先做一個簡單的 ICS 範例
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Visitation Helper//TW
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:test-${year}${month}@visitation
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;VALUE=DATE:${year}${month.padStart(2,"0")}01
DTEND;VALUE=DATE:${year}${month.padStart(2,"0")}02
SUMMARY:爸爸探視
DESCRIPTION:爸爸探視日
END:VEVENT
END:VCALENDAR`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": `attachment; filename="visitation-${year}-${month}.ics"`
    },
    body: icsContent
  };
}

