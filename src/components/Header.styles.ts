import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    marginRight: 12,
  },

  backText: {
    fontSize: 18,
    color: colors.textPrimary,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  navItem: {
    marginRight: 16,
  },

  navText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.avatarBg,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: colors.white,
    fontWeight: "600",
  },

  menu: {
    position: "absolute",
    top: 44,
    right: 0,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 10,
    width: 160,
    elevation: 4, // Android shadow
  },

  menuName: {
    fontWeight: "600",
    marginBottom: 8,
    color: colors.textPrimary,
  },

  logoutText: {
    color: colors.danger,
  },
});
