import React from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from "react-native";

export default function AddItemModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add New Batch</Text>

          <TextInput
            style={styles.input}
            placeholder="Crop Name"
            placeholderTextColor="#9CA3AF"
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Harvest Date (YYYY-MM-DD)"
            placeholderTextColor="#9CA3AF"
          />

          <TouchableOpacity style={styles.addButton} onPress={onClose}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 16,
    color: "#111827",
  },
  addButton: {
    backgroundColor: "#bd9e4b", // primary color
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 4,
  },
  addButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 12,
  },
  cancelButtonText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 15,
  },
});
