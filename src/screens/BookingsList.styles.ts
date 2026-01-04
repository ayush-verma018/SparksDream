import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screenbg,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  noBookings: {
    fontSize: 14,
    color: colors.textDisabled,
    fontStyle: "italic",
    marginTop: 16,
  },

  /* Card */
  card: {
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
  cardLeft: {
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

  /* Session info row */
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
});
