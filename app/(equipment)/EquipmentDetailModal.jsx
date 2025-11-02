import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Linking,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EquipmentDetailModal({ visible, equipment, onClose }) {
  if (!equipment) return null;

  const handleContact = () => {
    // Try to open phone dialer
    Linking.openURL(`tel:${equipment.owner.phone}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this equipment: ${equipment.name}\nContact: ${equipment.owner.phone}`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={28} color="#111" />
          </TouchableOpacity>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Image carousel */}
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
              {equipment.images.map((uri, idx) => (
                <Image key={idx} source={{ uri }} style={styles.image} resizeMode="cover" />
              ))}
            </ScrollView>

            {/* Equipment Info */}
            <Text style={styles.name}>{equipment.name}</Text>
            <Text style={styles.category}>{equipment.category}</Text>

            {/* Status */}
            <View style={[styles.statusPill, { backgroundColor: getStatusColor(equipment.status) }]}>
              <Text style={styles.statusText}>{equipment.status}</Text>
            </View>

            {/* Condition / Specs */}
            <Text style={styles.condition}>{equipment.condition}</Text>

            {/* Owner Card */}
            <View style={styles.ownerCard}>
              <Text style={styles.ownerName}>{equipment.owner.name}</Text>
              <Text style={styles.ownerPhone}>{equipment.owner.phone}</Text>
              {equipment.owner.verified && (
                <View style={styles.verified}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={handleContact}>
                <Text>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "#4B9CD3" }]} onPress={handleShare}>
                <Text style={{ color: "#fff" }}>Share</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Status color helper
const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "#16A34A";
    case "Rented":
      return "#DC2626";
    case "Under Maintenance":
      return "#F59E0B";
    default:
      return "#6B7280";
  }
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center" },
  container: { margin: 16, backgroundColor: "#fff", borderRadius: 12, padding: 16, height: "90%" },
  closeBtn: { position: "absolute", top: 12, right: 12, zIndex: 10 },
  image: { width: 300, height: 180, borderRadius: 12, marginRight: 12 },
  name: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  category: { fontSize: 16, color: "#6B7280", marginBottom: 8 },
  statusPill: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  statusText: { color: "#fff", fontWeight: "600" },
  condition: { marginBottom: 16 },
  ownerCard: { padding: 12, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, marginBottom: 16 },
  ownerName: { fontWeight: "700" },
  ownerPhone: { marginBottom: 4 },
  verified: { flexDirection: "row", alignItems: "center" },
  verifiedText: { marginLeft: 4, color: "#16A34A", fontWeight: "600" },
  buttons: { flexDirection: "row", justifyContent: "space-between" },
  button: { flex: 1, padding: 12, borderRadius: 8, alignItems: "center", backgroundColor: "#E5E7EB", marginHorizontal: 4 },
});
