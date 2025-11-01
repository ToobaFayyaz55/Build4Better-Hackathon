import { StyleSheet } from "react-native";

export const ownerCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  callButton: { backgroundColor: "#bd9e4b", padding: 8, borderRadius: 12 },
  callText: { color: "#fff", fontWeight: "bold" },
});