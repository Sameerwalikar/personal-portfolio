import { NextResponse } from "next/server";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const QUERY = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
        totalActiveDays
        streak
      }
    }
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "SameerWalikar";
  const year     = parseInt(searchParams.get("year") ?? String(new Date().getFullYear()), 10);

  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Referer":       "https://leetcode.com",
        "Origin":        "https://leetcode.com",
        "User-Agent":    "Mozilla/5.0 (compatible; portfolio-stats/1.0)",
      },
      body: JSON.stringify({ query: QUERY, variables: { username, year } }),
      /* No caching — always fresh at runtime */
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `LeetCode API responded with ${res.status}` },
        { status: 502 },
      );
    }

    const json = await res.json();
    const calendar = json?.data?.matchedUser?.userCalendar;

    if (!calendar) {
      return NextResponse.json({ error: "No data returned" }, { status: 404 });
    }

    /* submissionCalendar is a JSON string of { "unixTimestamp": count } */
    const parsed: Record<string, number> =
      typeof calendar.submissionCalendar === "string"
        ? JSON.parse(calendar.submissionCalendar)
        : calendar.submissionCalendar;

    return NextResponse.json({
      calendar: parsed,
      totalActiveDays: calendar.totalActiveDays,
      streak: calendar.streak,
    });
  } catch (err) {
    console.error("[/api/leetcode] fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
