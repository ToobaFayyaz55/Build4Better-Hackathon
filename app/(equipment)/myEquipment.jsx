import { FlatList, Text, View } from "react-native";
import EquipmentCard from "../../component/equipment/EquipmentCard";

const myEquipment = [
  {
    id: 1,
    name: "My Tractor 123",
    category: "Tractor",
    status: "Available",
  },
];

export default function MyEquipment() {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-[#bd9e4b] font-bold text-xl p-4">My Equipment / میری مشینیں</Text>
      <FlatList
        data={myEquipment}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EquipmentCard equipment={item} showOwner={false} />}
        contentContainerStyle={{ padding: 12 }}
      />
    </View>
  );
}
