import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screenbg,
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

  noBooking: {
    fontSize: 16,
    color: colors.textDisabled,
  },

  /* Header Row */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 24,
  },

  tickContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
  },
  confirmMessage: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 20,
  },

  /* Details Card */
  detailsCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },

  cardDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },

  mentorCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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

  /* Session Info */
  sessionInfo: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "500",
  },

  subHeading: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginBottom: 4,
  },

  meetingLink: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 12,
  },

  infoMessage: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: "italic",
    marginBottom: 24,
  },

  /* Buttons */
  buttonContainer: {
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  primaryBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    borderRadius: 10,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
});
