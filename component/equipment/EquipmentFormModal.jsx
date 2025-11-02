import { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";

const PRIMARY = "#bd9e4b"; // Gold
const BACKGROUND = "#fff";  // App-wide white

export default function AddEquipmentModal({ visible, onClose, onAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [specs, setSpecs] = useState("");
  const [status, setStatus] = useState("Available");
  const [rentStart, setRentStart] = useState("");
  const [rentEnd, setRentEnd] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !category) return alert("Please fill all required fields.");
    setLoading(true);

    const { error } = await supabase.from("equipment").insert([
      {
        owner_id: "demo-owner-1",
        name,
        category,
        specs,
        status,
        rent_start: rentStart || null,
        rent_end: rentEnd || null,
        image_url: imageUrl || null,
      },
    ]);

    setLoading(false);
    if (error) {
      console.error(error);
      alert("Error adding equipment!");
    } else {
      alert("Equipment added successfully!");
      onAdded?.();
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.title}>Add New Equipment</Text>

            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Category"
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Specs / Details"
              style={[styles.input, { height: 80 }]}
              value={specs}
              onChangeText={setSpecs}
              multiline
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Status (Available/Rented)"
              style={styles.input}
              value={status}
              onChangeText={setStatus}
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Rent Start (optional)"
              style={styles.input}
              value={rentStart}
              onChangeText={setRentStart}
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Rent End (optional)"
              style={styles.input}
              value={rentEnd}
              onChangeText={setRentEnd}
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Image URL (optional)"
              style={styles.input}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? "Saving..." : "Save"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
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
  modal: {
    backgroundColor: BACKGROUND,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "85%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: PRIMARY,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
    color: "#111",
  },
  button: {
    backgroundColor: PRIMARY,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  cancel: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: BACKGROUND,
    fontWeight: "600",
    fontSize: 16,
  },
});
