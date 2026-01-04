// src/types.ts

export interface User {
  user_id: string;
  role: "MENTOR" | "MENTEE";
  name: string;
  timezone: string;
}

export interface MentorAvailability {
  mentor_id: string;
  day_of_week: string; // MONDAY, TUESDAY, etc.
  slot_start: string; // HH:mm
  slot_end: string; // HH:mm
}

export interface MentorAvailabilityOverride {
  mentor_id: string;
  date: string; // YYYY-MM-DD
  slot_start: string;
  slot_end: string;
  reason: string;
}

export interface Booking {
  booking_id: string;
  mentor_id: string;
  mentee_id: string;
  start_datetime: string; // ISO
  end_datetime: string; // ISO
  status: "CONFIRMED" | "CANCELLED";
}

export interface DraftBooking {
  mentor_id: string;
  mentee_id: string;
  selected_date: string;
  slot_start: string;
  slot_end: string;
}
