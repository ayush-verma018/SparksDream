import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import users from "../data/users.json";
import bookings from "../data/bookings.json";
import availability from "../data/mentor_weekly_availability.json";
import overrides from "../data/mentor_availability_overrides.json";
import Header from "../components/Header";
import colors from "../theme/colors";
import { styles } from "./MentorDetails.styles";
import EmptyState from "../components/EmptyState";
import { toLocalISODate } from "../utils/scheduler";

type Props = {
  route: {
    params: {
      mentorId: string;
    };
  };
  navigation: any;
};

const DAY_ORDER = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export default function MentorDetailsScreen({ route, navigation }: Props) {
  const { mentorId } = route.params;
  const [weekOffset, setWeekOffset] = useState(0);
  const mentor = users.find((u) => u.user_id === mentorId);
  const mentee = users.find((u) => u.role === "MENTEE");

  if (!mentor) {
    return (
      <View style={styles.center}>
        <Text style={styles.noSlots}>Mentor not found</Text>
      </View>
    );
  }

  /* ---------- Generate 5 weekdays ---------- */
  const weekDates = useMemo(() => {
    const dates: Date[] = [];
    const base = new Date();

    base.setDate(base.getDate() + weekOffset * 7);

    let offset = 0;

    while (dates.length < 5) {
      const d = new Date(base);
      d.setDate(base.getDate() + offset);

      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        dates.push(d);
      }

      offset++;
    }

    return dates;
  }, [weekOffset]);

  /* ---------- Helpers ---------- */
  const formatDate = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };
  const formatTime = (datetime: string): string => {
    const [hourStr, minute] = datetime.split(":");
    let hour = Number(hourStr);

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // handle midnight & noon

    let t = `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
    if (mentor.timezone != mentee?.timezone) return convertToEST(t);
    return t;
  };
  function convertToEST(timeStr: string): string {
    // Parse hours and minutes
    let [hours, minutesPart] = timeStr
      .match(/\d{1,2}:\d{2}/)![0]
      .split(":")
      .map(Number);
    const isPM = timeStr.includes("PM");

    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;

    // Create Date object in UTC (any arbitrary date)
    const date = new Date(Date.UTC(2026, 0, 4, hours, minutesPart)); // year, monthIndex, day

    // Sao Paulo is UTC-3, EST is UTC-5 → difference = -2 hours
    date.setUTCHours(date.getUTCHours() - 2);

    // Format back to hh:mm AM/PM
    let h = date.getUTCHours();
    const m = date.getUTCMinutes();
    const period = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;

    const mm = m.toString().padStart(2, "0");
    return `${h}:${mm} ${period}`;
  }

  const toDateTime = (date: Date, time: string) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date(date);
    d.setHours(h, m, 0, 0);
    return d;
  };

  const isBooked = (date: Date, start: string, end: string) => {
    const slotStart = toDateTime(date, start).getTime();
    const slotEnd = toDateTime(date, end).getTime();

    return bookings.some((b) => {
      if (b.mentor_id !== mentor.user_id || b.status !== "CONFIRMED")
        return false;
      const bookingStart = new Date(b.start_datetime).getTime();
      const bookingEnd = new Date(b.end_datetime).getTime();
      return bookingStart < slotEnd && bookingEnd > slotStart;
    });
  };

  const isOverridden = (date: Date, start: string, end: string) => {
    const dateStr = toLocalISODate(date);
    return overrides.some(
      (o) =>
        o.mentor_id === mentor.user_id &&
        o.date === dateStr &&
        o.slot_start === start &&
        o.slot_end === end
    );
  };

  const isPastSlot = (date: Date, start: string) =>
    toDateTime(date, start).getTime() < Date.now();

  const isDisabled = (date: Date, start: string, end: string) =>
    isPastSlot(date, start) ||
    isBooked(date, start, end) ||
    isOverridden(date, start, end);

  const getUniqueSlots = (slots: typeof availability) => {
    const map = new Map<string, (typeof availability)[0]>();

    slots.forEach((slot) => {
      const key = `${slot.slot_start}-${slot.slot_end}`;
      if (!map.has(key)) {
        map.set(key, slot);
      }
    });

    return Array.from(map.values());
  };
  const weekHasSlots = weekDates.some((date) => {
    const dayName = DAY_ORDER[date.getDay()];
    const rawSlots = availability.filter(
      (a) => a.mentor_id === mentor.user_id && a.day_of_week === dayName
    );
    const daySlots = getUniqueSlots(rawSlots);
    return daySlots.length > 0;
  });

  return (
    <View style={styles.screen}>
      <Header />

      {weekHasSlots ? (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Mentor Availability</Text>

          {/* Mentor Card */}
          <View style={styles.mentorCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {mentor.name.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View>
              <Text style={styles.mentorName}>{mentor.name}</Text>
              <Text style={styles.mentorSubject}>Computer Science</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text
            style={{
              color: colors.textSecondary,
              fontWeight: 400,
              paddingBottom: 10,
            }}
          >
            Timezone : EST (UTC-5)
          </Text>

          <View style={styles.weekSelector}>
            <TouchableOpacity
              disabled={weekOffset === 0}
              onPress={() => setWeekOffset((prev) => prev - 1)}
              style={[
                styles.weekArrow,
                weekOffset === 0 && styles.weekArrowDisabled,
              ]}
            >
              <FontAwesome
                name="chevron-left"
                size={14}
                color={weekOffset === 0 ? colors.textDisabled : colors.darkGrey}
              />
            </TouchableOpacity>

            <Text style={styles.weekLabel}>
              {formatDate(weekDates[0])} – {formatDate(weekDates[4])}
            </Text>

            <TouchableOpacity
              onPress={() => setWeekOffset((prev) => prev + 1)}
              style={styles.weekArrow}
            >
              <FontAwesome
                name="chevron-right"
                size={14}
                color={colors.darkGrey}
              />
            </TouchableOpacity>
          </View>

          {/* Days */}
          {weekDates.map((date) => {
            const dayName = DAY_ORDER[date.getDay()];
            const rawSlots = availability.filter(
              (a) => a.mentor_id === mentor.user_id && a.day_of_week === dayName
            );

            const daySlots = getUniqueSlots(rawSlots);

            return (
              <View key={date.toDateString()} style={styles.dayCard}>
                <Text style={styles.dayText}>{dayName}</Text>
                <Text style={styles.dateText}>{formatDate(date)}</Text>

                <View style={styles.slotsContainer}>
                  {daySlots.length === 0 ? (
                    <Text style={styles.noSlots}>No slots available</Text>
                  ) : (
                    daySlots.map((slot, idx) => {
                      const disabled = isDisabled(
                        date,
                        slot.slot_start,
                        slot.slot_end
                      );

                      return (
                        <TouchableOpacity
                          key={idx}
                          disabled={disabled}
                          onPress={() =>
                            navigation.navigate("CreateBooking", {
                              mentorId: mentor.user_id,
                              date: toLocalISODate(date),
                              slotStart: slot.slot_start,
                              slotEnd: slot.slot_end,
                            })
                          }
                          style={[
                            styles.slot,
                            {
                              borderColor: disabled
                                ? colors.borderDisabled
                                : colors.darkGrey,
                              backgroundColor: disabled
                                ? colors.disabledBg
                                : colors.white,
                            },
                          ]}
                        >
                          <FontAwesome
                            name="clock-o"
                            size={14}
                            color={
                              disabled ? colors.textDisabled : colors.darkGrey
                            }
                            style={{ marginRight: 6 }}
                          />
                          <Text
                            style={{
                              color: disabled
                                ? colors.textDisabled
                                : colors.darkGrey,
                            }}
                          >
                            {formatTime(slot.slot_start)} -{" "}
                            {formatTime(slot.slot_end)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  )}
                </View>
              </View>
            );
          })}

          <Text style={styles.infoText}>
            Select a time slot to schedule a session.
          </Text>
        </ScrollView>
      ) : (
        <EmptyState
          mentor={mentor}
          onNotify={() => {
            // handle notifications
            console.log("Notify me clicked!");
          }}
          onViewOtherMentors={() => navigation.navigate("MentorList")}
        />
      )}
    </View>
  );
}
