export async function handler(event, context) {
  const { year, month } = event.queryStringParameters;

  // 這裡呼叫你原本的 getDadDates(year, month)
  const dates = getDadDates(parseInt(year), parseInt(month));

  const events = dates.map(d=>{
    const startDate = d.date;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate()+1);

    const startStr = `${startDate.getFullYear()}${String(startDate.getMonth()+1).padStart(2,"0")}${String(startDate.getDate()).padStart(2,"0")}`;
    const endStr = `${endDate.getFullYear()}${String(endDate.getMonth()+1).padStart(2,"0")}${String(endDate.getDate()).padStart(2,"0")}`;

    return `BEGIN:VEVENT
UID:dad-visitation-${startStr}@visitation
DTSTAMP:${startStr}T090000Z
DTSTART;VALUE=DATE:${startStr}
DTEND;VALUE=DATE:${endStr}
SUMMARY:爸爸探視
DESCRIPTION:爸爸探視日
END:VEVENT`;
  }).join("\n\n");

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//探視日小幫手//TW
CALSCALE:GREGORIAN

${events}

END:VCALENDAR`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": `attachment; filename="visitation-${year}-${month}.ics"`
    },
    body: ics
  };
}
