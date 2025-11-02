import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddEditEquipmentModal from "../../component/equipment/AddEditEquipmentModal";
import EquipmentCard from "../../component/equipment/EquipmentCard";
import TabBar from "../../component/TabBar";
import { supabase } from "../../lib/supabase";

const OWNER_ID = 1; // static for now (replace later with auth)

export default function EquipmentHub() {
  const [activeTab, setActiveTab] = useState("my");
  const [equipmentList, setEquipmentList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusColors = {
    Available: "#22C55E",
    Rented: "#F59E0B",
    "Under Maintenance": "#EF4444",
  };

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("equipment").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setEquipmentList(data || []);
    } catch (error) {
      console.log("Error fetching equipment:", error.message);
      Alert.alert("Error", "Failed to fetch equipment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const myEquipment = equipmentList.filter((eq) => eq.owner_id === OWNER_ID);
  const otherEquipment = equipmentList.filter((eq) => eq.owner_id !== OWNER_ID);

  const openAddModal = () => {
    setSelectedEquipment(null);
    setModalVisible(true);
  };
  const openEditModal = (eq) => {
    setSelectedEquipment(eq);
    setModalVisible(true);
  };

  const handleSave = async (newEq) => {
    try {
      let response;
      if (newEq.id) {
        response = await supabase
          .from("equipment")
          .update(newEq)
          .eq("id", newEq.id)
          .select("*");
      } else {
        response = await supabase
          .from("equipment")
          .insert([{ ...newEq, owner_id: OWNER_ID }])
          .select("*");
      }

      const { data, error } = response;
      if (error) throw error;

      if (newEq.id) {
        setEquipmentList((prev) =>
          prev.map((eq) => (eq.id === newEq.id ? data[0] : eq))
        );
      } else {
        setEquipmentList((prev) => [data[0], ...prev]);
      }

      setModalVisible(false);
    } catch (error) {
      console.log("Error saving equipment:", error.message);
      Alert.alert("Error", "Failed to save equipment");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("equipment").delete().eq("id", id);
      if (error) throw error;
      setEquipmentList((prev) => prev.filter((eq) => eq.id !== id));
    } catch (error) {
      console.log("Error deleting equipment:", error.message);
      Alert.alert("Error", "Failed to delete equipment");
    }
  };

  const equipmentTabs = [
    { key: "my", label: "My Equipment" },
    { key: "others", label: "Other Equipment" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Machine Markaz</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={30} color="#111827" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openAddModal}>
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

      {/* Tabs */}
      <TabBar
        selectedTab={activeTab}
        setSelectedTab={setActiveTab}
        tabs={equipmentTabs}
      />

      {/* List */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (activeTab === "my" ? myEquipment : otherEquipment).length === 0 ? (
          <Text>No equipment found.</Text>
        ) : (
          (activeTab === "my" ? myEquipment : otherEquipment).map((eq) => (
            <EquipmentCard
              key={eq.id}
              equipment={eq}
              activeTab={activeTab}
              onEdit={() => openEditModal(eq)}
              onDelete={() => handleDelete(eq.id)}
              statusColors={statusColors}
            />
          ))
        )}
      </ScrollView>

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
  },
  headerText: { fontSize: 22, fontWeight: "700" },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
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
