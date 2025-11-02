import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MarketShortcut = ({ onPress }) => {
  return (
    <View className="px-4 space-y-3">
      <View className="flex-row items-center space-x-2">
        <Feather name="map-pin" size={20} color="#bd9e4b" />
        <Text className="text-lg font-semibold text-gray-900">Nearby Markets</Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        className="rounded-lg overflow-hidden bg-white border border-gray-200"
      >
        {/* Map Preview */}
        <View className="w-full h-40 bg-gray-200 items-center justify-center relative">
          <Image
            source={{
              uri: "https://via.placeholder.com/400x200?text=Map+Preview",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Overlay with info */}
          <View className="absolute inset-0 bg-black/20 items-center justify-center">
            <View className="bg-white rounded-full p-3">
              <Feather name="map-pin" size={24} color="#bd9e4b" />
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View className="p-4 space-y-2">
          <Text className="text-base font-semibold text-gray-900">
            3 Markets Found
          </Text>
          <Text className="text-sm text-gray-600">
            Within 10 km radius of your location
          </Text>
          <View className="bg-blue-50 px-3 py-2 rounded-lg mt-2">
            <Text className="text-sm font-medium text-blue-700">
              Tap to explore markets →
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MarketShortcut;
