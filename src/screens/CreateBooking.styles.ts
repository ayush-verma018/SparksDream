import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export const styles = StyleSheet.create({
  /* ---------- Screen ---------- */
  screen: {
    flex: 1,
    backgroundColor: colors.screenbg, // very light purple tint
  },

  container: {
    padding: 16,
    paddingBottom: 32,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ---------- Headings ---------- */
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.textPrimary,
    marginLeft: 8,
  },

  /* ---------- Mentor Card ---------- */
  mentorCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
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

  /* ---------- Date Selector ---------- */
  weekRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  dateBox: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  dateBoxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  dateDay: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateDisabled: {
    backgroundColor: "#F5F5F7", // very light grey
    borderColor: "#E5E5EA",
    opacity: 0.5,
  },

  dateNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  dateTextSelected: {
    color: colors.white,
  },

  /* ---------- Slots ---------- */
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  slot: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
  },

  slotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  slotText: {
    fontSize: 14,
    color: colors.textPrimary,
  },

  slotTextSelected: {
    color: colors.white,
    fontWeight: "500",
  },

  noSlots: {
    fontSize: 13,
    color: colors.textDisabled,
    fontStyle: "italic",
  },

  /* ---------- Confirm Button ---------- */
  confirmBtn: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  confirmBtnDisabled: {
    backgroundColor: colors.borderDisabled,
  },

  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  footer: {
    padding: 16,
    backgroundColor: colors.white,
  },
});
