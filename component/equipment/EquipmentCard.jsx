import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PRIMARY_GOLD = "#bd9e4b";

export default function EquipmentCard({
  equipment,
  activeTab,
  onPress,
  onEdit,
  onDelete,
  statusColors,
}) {
  const isMyEquipment = activeTab === "my";

  const handleContact = () => {
    if (!equipment.owner_contact) {
      Alert.alert("No contact available");
      return;
    }
    const phoneNumber = equipment.owner_contact
      .toString()
      .replace(/[^0-9+]/g, "");
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const imagesToShow = equipment.image_url
    ? [{ uri: equipment.image_url }]
    : [require("../../assets/placeholder.jpeg")];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Top Section */}
      <View style={styles.header}>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.title}>{equipment.name}</Text>
          <Text style={styles.category}>{equipment.category}</Text>
        </View>
        <View
          style={[
            styles.statusPill,
            { backgroundColor: statusColors[equipment.status] || "grey" },
          ]}
        >
          <Text style={styles.statusText}>{equipment.status}</Text>
        </View>
      </View>

      {/* Image Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imagesToShow.map((img, i) => (
          <Image key={i} source={img} style={styles.image} />
        ))}
      </ScrollView>

      {/* Specs / Condition */}
      <Text style={styles.condition}>
        {equipment.specs || "No details available"}
      </Text>

      {/* Footer Section */}
      <View style={styles.footer}>
        {isMyEquipment ? (
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit}>
              <Ionicons name="pencil" size={20} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Ionicons name="trash-outline" size={20} color="#DC2626" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.othersFooter}>
            <TouchableOpacity onPress={handleContact} style={styles.contactBtn}>
              <Text style={styles.contactText}>Contact</Text>
              <Ionicons
                name="call-outline"
                size={14}
                color="#fff"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffdf5", // unified soft off-white
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#1F2937" },
  category: { fontSize: 12, color: "#6B7280" },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: "center",
  },
  statusText: { color: "#fff", fontWeight: "600", fontSize: 11 },
  image: {
    width: 220,
    height: 130,
    borderRadius: 10,
    marginRight: 6,
  },
  condition: {
    paddingVertical: 8,
    fontSize: 13,
    color: "#4B5563",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  footer: { paddingTop: 10 },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 14 },
  othersFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY_GOLD,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  contactText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
