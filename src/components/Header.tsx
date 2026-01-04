import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./Header.styles";
import colors from "../theme/colors";

export default function Header() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [showMenu, setShowMenu] = useState(false);

  const noBackScreens = ["MentorList", "BookingConfirmation"];
  const showBack = !noBackScreens.includes(route.name);

  // Determine active tab
  const isMentorTab = route.name === "MentorList";
  const isBookingsTab = route.name === "BookingsList";

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome
              name="chevron-left"
              size={12}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.title}>SparksDreams</Text>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MentorList")}
          style={styles.navItem}
        >
          <Text
            style={{
              ...styles.navText,
              color: isMentorTab ? colors.primary : colors.textSecondary,
              fontWeight: isMentorTab ? "700" : "500",
            }}
          >
            Mentors
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("BookingsList")}
          style={styles.navItem}
        >
          <Text
            style={{
              ...styles.navText,
              color: isBookingsTab ? colors.primary : colors.textSecondary,
              fontWeight: isBookingsTab ? "700" : "500",
            }}
          >
            Bookings
          </Text>
        </TouchableOpacity>

        {/* Avatar */}
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>
        </TouchableOpacity>

        {showMenu && (
          <View style={styles.menu}>
            <Text style={styles.menuName}>Rahul Verma</Text>
            <TouchableOpacity>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
