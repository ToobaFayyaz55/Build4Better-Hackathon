import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import InventoryCard from "./InventoryCard";
 // keep your InventoryCard file path
const PRIMARY = "#bd9e4b";

export default function BatchListModal({ visible, onClose, crop, batches }) {
  // batches: array of batch objects for this crop
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{crop.crop_name} — Batches</Text>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.close, { backgroundColor: PRIMARY }]}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={batches}
            keyExtractor={(b) => b.id.toString()}
            renderItem={({ item }) => (
              <InventoryCard crop={crop} batch={item} />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "92%",
    maxHeight: "86%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "700", color: "#111827" },
  close: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  closeText: { color: "#fff", fontWeight: "700" },
});
