import { Text, TouchableOpacity, View } from "react-native";
import OwnerCard from "./OwnerCard";
import StatusTag from "./StatusTag";

export default function EquipmentCard({ equipment, showOwner = true }) {
  return (
    <TouchableOpacity className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="text-lg font-bold">{equipment.name}</Text>
          <Text className="text-gray-500">{equipment.category}</Text>
        </View>
        <StatusTag status={equipment.status} />
      </View>

      {showOwner && <OwnerCard owner={equipment.owner} />}
    </TouchableOpacity>
  );
}
