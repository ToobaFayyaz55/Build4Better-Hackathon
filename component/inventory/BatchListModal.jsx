import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import InventoryCard from "./InventoryCard";
import { updateSoldQuantity, calculateExpiryDate, calculateStatus } from "../../utils/addItemsUtils";

const PRIMARY = "#bd9e4b";

export default function BatchListModal({ visible, onClose, crop, batches, onUpdateBatch }) {
  const [localBatches, setLocalBatches] = useState(batches);

  // Edit sold quantity modal
  const [editBatch, setEditBatch] = useState(null);
  const [editQty, setEditQty] = useState("");

  // Add batch modal
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [newQty, setNewQty] = useState("");
  const [harvestDate, setHarvestDate] = useState(null);

  useEffect(() => {
    setLocalBatches(batches);
  }, [batches]);

  // --- Edit sold qty ---
  const openEditModal = (batch) => {
    setEditBatch(batch);
    setEditQty(batch.sold_qty.toString());
  };

  const saveEditQty = () => {
    const newQtyInt = parseInt(editQty);
    if (isNaN(newQtyInt) || newQtyInt < 0 || newQtyInt > editBatch.qty) {
      alert("Invalid quantity!");
      return;
    }

    const updatedBatch = updateSoldQuantity(editBatch, newQtyInt);
    const updatedBatches = localBatches.map((b) =>
      b.id === updatedBatch.id ? updatedBatch : b
    );

    setLocalBatches(updatedBatches);
    if (onUpdateBatch) onUpdateBatch(updatedBatch);

    setEditBatch(null);
    setEditQty("");
  };

  // --- Add new batch ---
  const handleAddBatch = () => {
    const qtyInt = parseInt(newQty);
    if (!qtyInt || !harvestDate) {
      alert("Enter valid quantity and harvest date!");
      return;
    }

    // Format date safely
    const formattedHarvest = harvestDate.toISOString().split("T")[0];

    const expiry_date = calculateExpiryDate(harvestDate, crop.category || "fruits");

    const newBatchObj = {
      qty: qtyInt,
      sold_qty: 0,
      harvest_date: formattedHarvest,
      expiry_date,
    };

    const status = calculateStatus(newBatchObj);

    const batchId = Math.max(0, ...localBatches.map((b) => b.id)) + 1;

    const newBatch = {
      id: batchId,
      crop_id: crop.id,
      ...newBatchObj,
      status,
    };

    const updatedBatches = [...localBatches, newBatch];
    setLocalBatches(updatedBatches);
    if (onUpdateBatch) onUpdateBatch(newBatch);

    setNewQty("");
    setHarvestDate(null);
    setShowAddBatch(false);
  };

  return (
    <>
      {/* Main batch list modal */}
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

            <TouchableOpacity
              style={styles.addBatchButton}
              onPress={() => setShowAddBatch(true)}
            >
              <Text style={styles.addBatchText}>+ Add New Batch</Text>
            </TouchableOpacity>

            <FlatList
              data={localBatches}
              keyExtractor={(b) => b.id.toString()}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <InventoryCard crop={crop} batch={item} />
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => openEditModal(item)}
                  >
                    <Text style={styles.editButtonText}>Edit Sold Qty</Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>
      </Modal>

      {/* Edit Sold Quantity Modal */}
      <Modal visible={!!editBatch} transparent animationType="slide">
        <View style={styles.editOverlay}>
          <View style={styles.editContainer}>
            <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 10 }}>
              Edit Sold Quantity
            </Text>
            <Text>Current sold: {editBatch?.sold_qty}</Text>
            <TextInput
              value={editQty}
              onChangeText={setEditQty}
              keyboardType="numeric"
              style={styles.editInput}
            />
            <View style={{ flexDirection: "row", marginTop: 12, justifyContent: "space-between" }}>
              <TouchableOpacity style={styles.saveButton} onPress={saveEditQty}>
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditBatch(null)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Batch Modal */}
      <Modal visible={showAddBatch} transparent animationType="slide">
        <View style={styles.editOverlay}>
          <View style={styles.editContainer}>
            <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 10 }}>
              Add New Batch
            </Text>
            <TextInput
              value={newQty}
              onChangeText={setNewQty}
              keyboardType="numeric"
              placeholder="Enter quantity"
              style={styles.editInput}
            />

            {/* Calendar Picker */}
            <Text style={{ marginTop: 12, marginBottom: 6 }}>Harvest Date</Text>
            <CalendarPicker
              onDateChange={(date) => setHarvestDate(date)}
              selectedStartDate={harvestDate}
              todayBackgroundColor="#bd9e4b33"
              selectedDayColor="#bd9e4b"
              textStyle={{ color: "#111827", fontSize: 12 }}
              width={250}
              height={250}
              dayShape="square"
              dayTextStyle={{ fontSize: 12 }}
              monthTitleStyle={{ fontSize: 14 }}
            />
            {harvestDate && (
              <Text style={{ marginTop: 6 }}>
                Selected: {harvestDate.toISOString().split("T")[0]}
              </Text>
            )}

            <View style={{ flexDirection: "row", marginTop: 12, justifyContent: "space-between" }}>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddBatch}>
                <Text style={{ color: "#fff" }}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddBatch(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  editButton: {
    marginTop: 4,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: PRIMARY,
    borderRadius: 8,
  },
  editButtonText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  editOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  editContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "left",
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    width: "100%",
  },
  saveButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  addBatchButton: {
    backgroundColor: "#bd9e4b",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  addBatchText: { color: "#fff", fontWeight: "600" },
});
