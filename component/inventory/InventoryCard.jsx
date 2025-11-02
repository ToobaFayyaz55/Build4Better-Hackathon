import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function InventoryCard({ crop, batch }) {
  const remaining = batch.qty - batch.sold_qty;

  // Background color based on status
  const cardBackground =
    batch.status === "Sold Out" ? styles.soldOutCard : styles.defaultCard;

  // Text color for status only
  const statusTextColor =
    batch.status === "Available"
      ? styles.textAvailable
      : batch.status === "Expiring Soon"
        ? styles.textExpiring
        : styles.textSoldOut;

  return (
    <View style={[styles.card, cardBackground]}>
      <Text style={styles.title}>{crop.crop_name}</Text>

      <Text style={styles.text}>
        Qty: {remaining} / {batch.qty} {crop.unit_type}
      </Text>
      <Text style={styles.text}>Harvest: {batch.harvest_date}</Text>
      <Text style={styles.text}>Expiry: {batch.expiry_date}</Text>

      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, statusTextColor]}>{batch.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb", // light gray border
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  defaultCard: {
    backgroundColor: "#fffffa", // light cream for Available/Expiring
  },
  soldOutCard: {
    backgroundColor: "#f3f4f6", // light gray for Sold Out
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937", // gray-800
  },
  text: {
    color: "#4b5563", // gray-600
    marginTop: 4,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  textAvailable: {
    color: "#15803d", // green-700
  },
  textExpiring: {
    color: "#a16207", // yellow-700
  },
  textSoldOut: {
    color: "#6b7280", // gray-500
  },
});
