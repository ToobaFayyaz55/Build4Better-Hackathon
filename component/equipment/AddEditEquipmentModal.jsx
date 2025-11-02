import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
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
const RENT_UNITS = ["Hours", "Days"];
const PRIMARY_GOLD = "#bd9e4b";

export default function AddEditEquipmentModal({
  visible,
  equipment,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [condition, setCondition] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [rentalNumber, setRentalNumber] = useState("");
  const [rentalUnit, setRentalUnit] = useState(RENT_UNITS[0]);

  useEffect(() => {
    if (equipment) {
      setName(equipment.name || "");
      setCategory(equipment.category || CATEGORIES[0]);
      setCondition(equipment.condition || "");
      setImages(equipment.images || []);
      setStatus(equipment.status || STATUS_OPTIONS[0]);
      setRentalNumber(equipment.rentalNumber?.toString() || "");
      setRentalUnit(equipment.rentalUnit || RENT_UNITS[0]);
    } else {
      setName("");
      setCategory(CATEGORIES[0]);
      setCondition("");
      setImages([]);
      setStatus(STATUS_OPTIONS[0]);
      setRentalNumber("");
      setRentalUnit(RENT_UNITS[0]);
    }
  }, [equipment]);

  const pickImage = async () => {
    const { status: perm } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm !== "granted") {
      Alert.alert(
        "Permission required",
        "Allow gallery access to select images."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImages([...images, { uri: result.assets[0].uri }]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Name required");
      return;
    }
    if (images.length === 0) {
      Alert.alert("At least 1 image required");
      return;
    }
    onSave({
      ...equipment,
      name,
      category,
      condition,
      images,
      status,
      rentalNumber: rentalNumber ? parseInt(rentalNumber) : null,
      rentalUnit,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {equipment ? "Edit Equipment" : "Add Equipment"}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              placeholder="Equipment Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <Text style={styles.label}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, category === cat && styles.chipActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={category === cat ? { color: "#fff" } : {}}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Condition / Specs</Text>
            <TextInput
              placeholder="Engine, capacity..."
              value={condition}
              onChangeText={setCondition}
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <Text style={styles.label}>Status</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
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

            {status === "Rented" && (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.label}>Rental Duration</Text>
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <TextInput
                    placeholder="Number"
                    value={rentalNumber}
                    onChangeText={setRentalNumber}
                    keyboardType="numeric"
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  />
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {RENT_UNITS.map((unit) => (
                      <TouchableOpacity
                        key={unit}
                        style={[
                          styles.chip,
                          rentalUnit === unit && styles.chipActive,
                        ]}
                        onPress={() => setRentalUnit(unit)}
                      >
                        <Text
                          style={rentalUnit === unit ? { color: "#fff" } : {}}
                        >
                          {unit}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}

            <Text style={styles.label}>Images</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              {images.map((img, i) => (
                <View key={i} style={{ position: "relative", marginRight: 8 }}>
                  <Image source={img} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeImageBtn}
                    onPress={() => removeImage(i)}
                  >
                    <Ionicons name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity onPress={pickImage} style={styles.addBtn}>
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#E5E7EB" }]}
              onPress={onClose}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: PRIMARY_GOLD }]}
              onPress={handleSave}
            >
              <Text style={{ color: "#fff" }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  container: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "90%",
  },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    justifyContent: "center",
  },
  label: { fontWeight: "700", marginBottom: 6 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 8,
  },
  chipActive: { backgroundColor: PRIMARY_GOLD, borderColor: PRIMARY_GOLD },
  image: { width: 120, height: 80, borderRadius: 8 },
  removeImageBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#DC2626",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: PRIMARY_GOLD,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 12,
  },
  button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
});
