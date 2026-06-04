/** Scheduling utilities — weekdays only, IST business-hour slots. */

export const SCHEDULE_CONFIG = {
  timezone: "Asia/Kolkata",
  /** 0 = Sunday … 6 = Saturday */
  availableWeekdays: [1, 2, 3, 4, 5],
  timeSlots: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  minDaysAhead: 1,
  maxDaysAhead: 21,
} as const;

export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isWeekdayAvailable(date: Date): boolean {
  return (SCHEDULE_CONFIG.availableWeekdays as readonly number[]).includes(
    date.getDay(),
  );
}

export function isDateSelectable(date: Date, today: Date = new Date()): boolean {
  const day = startOfDay(date);
  const now = startOfDay(today);
  const min = new Date(now);
  min.setDate(min.getDate() + SCHEDULE_CONFIG.minDaysAhead);
  const max = new Date(now);
  max.setDate(max.getDate() + SCHEDULE_CONFIG.maxDaysAhead);

  if (day < startOfDay(min) || day > startOfDay(max)) return false;
  return isWeekdayAvailable(day);
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const total = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= total; d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: SCHEDULE_CONFIG.timezone,
  });
}

export function formatSelectedDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: SCHEDULE_CONFIG.timezone,
  });
}

export function formatSlotLabel(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12}:${minutes.toString().padStart(2, "0")} ${period} IST`;
}

export function buildMeetingMailto(
  email: string,
  date: Date,
  time: string,
  name: string,
): string {
  const subject = encodeURIComponent(
    `Call Request — ${formatSelectedDate(date)} at ${formatSlotLabel(time)}`,
  );
  const body = encodeURIComponent(
    `Hi ${name},\n\nI would like to schedule a call with you.\n\nPreferred slot:\n• Date: ${formatSelectedDate(date)}\n• Time: ${formatSlotLabel(time)} (${SCHEDULE_CONFIG.timezone})\n\nPlease confirm or suggest an alternative.\n\nThank you.`,
  );
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
