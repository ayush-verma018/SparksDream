import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../theme/colors";
import { styles } from "./EmptyState.styles";

type Props = {
  mentor?: { name: string };
  onNotify?: () => void;
  onViewOtherMentors?: () => void;
};

export default function EmptyState({
  mentor,
  onNotify,
  onViewOtherMentors,
}: Props) {
  const mentorInitial = mentor?.name?.charAt(0).toUpperCase() || "";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Mentor Card */}
      {mentor && (
        <View style={styles.mentorCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{mentorInitial}</Text>
          </View>
          <View>
            <Text style={styles.mentorName}>{mentor.name}</Text>
            <Text style={styles.mentorSubject}>Computer Science</Text>
          </View>
        </View>
      )}

      {/* Center Icon + Text */}
      <View style={styles.centerIconContainer}>
        <View style={styles.iconCircle}>
          <FontAwesome name="calendar" size={28} color={colors.darkGrey} />
        </View>
        <Text style={styles.noSlotsTitle}>No available slots</Text>
        <Text style={styles.noSlotsMessage}>
          This mentor doesn't have any available time slots at the moment. Check
          back later or set up a notification.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={onNotify}>
          <FontAwesome
            name="bell"
            size={16}
            color={colors.white}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.primaryBtnText}>Notify me when available</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={onViewOtherMentors}
        >
          <Text style={styles.secondaryBtnText}>View other mentors</Text>
        </TouchableOpacity>
      </View>

      {/* Subheading + bullets */}
      <View style={styles.bulletSection}>
        <Text style={styles.subHeading}>What you can do:</Text>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Enable notifications to get alerted when slots open
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Browse other mentors in Computer Science
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>
            Check this mentor's availability next week
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
