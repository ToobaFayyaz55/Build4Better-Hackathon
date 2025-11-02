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
const PRIMARY_GOLD = "#bd9e4b";

export default function AddEditEquipmentModal({
  visible,
  equipment,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [specs, setSpecs] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [ownerContact, setOwnerContact] = useState("");
  const [rentedTill, setRentedTill] = useState("");

  useEffect(() => {
    if (equipment) {
      setCategory(equipment.category || CATEGORIES[0]);
      setSpecs(equipment.specs || "");
      setImages(equipment.image_url ? [{ uri: equipment.image_url }] : []);
      setStatus(equipment.status || STATUS_OPTIONS[0]);
      setOwnerContact(equipment.owner_contact?.toString() || "");
      setRentedTill(equipment.rent_end || "");
    } else {
      setCategory(CATEGORIES[0]);
      setSpecs("");
      setImages([]);
      setStatus(STATUS_OPTIONS[0]);
      setOwnerContact("");
      setRentedTill("");
    }
  }, [equipment]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
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
    if (!name.trim()) return Alert.alert("Name required");
    if (images.length === 0) return Alert.alert("At least one image required");

    onSave({
      ...equipment,
      name,
      category,
      specs,
      status,
      image_url: images[0]?.uri || null,
      owner_contact: ownerContact ? parseInt(ownerContact) : null,
      rent_end: status === "Rented" ? rentedTill : null,
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
              placeholder="Name"
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
                  <Text style={category === cat ? { color: "#fff" } : {}}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TextInput
              placeholder="Specs"
              value={specs}
              onChangeText={setSpecs}
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
            <TextInput
              placeholder="Owner Contact"
              value={ownerContact}
              onChangeText={setOwnerContact}
              style={styles.input}
              keyboardType="numeric"
            />

            {status === "Rented" && (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Rented Till</Text>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/YY"
                  value={rentedTill}
                  onChangeText={setRentedTill}
                  keyboardType="default"
                />
              </View>
            )}

            <Text style={styles.label}>Images</Text>
            {images[0] ? (
              <View style={{ position: "relative", marginRight: 8 }}>
                <Image source={images[0]} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeImageBtn}
                  onPress={() => setImages([])}
                >
                  <Ionicons name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={pickImage} style={styles.addBtn}>
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
            )}
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
  },
  label: { fontWeight: "700", marginBottom: 6 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginRight: 8,
    marginBottom: 12,
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
