import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import EquipmentCard from "../../component/equipment/EquipmentCard";

const sampleEquipment = [
  { id: 1, name: "John Deere 5055", category: "Tractor", status: "Available", owner: { name: "John", phone: "+92-3XX-XXXXXXX" } },
  { id: 2, name: "Plough 2023", category: "Plough", status: "Rented", owner: { name: "Ali", phone: "+92-3XX-XXXXXXX" } },
];

export default function EquipmentHub() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-[#bd9e4b]">
        <Text className="text-white text-xl font-bold">Equipment Hub / مشینیں</Text>
        <TouchableOpacity onPress={() => alert("Notifications")}>
          <Text className="text-white text-lg">🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around py-2 border-b border-gray-300">
        <TouchableOpacity onPress={() => router.push("/equipment/my")}>
          <Text className="text-[#bd9e4b] font-semibold">My Equipment / میری مشینیں</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-gray-600 font-semibold">Others’ Equipment / دیگر مشینیں</Text>
        </TouchableOpacity>
      </View>

      {/* Equipment List */}
      <FlatList
        data={sampleEquipment}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EquipmentCard equipment={item} />}
        contentContainerStyle={{ padding: 12 }}
      />

      {/* Add Equipment Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-[#bd9e4b] p-4 rounded-full shadow-lg"
        onPress={() => router.push("/equipment/add-edit")}
      >
        <Text className="text-white text-lg font-bold">＋</Text>
      </TouchableOpacity>
    </View>
  );
}
