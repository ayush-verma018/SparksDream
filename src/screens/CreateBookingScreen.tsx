import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

import { RootStackParamList } from "../../App";
import Header from "../components/Header";
import bookingsData from "../data/bookings.json";
import availability from "../data/mentor_weekly_availability.json";
import users from "../data/users.json";
import colors from "../theme/colors";
import { styles } from "./CreateBooking.styles";
import {
  canBookSlot,
  createBooking,
  getSlotKey,
  lockSlot,
  releaseSlot,
  toLocalISODate,
} from "../utils/scheduler";
import { Booking } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "CreateBooking">;

const DAY_ORDER = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export default function CreateBookingScreen({ route, navigation }: Props) {
  const { mentorId, date, slotStart, slotEnd } = route.params;

  const mentor = users.find((u) => u.user_id === mentorId);
  const bookings: Booking[] = bookingsData as Booking[];

  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: string;
    end: string;
  } | null>(slotStart && slotEnd ? { start: slotStart, end: slotEnd } : null);

  /* ---------- Utils ---------- */
  const isPastDate = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };
  const formatTime = (datetime: string): string => {
    const [hourStr, minute] = datetime.split(":");
    let hour = Number(hourStr);

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // handle midnight & noon

    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  };
  let slotKey: any = null;
  useEffect(() => {
    return () => {
      if (selectedSlot) {
        releaseSlot(slotKey);
      }
    };
  }, []);

  /* ---------- Week Dates ---------- */
  const weekDates = useMemo(() => {
    const dates: Date[] = [];
    const base = new Date();
    base.setDate(base.getDate() + weekOffset * 7);

    let offset = 0;
    while (dates.length < 5) {
      const d = new Date(base);
      d.setDate(base.getDate() + offset);
      const day = d.getDay();
      if (day !== 0 && day !== 6) dates.push(d);
      offset++;
    }
    return dates;
  }, [weekOffset]);

  /* ---------- Slots for selected date ---------- */
  const slotsForDay = useMemo(() => {
    const d = new Date(selectedDate);
    const dayName = DAY_ORDER[d.getDay()];

    const raw = availability.filter(
      (a) => a.mentor_id === mentorId && a.day_of_week === dayName
    );

    const map = new Map<string, (typeof raw)[0]>();
    raw.forEach((s) => map.set(`${s.slot_start}-${s.slot_end}`, s));

    return Array.from(map.values());
  }, [selectedDate, mentorId]);

  /* ---------- Confirm ---------- */
  const handleConfirm = () => {
    if (!selectedSlot) return;
    if (
      !canBookSlot(
        mentorId,
        selectedDate,
        selectedSlot.start,
        selectedSlot.end,
        bookings
      )
    ) {
      return;
    }

    const booking = createBooking(
      mentorId,
      "mentee_01",
      selectedDate,
      selectedSlot.start,
      selectedSlot.end,
      bookings
    );

    if (booking) {
      bookings.push(booking);
      navigation.navigate("BookingConfirmation", {
        bookingId: booking.booking_id,
      });
    }
  };

  if (!mentor) {
    return (
      <View style={styles.center}>
        <Text style={styles.noSlots}>Mentor not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header />

      {/* ---------- CONTENT ---------- */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Book a session</Text>

        {/* Mentor Card */}
        <View style={styles.mentorCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {mentor.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.mentorName}>{mentor.name}</Text>
            <Text style={styles.mentorSubject}>60 min session</Text>
          </View>
        </View>

        {/* Select Date */}
        <View style={styles.sectionHeader}>
          <FontAwesome name="calendar" size={16} color={colors.darkGrey} />
          <Text style={styles.sectionTitle}>Select Date</Text>
        </View>

        <View style={styles.weekRow}>
          <TouchableOpacity
            disabled={weekOffset === 0}
            onPress={() => setWeekOffset((p) => p - 1)}
          >
            <FontAwesome
              name="chevron-left"
              size={14}
              color={weekOffset === 0 ? colors.textDisabled : colors.darkGrey}
            />
          </TouchableOpacity>

          {weekDates.map((d) => {
            const iso = toLocalISODate(d);
            const selected = iso === selectedDate;

            return (
              <TouchableOpacity
                key={iso}
                disabled={isPastDate(d)}
                onPress={() => {
                  setSelectedDate(iso);
                  setSelectedSlot(null);
                }}
                style={[
                  styles.dateBox,
                  isPastDate(d) && styles.dateDisabled,
                  selected && styles.dateBoxSelected,
                ]}
              >
                <Text
                  style={[styles.dateDay, selected && styles.dateTextSelected]}
                >
                  {DAY_ORDER[d.getDay()].slice(0, 3)}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    selected && styles.dateTextSelected,
                  ]}
                >
                  {d.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity onPress={() => setWeekOffset((p) => p + 1)}>
            <FontAwesome name="chevron-right" size={14} />
          </TouchableOpacity>
        </View>

        {/* Select Time */}
        <View style={styles.sectionHeader}>
          <FontAwesome name="clock-o" size={16} color={colors.darkGrey} />
          <Text style={styles.sectionTitle}>Select Time</Text>
        </View>

        <View style={styles.slotsContainer}>
          {slotsForDay.length === 0 ? (
            <Text style={styles.noSlots}>No available slots</Text>
          ) : (
            slotsForDay.map((slot) => {
              const selected =
                selectedSlot?.start === slot.slot_start &&
                selectedSlot?.end === slot.slot_end;

              return (
                <TouchableOpacity
                  key={`${slot.slot_start}-${slot.slot_end}`}
                  onPress={() => {
                    slotKey = getSlotKey(
                      mentorId,
                      selectedDate,
                      slot.slot_start,
                      slot.slot_end
                    );

                    const locked = lockSlot(slotKey);
                    if (!locked) return;
                    setSelectedSlot({
                      start: slot.slot_start,
                      end: slot.slot_end,
                    });
                  }}
                  style={[styles.slot, selected && styles.slotSelected]}
                >
                  <Text
                    style={[
                      styles.slotText,
                      selected && styles.slotTextSelected,
                    ]}
                  >
                    {formatTime(slot.slot_start)} - {formatTime(slot.slot_end)}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* hardcoded since we have only one mentee and it have EST time zone */}
        <Text
          style={{
            color: colors.textSecondary,
            fontWeight: 400,
            paddingTop: 10,
          }}
        >
          Timezone : EST (UTC-5)
        </Text>
      </ScrollView>

      {/* ---------- FOOTER ---------- */}
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={!selectedSlot}
          onPress={handleConfirm}
          style={[
            styles.confirmBtn,
            !selectedSlot && styles.confirmBtnDisabled,
          ]}
        >
          <Text style={styles.confirmText}>Confirm booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
