import { Linking, Text, TouchableOpacity, View } from "react-native";

export default function OwnerCard({ owner }) {
  if (!owner) return null;

  return (
    <View className="mt-2 p-2 border-t border-gray-200">
      <Text className="font-semibold">{owner.name}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${owner.phone}`)}>
        <Text className="text-blue-600">{owner.phone}</Text>
      </TouchableOpacity>
    </View>
  );
}
