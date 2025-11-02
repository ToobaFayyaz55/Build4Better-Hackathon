import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddEditEquipmentModal from "../../component/equipment/AddEditEquipmentModal";
import EquipmentCard from "../../component/equipment/EquipmentCard";
import TabBar from "../../component/TabBar"; // make sure path is correct
import { mockEquipment } from "../../constants/equipment";

export default function EquipmentHub() {
  const [activeTab, setActiveTab] = useState("my");
  const [equipmentList, setEquipmentList] = useState(mockEquipment);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const statusColors = {
    Available: "#22C55E",
    Rented: "#F59E0B",
    "Under Maintenance": "#EF4444",
  };

  const myEquipment = equipmentList.filter((eq) => eq.owner_id === 1);
  const otherEquipment = equipmentList.filter((eq) => eq.owner_id !== 1);

  const openAddModal = () => {
    setSelectedEquipment(null);
    setModalVisible(true);
  };
  const openEditModal = (eq) => {
    setSelectedEquipment(eq);
    setModalVisible(true);
  };

  const handleSave = (newEq) => {
    if (newEq.id) {
      setEquipmentList((prev) =>
        prev.map((eq) => (eq.id === newEq.id ? newEq : eq))
      );
    } else {
      setEquipmentList((prev) => [
        ...prev,
        { ...newEq, id: Date.now(), owner_id: 1 },
      ]);
    }
    setModalVisible(false);
  };

  const handleDelete = (id) =>
    setEquipmentList((prev) => prev.filter((eq) => eq.id !== id));

  const equipmentTabs = [
    { key: "my", label: "My Equipment" },
    { key: "others", label: "Other Equipment" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Equipment Hub</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={30} color="#111827" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ borderRadius: 12 }} onPress={openAddModal}>
            <LinearGradient
              colors={["#bd9e4b", "#fde68a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.addBtnGradient}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Animated Tabs */}
      <TabBar
        selectedTab={activeTab}
        setSelectedTab={setActiveTab}
        tabs={equipmentTabs}
      />

      {/* Equipment List */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {(activeTab === "my" ? myEquipment : otherEquipment).map((eq) => (
          <EquipmentCard
            key={eq.id}
            equipment={eq}
            activeTab={activeTab}
            onPress={() => {}}
            onEdit={() => openEditModal(eq)}
            onDelete={() => handleDelete(eq.id)}
            statusColors={statusColors}
          />
        ))}
      </ScrollView>

      {/* Add/Edit Modal */}
      <AddEditEquipmentModal
        visible={modalVisible}
        equipment={selectedEquipment}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  headerText: { fontSize: 22, fontWeight: "700", color: "#111827" },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: { position: "relative" },
  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#bd9e4b",
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  badgeText: { color: "#fff", fontSize: 10 },
  addBtnGradient: {
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
