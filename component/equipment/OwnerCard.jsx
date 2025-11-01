import { Linking, Text, TouchableOpacity, View } from "react-native";

export default function OwnerCard({ owner }) {
  if (!owner) return null;

  return (
    <View className="mt-3 p-2 border-t border-gray-200 flex-row justify-between items-center">
      <Text className="text-gray-800 font-semibold">{owner.name}</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${owner.phone}`)}
        className="bg-[#bd9e4b] px-3 py-1 rounded-lg"
      >
        <Text className="text-white font-medium">Call</Text>
      </TouchableOpacity>
    </View>
  );
}
