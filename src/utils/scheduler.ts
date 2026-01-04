// src/utils/scheduler.ts
import {
  Booking,
  MentorAvailability,
  MentorAvailabilityOverride,
} from "../types";

// Map weekdays to number (0 = Sunday, 1 = Monday, ...)
const WEEKDAY_MAP: Record<string, number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

// Get day of week from YYYY-MM-DD string
export const getDayOfWeek = (date: string): string => {
  const d = new Date(date);
  const dayNum = d.getDay(); // 0-6
  return Object.keys(WEEKDAY_MAP).find((k) => WEEKDAY_MAP[k] === dayNum)!;
};

// Convert "HH:mm" string to minutes
const timeStringToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Check if two time ranges overlap
const isOverlapping = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
) => {
  const s1 = timeStringToMinutes(start1);
  const e1 = timeStringToMinutes(end1);
  const s2 = timeStringToMinutes(start2);
  const e2 = timeStringToMinutes(end2);
  return s1 < e2 && s2 < e1;
};

const lockedSlots = new Set<string>();
export const getSlotKey = (
  mentorId: string,
  date: string,
  start: string,
  end: string
) => `${mentorId}-${date}-${start}-${end}`;
export const lockSlot = (key: string) => {
  if (lockedSlots.has(key)) return false;
  lockedSlots.add(key);
  return true;
};
export const releaseSlot = (key: string) => {
  lockedSlots.delete(key);
};

// Get mentor slots for a specific date
export const getMentorSlotsForDate = (
  mentorId: string,
  date: string,
  weeklyAvailability: MentorAvailability[],
  overrides: MentorAvailabilityOverride[]
) => {
  const dayOfWeek = getDayOfWeek(date);

  // Weekly slots
  let slots = weeklyAvailability.filter(
    (slot) => slot.mentor_id === mentorId && slot.day_of_week === dayOfWeek
  );

  // Remove overridden slots
  const overridden = overrides.filter(
    (o) => o.mentor_id === mentorId && o.date === date
  );

  slots = slots.filter(
    (slot) =>
      !overridden.some(
        (o) => o.slot_start === slot.slot_start && o.slot_end === slot.slot_end
      )
  );

  return slots.filter(
    (slot) =>
      !lockedSlots.has(
        getSlotKey(mentorId, date, slot.slot_start, slot.slot_end)
      )
  );
};
export const canBookSlot = (
  mentorId: string,
  date: string,
  start: string,
  end: string,
  bookings: Booking[]
) => {
  const key = getSlotKey(mentorId, date, start, end);

  if (lockedSlots.has(key)) return false;

  const newStart = `${date}T${start}`;
  const newEnd = `${date}T${end}`;

  return !bookings.some((b) =>
    isOverlapping(newStart, newEnd, b.start_datetime, b.end_datetime)
  );
};

// Check if slot is available considering confirmed bookings
export const isSlotAvailable = (
  mentorId: string,
  date: string,
  slotStart: string,
  slotEnd: string,
  bookings: Booking[]
) => {
  return !bookings.some((b) => {
    if (b.mentor_id !== mentorId || b.status !== "CONFIRMED") return false;

    const bookingDate = new Date(b.start_datetime);
    const bookingEndDate = new Date(b.end_datetime);

    // Compare only if same date
    const bookingDay = toLocalISODate(bookingDate);
    if (bookingDay !== date) return false;

    const bStart = `${bookingDate.getHours()}:${bookingDate.getMinutes()}`;
    const bEnd = `${bookingEndDate.getHours()}:${bookingEndDate.getMinutes()}`;

    return isOverlapping(slotStart, slotEnd, bStart, bEnd);
  });
};

// Create new booking
export function createBooking(
  mentorId: string,
  menteeId: string,
  date: string,
  slotStart: string,
  slotEnd: string,
  bookings: Booking[]
): Booking | null {
  const buildDateTime = (dateStr: string, timeStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const [h, min] = timeStr.split(":").map(Number);
    return new Date(y, m - 1, d, h, min, 0);
  };

  const startDate = buildDateTime(date, slotStart);
  const endDate = buildDateTime(date, slotEnd);

  // 🔒 Safety check
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.error("Invalid date generated", {
      date,
      slotStart,
      slotEnd,
    });
    return null;
  }

  const conflict = bookings.some((b) => {
    if (b.mentor_id !== mentorId || b.status !== "CONFIRMED") return false;

    const bStart = new Date(b.start_datetime).getTime();
    const bEnd = new Date(b.end_datetime).getTime();

    return bStart < endDate.getTime() && bEnd > startDate.getTime();
  });

  if (conflict) return null;

  return {
    booking_id: `booking_${Date.now()}`,
    mentor_id: mentorId,
    mentee_id: menteeId,
    start_datetime: startDate.toISOString(),
    end_datetime: endDate.toISOString(),
    status: "CONFIRMED",
  };
}

// Reschedule an existing booking
export const rescheduleBooking = (
  booking: Booking,
  newDate: string,
  newSlotStart: string,
  newSlotEnd: string,
  bookings: Booking[]
): Booking | null => {
  const otherBookings = bookings.filter(
    (b) => b.booking_id !== booking.booking_id
  );

  if (
    !isSlotAvailable(
      booking.mentor_id,
      newDate,
      newSlotStart,
      newSlotEnd,
      otherBookings
    )
  ) {
    return null;
  }

  const startDate = new Date(`${newDate}T${newSlotStart}:00`);
  const endDate = new Date(`${newDate}T${newSlotEnd}:00`);

  return {
    ...booking,
    start_datetime: startDate.toISOString(),
    end_datetime: endDate.toISOString(),
  };
};

export const toLocalISODate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
