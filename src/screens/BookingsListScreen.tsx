import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import Header from "../components/Header";
import users from "../data/users.json";
import bookings from "../data/bookings.json";
import colors from "../theme/colors";
import { styles } from "./BookingsList.styles";

type Props = NativeStackScreenProps<RootStackParamList, "BookingsList">;

export default function BookingsListScreen({ navigation }: Props) {
  const myBookings = bookings.filter((b) => b.mentee_id === "mentee_01");

  const getMentor = (mentorId: string) =>
    users.find((u) => u.user_id === mentorId);

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
    const d = new Date(datetime);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getSessionDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffMs = endDate.getTime() - startDate.getTime();

    const diffMins = Math.round(diffMs / 60000);
    return diffMins;
  };

  const renderBooking = ({ item }: any) => {
    const mentor = getMentor(item.mentor_id);
    if (!mentor) return null;
    const initial = mentor.name.charAt(0).toUpperCase();

    // Check if booking is in the past
    const bookingEnd = new Date(item.end_datetime);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare only date
    const isPast = bookingEnd < today;

    return (
      <TouchableOpacity
        style={[styles.card, isPast && { opacity: 0.5 }]}
        onPress={() =>
          !isPast &&
          navigation.navigate("Reschedule", { bookingId: item.booking_id })
        }
        disabled={isPast} // disable tap
      >
        <View style={styles.cardLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View>
            <Text style={styles.name}>{mentor.name}</Text>
            <Text style={styles.subject}>
              {getSessionDuration(item.start_datetime, item.end_datetime)} min
              session
            </Text>

            <View style={styles.sessionRow}>
              <FontAwesome
                name="calendar"
                size={14}
                color={colors.textSecondary}
              />
              <Text style={styles.sessionText}>
                {formatDate(item.start_datetime)}
              </Text>
            </View>
            <View style={styles.sessionRow}>
              <FontAwesome
                name="clock-o"
                size={14}
                color={colors.textSecondary}
              />
              <Text style={styles.sessionText}>
                {formatTime(item.start_datetime)} -{" "}
                {formatTime(item.end_datetime)} EST
              </Text>
            </View>
          </View>
        </View>

        <FontAwesome
          name="chevron-right"
          size={14}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Header />
      <FlatList
        data={myBookings}
        keyExtractor={(item) => item.booking_id}
        renderItem={renderBooking}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.title}>My Bookings</Text>}
        ListEmptyComponent={
          <Text style={styles.noBookings}>No bookings yet.</Text>
        }
      />
    </View>
  );
}
