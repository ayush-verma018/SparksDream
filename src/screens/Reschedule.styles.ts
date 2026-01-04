import { StyleSheet, Dimensions } from "react-native";
import colors from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  subHeading: {
    color: colors.textSecondary,
    fontSize: 14,
    marginVertical: 8,
  },
  mentorCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  mentorCardLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.avatarBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "600",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  subject: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  mentorRole: {
    fontSize: 14,
    color: "#666",
  },
  sessionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  sessionText: {
    fontSize: 13,
    color: colors.darkGrey,
    marginLeft: 6,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.warningBorder,
    backgroundColor: colors.warningBg,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  warningText: {
    color: colors.warning,
    flex: 1,
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
    marginBottom: 12,
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
  weekNavRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginHorizontal: 8,
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
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dateDisabled: {
    opacity: 0.4,
  },
  dateDay: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
  dateTextSelected: {
    color: colors.white,
    fontWeight: "700",
  },
  slot: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  slotSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  slotDisabled: {
    opacity: 0.5,
  },
  slotText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  slotTextSelected: {
    fontWeight: "700",
    color: colors.white,
  },
  noSlots: {
    textAlign: "center",
    color: colors.textDisabled,
    fontSize: 14,
    paddingVertical: 12,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: colors.borderDisabled,
  },
  confirmText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  conflictText: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },
});
