import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const equipmentCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 16,
    overflow: "hidden",
  },
  cardContent: { padding: 16 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  category: { fontSize: 14, color: "#666" },
  specs: { fontSize: 14, color: "#555", marginTop: 8 },
  statusTag: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 50 },
  statusAvailable: { backgroundColor: "#38a169" },
  statusRented: { backgroundColor: "#e53e3e" },
  statusMaintenance: { backgroundColor: "#d69e2e" },
  ownerContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  callButton: {
    backgroundColor: "#bd9e4b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  callText: { color: "#fff", fontWeight: "bold" },
  image: { width: width - 32, height: (width - 32) * 0.6, borderRadius: 12 },
});
