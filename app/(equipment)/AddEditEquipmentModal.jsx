import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES = ["Tractor", "Harvester", "Plough", "Vehicle", "Seeder"];
const STATUS_OPTIONS = ["Available", "Rented", "Under Maintenance"];

export default function AddEditEquipmentModal({ visible, equipment, onClose, onSave }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [condition, setCondition] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [rentalEnd, setRentalEnd] = useState("");

  useEffect(() => {
    if (equipment) {
      setName(equipment.name);
      setCategory(equipment.category);
      setCondition(equipment.condition);
      setImages(equipment.images || []);
      setStatus(equipment.status);
      setRentalEnd(equipment.rentalEnd || "");
    } else {
      setName("");
      setCategory(CATEGORIES[0]);
      setCondition("");
      setImages([]);
      setStatus(STATUS_OPTIONS[0]);
      setRentalEnd("");
    }
  }, [equipment]);

  const handleSave = () => {
    const newData = { ...equipment, name, category, condition, images, status, rentalEnd };
    onSave(newData);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{equipment ? "Edit Equipment" : "Add Equipment"}</Text>
          <ScrollView style={{ flex: 1 }}>
            <TextInput
              placeholder="Equipment Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, category === cat && styles.chipActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={category === cat ? { color: "#fff" } : {}}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Condition / Specs</Text>
            <TextInput
              placeholder="Engine, capacity, condition..."
              value={condition}
              onChangeText={setCondition}
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <Text style={styles.label}>Status</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {STATUS_OPTIONS.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.chip, status === s && styles.chipActive]}
                  onPress={() => setStatus(s)}
                >
                  <Text style={status === s ? { color: "#fff" } : {}}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Rental End Date (only if rented) */}
            {status === "Rented" && (
              <>
                <Text style={styles.label}>Rental End Date/Time</Text>
                <TextInput
                  placeholder="YYYY-MM-DD HH:MM"
                  value={rentalEnd}
                  onChangeText={setRentalEnd}
                  style={styles.input}
                />
              </>
            )}

            {/* Images Preview */}
            <Text style={styles.label}>Images</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {images.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.image} />
              ))}
              <TouchableOpacity
                style={styles.addImageBtn}
                onPress={() =>
                  setImages([...images, "https://via.placeholder.com/150"])
                }
              >
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#E5E7EB" }]} onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: "#4B9CD3" }]} onPress={handleSave}>
              <Text style={{ color: "#fff" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  container: { margin: 16, backgroundColor: "#fff", borderRadius: 12, padding: 16, height: "90%" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 8, marginBottom: 12 },
  label: { marginBottom: 4, fontWeight: "600" },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: "#E5E7EB", marginRight: 8 },
  chipActive: { backgroundColor: "#4B9CD3", color: "#fff" },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 8 },
  addImageBtn: { width: 80, height: 80, backgroundColor: "#4B9CD3", justifyContent: "center", alignItems: "center", borderRadius: 8 },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center", marginHorizontal: 4 },
});
