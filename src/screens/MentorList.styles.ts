import { StyleSheet } from "react-native";
import Colors from "../theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  listContent: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.textPrimary,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  cardleft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.avatarBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },

  name: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textPrimary,
  },

  subject: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
