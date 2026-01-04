import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    padding: 16,
  },

  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: colors.textPrimary,
  },

  mentorCard: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 14,
    backgroundColor: colors.white,
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: colors.border,
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
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
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

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },

  dayCard: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  dayText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },

  dateText: {
    fontSize: 14,
    color: colors.textPrimary, // darker as requested
    marginBottom: 8,
  },

  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  slot: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },

  noSlots: {
    color: colors.textDisabled,
    fontStyle: "italic",
  },

  slotDisabled: {
    backgroundColor: colors.disabledBg,
    borderColor: colors.borderDisabled,
    opacity: 0.5,
  },

  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 12,
    fontStyle: "italic",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weekSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  weekLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
  },

  weekArrow: {
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },

  weekArrowDisabled: {
    opacity: 0.4,
  },
});
