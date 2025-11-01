import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EquipmentFormModal from "../../component/equipment/EquipmentFormModal";

export default function AddEditScreen() {
  const router = useRouter();
  const [formVisible, setFormVisible] = useState(true); // modal opens by default

  const handleSave = (formData) => {
    console.log("Equipment saved:", formData);
    // Later: send to Supabase
    setFormVisible(false);
    router.back(); // go back to EquipmentHub
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>◀️</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add / Edit Equipment</Text>
      </View>

      {/* Popup Form */}
      <EquipmentFormModal
        visible={formVisible}
        onClose={() => {
          setFormVisible(false);
          router.back();
        }}
        onSave={handleSave}
      />
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 2,
    borderColor: "#bd9e4b",
  },
  backArrow: {
    fontSize: 20,
    color: "#bd9e4b",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#bd9e4b",
  },
});
