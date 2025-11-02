import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

const categories = ["Machinery", "Transport", "Seeds", "Fertilizer"];

export default function CreatePostModal({
  visible,
  onClose,
  postToEdit,
  currentUserPhone,
}) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetFields = () => {
    // ADDED: Function to clear state
    setCategory("");
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (postToEdit) {
      const cat =
        typeof postToEdit.category === "string"
          ? postToEdit.category
          : postToEdit.category?.[0];
      setCategory(cat || "");
      setTitle(postToEdit.title || "");
      setDescription(postToEdit.description || "");
    } else {
      // Use resetFields here for when postToEdit is null/undefined
      resetFields();
    }
  }, [postToEdit]);

  const handlePost = async () => {
    if (!category || !title) {
      alert("Category and Title are required!");
      return;
    }

    const now = new Date();
    const utcPlus5 = new Date(now.getTime() + 5 * 60 * 60 * 1000);

    const payload = {
      title,
      description,
      category,
      contact: currentUserPhone,
    };

    let error;
    if (postToEdit) {
      // For UPDATE, we typically don't change the created_at time.
      ({ error } = await supabase
        .from("bulletin")
        .update(payload)
        .eq("id", postToEdit.id));
    } else {
      payload.created_at = utcPlus5.toISOString();
      ({ error } = await supabase.from("bulletin").insert([payload]));
    }

    if (error) console.error("Error saving post:", error.message);

    // Call resetFields here before closing to clear for the next open
    resetFields();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <Pressable style={styles.modalContainer}>
          <Text style={styles.modalHeader}>
            {postToEdit ? "Edit Post" : "New Post"}
          </Text>

          <Text style={styles.label}>Category *</Text>
          <View style={styles.dropdownContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.dropdownItem,
                  category === cat && styles.dropdownItemSelected,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description (optional)"
            multiline
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                // Call resetFields when cancelling too
                resetFields();
                onClose();
              }}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
              <Text style={styles.btnText}>
                {postToEdit ? "Update" : "Post"}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "90%",
  },
  modalHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  label: { fontSize: 14, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  dropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  dropdownItem: {
    padding: 6,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  dropdownItemSelected: { backgroundColor: "#bd9e4b" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancelBtn: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 6,
    marginRight: 10,
  },
  postBtn: { padding: 10, backgroundColor: "#bd9e4b", borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "bold" },
});
