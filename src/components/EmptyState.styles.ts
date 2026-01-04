import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    alignItems: "center",
  },

  /* Mentor Card */
  mentorCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    marginBottom: 24,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.avatarBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  mentorName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  mentorSubject: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },

  /* Center Icon + Text */
  centerIconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  noSlotsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  noSlotsMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
  },

  /* Buttons */
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryBtn: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  /* Bullet Section */
  bulletSection: {
    width: "100%",
    marginTop: 12,
  },
  subHeading: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bullet: {
    fontSize: 14,
    color: colors.textPrimary,
    marginRight: 6,
    lineHeight: 20,
  },
  bulletText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    flex: 1,
  },
});
