"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  SCHEDULE_CONFIG,
  buildMeetingMailto,
  formatMonthYear,
  formatSelectedDate,
  formatSlotLabel,
  getDaysInMonth,
  isDateSelectable,
  isSameDay,
  startOfDay,
} from "@/lib/scheduling";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ScheduleCallPanel() {
  const { person } = portfolioData;
  const today = useMemo(() => startOfDay(new Date()), []);

  const [expanded, setExpanded] = useState(false);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstWeekday = new Date(year, month, 1).getDay();

  const goPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmed(false);
  };

  const goNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    setConfirmed(true);
    const mailto = buildMeetingMailto(
      person.email,
      selectedDate,
      selectedTime,
      person.firstName,
    );
    window.location.href = mailto;
  };

  return (
    <div className="glass glow-ring rounded-2xl p-6 sm:p-8 border border-white/10 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] hover:border-emerald-500/30 transition-all duration-300">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
        <Calendar className="h-6 w-6 text-accent" aria-hidden />
      </div>

      <h2 className="text-xl font-semibold text-foreground">Schedule Call</h2>
      <p className="mt-2 text-sm text-muted">
        Pick a weekday and time slot ({SCHEDULE_CONFIG.timezone}). A pre-filled
        email will open so you can send your request.
      </p>

      {!expanded ? (
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-6 w-full sm:w-auto"
          onClick={() => setExpanded(true)}
        >
          <Clock className="h-5 w-5" />
          Schedule Call
        </Button>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-border bg-surface-elevated/60 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrevMonth}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <p className="font-semibold text-foreground">{formatMonthYear(viewDate)}</p>
              <button
                type="button"
                onClick={goNextMonth}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label} className="py-1">
                  {label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstWeekday }).map((_, i) => (
                <span key={`empty-${i}`} aria-hidden />
              ))}
              {daysInMonth.map((day) => {
                const selectable = isDateSelectable(day, today);
                const selected = selectedDate && isSameDay(day, selectedDate);

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={!selectable}
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedTime(null);
                      setConfirmed(false);
                    }}
                    className={cn(
                      "aspect-square rounded-lg text-sm transition-all",
                      selectable &&
                        "text-foreground hover:bg-accent/15 hover:text-accent",
                      !selectable && "cursor-not-allowed text-muted/30",
                      selected &&
                        "bg-accent font-semibold text-background hover:bg-accent hover:text-background",
                    )}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate && (
            <div className="rounded-xl border border-border bg-surface-elevated/60 p-4 sm:p-5">
              <p className="mb-3 text-sm font-medium text-foreground">
                Available slots — {formatSelectedDate(selectedDate)}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SCHEDULE_CONFIG.timeSlots.map((slot) => {
                  const active = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedTime(slot);
                        setConfirmed(false);
                      }}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm transition-all",
                        active
                          ? "border-accent bg-accent/15 font-medium text-accent"
                          : "border-border text-muted hover:border-accent/40 hover:text-foreground",
                      )}
                    >
                      {formatSlotLabel(slot)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                Selected:{" "}
                <span className="text-foreground">
                  {formatSelectedDate(selectedDate)} at {formatSlotLabel(selectedTime)}
                </span>
              </p>
              <Button type="button" variant="primary" size="md" onClick={handleConfirm}>
                Confirm & Send Request
              </Button>
            </div>
          )}

          {confirmed && (
            <p className="text-sm text-accent">
              Your mail app should open with the meeting details. If it did not,
              use Mail Me above to reach out manually.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
