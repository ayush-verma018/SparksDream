import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import Header from "../components/Header";
import bookingsData from "../data/bookings.json";
import mentor_weekly_availability from "../data/mentor_weekly_availability.json";
import mentor_availability_overrides from "../data/mentor_availability_overrides.json";
import users from "../data/users.json";
import colors from "../theme/colors";
import { styles } from "./Reschedule.styles";
import { Booking } from "../types";
import {
  getMentorSlotsForDate,
  isSlotAvailable,
  rescheduleBooking,
  toLocalISODate,
} from "../utils/scheduler";

type Props = NativeStackScreenProps<RootStackParamList, "Reschedule">;

const DAY_ORDER = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export default function RescheduleScreen({ route, navigation }: Props) {
  const { bookingId } = route.params;
  const bookings: Booking[] = bookingsData as Booking[];
  const booking = bookings.find((b) => b.booking_id === bookingId);
  if (!booking) return <Text>Booking not found</Text>;

  const mentor = users.find((u) => u.user_id === booking.mentor_id);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "CONFLICT">("IDLE");
  const bookingDate = new Date(booking.start_datetime);
  bookingDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialWeekOffset = Math.floor(
    (bookingDate.getTime() - today.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );

  const [weekOffset, setWeekOffset] = useState(initialWeekOffset);
  const [selectedDate, setSelectedDate] = useState(toLocalISODate(bookingDate));
  const weekDates = useMemo(() => {
    const dates: Date[] = [];
    const base = new Date();
    base.setHours(0, 0, 0, 0);
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
  const slotsForDay = useMemo(() => {
    const d = new Date(selectedDate);
    const dayName = DAY_ORDER[d.getDay()];

    const raw = mentor_weekly_availability.filter(
      (a) => a.mentor_id === mentor?.user_id && a.day_of_week === dayName
    );

    const map = new Map<string, (typeof raw)[0]>();
    raw.forEach((s) => map.set(`${s.slot_start}-${s.slot_end}`, s));

    return Array.from(map.values());
  }, [selectedDate]);
  const handleReschedule = () => {
    if (!selectedDate || !selectedSlot) return;

    const updated = rescheduleBooking(
      booking,
      selectedDate,
      selectedSlot.start,
      selectedSlot.end,
      bookings
    );
    if (updated) {
      const index = bookings.findIndex((b) => b.booking_id === bookingId);
      bookings[index] = updated;
      setStatus("SUCCESS");
      navigation.navigate("BookingConfirmation", {
        bookingId: updated.booking_id,
      });
    } else {
      setStatus("CONFLICT");
    }
  };
  const formatDate = (datetime: string) => {
    const d = new Date(datetime);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const formatTime = (datetime: string) => {
    console.log(datetime);
    const d = new Date(datetime);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const formatTimePeriod = (datetime: string): string => {
    const [hourStr, minute] = datetime.split(":");
    let hour = Number(hourStr);

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // handle midnight & noon

    return `${hour.toString().padStart(2, "0")}:${minute} ${period}`;
  };

  if (!mentor) return <Text>Mentor not found</Text>;
  const isPastWeek = weekDates.every((d) => d < today);
  const initial = mentor.name.charAt(0).toUpperCase();
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.heading}>Reschedule session</Text>
        <View style={styles.divider} />
        <Text style={styles.subHeading}>Current booking</Text>
        <View style={styles.mentorCard}>
          <View style={styles.mentorCardLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
            <View>
              <Text style={styles.name}>{mentor.name}</Text>
              <Text style={styles.subject}>Computer science</Text>

              <View style={styles.sessionRow}>
                <FontAwesome
                  name="calendar"
                  size={14}
                  color={colors.textSecondary}
                />
                <Text style={styles.sessionText}>
                  {formatDate(booking.start_datetime)}
                </Text>
              </View>
              <View style={styles.sessionRow}>
                <FontAwesome
                  name="clock-o"
                  size={14}
                  color={colors.textSecondary}
                />
                <Text style={styles.sessionText}>
                  {formatTime(booking.start_datetime)} -{" "}
                  {formatTime(booking.end_datetime)} EST
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.warningBox}>
          <FontAwesome
            name="exclamation-circle"
            size={16}
            color={colors.warning}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.warningText}>
            Your mentor will be notified of the reschedule request.
          </Text>
        </View>
        <View style={styles.sectionHeader}>
          <FontAwesome name="calendar" size={16} color={colors.darkGrey} />
          <Text style={styles.sectionLabel}>Select new date</Text>
        </View>
        <View style={styles.weekNavRow}>
          <TouchableOpacity
            disabled={isPastWeek}
            onPress={() => setWeekOffset((p) => p - 1)}
          >
            <FontAwesome
              name="chevron-left"
              size={16}
              color={isPastWeek ? colors.textDisabled : colors.darkGrey}
            />
          </TouchableOpacity>

          {/* Dates */}
          <View style={styles.weekRow}>
            {weekDates.map((d) => {
              const iso = toLocalISODate(d);
              const selected = iso === selectedDate;
              const disabled = d < today;
              return (
                <TouchableOpacity
                  key={iso}
                  disabled={disabled}
                  onPress={() => {
                    setSelectedDate(iso);
                    setSelectedSlot(null);
                  }}
                  style={[
                    styles.dateBox,
                    selected && styles.dateBoxSelected,
                    disabled && styles.dateDisabled,
                  ]}
                >
                  <Text
                    style={[
                      styles.dateDay,
                      selected && styles.dateTextSelected,
                    ]}
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
          </View>

          <TouchableOpacity onPress={() => setWeekOffset((p) => p + 1)}>
            <FontAwesome
              name="chevron-right"
              size={16}
              color={colors.darkGrey}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionHeader}>
          <FontAwesome name="clock-o" size={16} color={colors.darkGrey} />
          <Text style={styles.sectionLabel}>Select new time</Text>
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
                  onPress={() =>
                    setSelectedSlot({
                      start: slot.slot_start,
                      end: slot.slot_end,
                    })
                  }
                  style={[styles.slot, selected && styles.slotSelected]}
                >
                  <Text
                    style={[
                      styles.slotText,
                      selected && styles.slotTextSelected,
                    ]}
                  >
                    {formatTimePeriod(slot.slot_start)} -{" "}
                    {formatTimePeriod(slot.slot_end)}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </View>
        <Text
          style={{
            color: colors.textSecondary,
            fontWeight: 400,
            paddingTop: 10,
          }}
        >
          Timezone : EST (UTC-5)
        </Text>
        {status === "CONFLICT" && (
          <Text style={styles.conflictText}>Conflict! Pick another slot.</Text>
        )}
        <TouchableOpacity
          disabled={!selectedDate || !selectedSlot}
          style={[
            styles.confirmButton,
            (!selectedDate || !selectedSlot) && styles.buttonDisabled,
          ]}
          onPress={handleReschedule}
        >
          <Text style={styles.confirmText}>Confirm Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
