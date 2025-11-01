import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EquipmentCard from "../../component/equipment/EquipmentCard";
import { supabase } from "../../lib/supabase";
import styles from "../../Styles/equipment/EquipmentHubStyles";

export default function EquipmentHub() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("others");

  useEffect(() => {
    fetchOthersEquipment();
  }, []);

  const fetchMyEquipment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .eq("owner_id", "YOUR_USER_ID"); // replace with auth user id
      if (error) throw error;
      setEquipmentList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOthersEquipment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .neq("status", "Hidden");
      if (error) throw error;
      setEquipmentList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === "mine") fetchMyEquipment();
    else fetchOthersEquipment();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Equipment Hub</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "mine" && styles.activeTab]}
          onPress={() => handleTabPress("mine")}
        >
          <Text
            style={[styles.tabText, activeTab === "mine" && styles.activeTabText]}
          >
            My Equipment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "others" && styles.activeTab]}
          onPress={() => handleTabPress("others")}
        >
          <Text
            style={[styles.tabText, activeTab === "others" && styles.activeTabText]}
          >
            Other's Equipment
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#bd9e4b"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={equipmentList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <EquipmentCard equipment={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

       {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/equipment/AddEditScreen")}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
