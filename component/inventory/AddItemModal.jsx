import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CalendarPicker from "react-native-calendar-picker";
import { calculateExpiryDate, calculateStatus } from "../../utils/addItemsUtils";

export default function AddItemModal({ visible, onClose, onAddItem  }) {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitType, setUnitType] = useState("kg");
  const [category, setCategory] = useState("fruits");
  const [harvestDate, setHarvestDate] = useState(null);
  
  const handleAdd = () => {
    if (!cropName || !quantity || !harvestDate) return;
    
    const expiryDate = calculateExpiryDate(harvestDate, category);
    const newCrop = {crop_name: cropName, unit_type: unitType, category };
    const newBatch = {
      qty: parseInt(quantity),
      harvest_date: harvestDate.toISOString().split("T")[0],
      expiry_date: expiryDate,
      sold_qty: 0,
    };
    newBatch.status = calculateStatus(newBatch);

    onAddItem(newCrop, newBatch); // call parent
    onClose(); // close modal

    // Reset fields
    setCropName("");
    setQuantity("");
    setUnitType("kg");
    setCategory("fruits");
    setHarvestDate(null);
  };


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add New Batch</Text>

          {/* Crop Name */}
          <TextInput
            style={styles.input}
            placeholder="Crop Name"
            placeholderTextColor="#9CA3AF"
            value={cropName}
            onChangeText={setCropName}
          />

          {/* Quantity */}
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />

          {/* Unit Type Dropdown */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Unit Type</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={unitType}
                onValueChange={(itemValue) => setUnitType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Kilograms (kg)" value="kg" />
                <Picker.Item label="Crates" value="crates" />
                <Picker.Item label="Bags" value="bags" />
              </Picker>
            </View>
          </View>

          {/* Category Dropdown */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Fruits & Vegetables" value="fruits" />
                <Picker.Item label="Grains & Pulses" value="grains" />
                <Picker.Item label="Oilseeds & Dry Products" value="oilseeds" />
              </Picker>
            </View>
          </View>

          {/* Harvest Date Picker */}
          <View style={styles.calendarContainer}>
            <Text style={styles.label}>Harvest Date</Text>
            <CalendarPicker
              onDateChange={(date) => setHarvestDate(date)}
              selectedStartDate={harvestDate}
              todayBackgroundColor="#bd9e4b33"
              selectedDayColor="#bd9e4b"
              textStyle={{ color: "#111827", fontSize: 12 }} // smaller text
              width={250} // make calendar narrower
              height={250} // limit height
              dayShape="square" // optional: square days to save space
              dayTextStyle={{ fontSize: 12 }} // smaller day numbers
              monthTitleStyle={{ fontSize: 14 }}
            />
          </View>

          {harvestDate && (
            <Text style={styles.selectedDateText}>
              Selected Date: {harvestDate.toISOString().split("T")[0]}
            </Text>
          )}

          {/* Buttons */}
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
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
    backgroundColor: "rgba(0,0,0,0.4)",
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
    marginBottom: 12,
    fontSize: 16,
    color: "#111827",
  },
  dropdownContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
  },
  picker: {
    height: 45,
    color: "#111827",
  },
  calendarContainer: {
   marginBottom: 12,
  alignSelf: "center",
  },
  selectedDateText: {
    fontSize: 16,
  color: "#111827",
  marginBottom: 12,
  textAlign: "center",
  },
  addButton: {
    backgroundColor: "#bd9e4b",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 8,
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
