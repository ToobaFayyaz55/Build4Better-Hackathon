import { Text, TouchableOpacity, View } from "react-native";
import ImageCarousel from "./ImageCarousel";
import OwnerCard from "./OwnerCard";
import StatusTag from "./StatusTag";

export default function EquipmentCard({ equipment, showOwner = true, onPress }) {
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden"
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Image Carousel */}
      {equipment.images && <ImageCarousel images={equipment.images} />}

      {/* Info Overlay */}
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="text-lg font-bold text-gray-800">{equipment.name}</Text>
            <Text className="text-gray-500">{equipment.category}</Text>
          </View>
          <StatusTag status={equipment.status} />
        </View>

        {/* Specs Preview */}
        {equipment.specs && (
          <Text className="text-gray-600 mt-2 line-clamp-2">{equipment.specs}</Text>
        )}

        {/* Owner Info */}
        {showOwner && equipment.owner && <OwnerCard owner={equipment.owner} />}
      </View>
    </TouchableOpacity>
  );
}
