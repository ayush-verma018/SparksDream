import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

import { RootStackParamList } from "../../App";
import bookingsData from "../data/bookings.json";
import users from "../data/users.json";
import { Booking } from "../types";
import Header from "../components/Header";
import colors from "../theme/colors";
import { styles } from "./BookingConfirmation.styles";

type Props = NativeStackScreenProps<RootStackParamList, "BookingConfirmation">;

export default function BookingConfirmationScreen({
  route,
  navigation,
}: Props) {
  const { bookingId } = route.params;

  const bookings: Booking[] = bookingsData as Booking[];
  const booking = bookings.find((b) => b.booking_id === bookingId);
  const mentor = users.find((u) => u.user_id === booking?.mentor_id);

  if (!booking || !mentor)
    return (
      <View style={styles.center}>
        <Text style={styles.noBooking}>Booking not found</Text>
      </View>
    );

  // Format Date & Time
  const startDate = new Date(booking.start_datetime);
  const endDate = new Date(booking.end_datetime);

  const formatDate = (d: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return d.toLocaleDateString("en-US", options);
  };

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Booking Confirmed</Text>
          <TouchableOpacity onPress={() => navigation.navigate("MentorList")}>
            <FontAwesome name="times" size={16} color={colors.darkGrey} />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Tick icon */}
        <View style={styles.tickContainer}>
          <FontAwesome name="check" size={40} color={colors.white} />
        </View>
        <Text style={styles.confirmMessage}>Your session is confirmed</Text>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          {/* Mentor Card */}
          <View style={styles.mentorCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {mentor.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.mentorName}>{mentor.name}</Text>
              <Text style={styles.mentorSubject}>Computer science mentor</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Session Info */}
          <View style={styles.sessionInfo}>
            <View style={styles.infoRow}>
              <FontAwesome
                name="calendar"
                size={16}
                color={colors.textSecondary}
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{formatDate(startDate)}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome
                name="clock-o"
                size={16}
                color={colors.textSecondary}
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>
                  {formatTime(startDate)} - {formatTime(endDate)}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome
                name="map-marker"
                size={16}
                color={colors.textSecondary}
              />
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Timezone</Text>
                <Text style={styles.infoValue}>
                  Eastern Standard Time (EST)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Meeting link */}
        <Text style={styles.subHeading}>Meeting link</Text>
        <Text style={styles.meetingLink}>meet.example.com/session-abc123</Text>

        {/* Info message */}
        <Text style={styles.infoMessage}>
          A calendar invite has been sent to your email. You'll receive a
          reminder 24 hours before the session.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Add to Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate("BookingsList")}
          >
            <Text style={styles.secondaryBtnText}>View my sessions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
