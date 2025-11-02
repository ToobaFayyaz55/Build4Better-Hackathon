import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const ExpiringAlert = ({ onPress }) => {
  return (
    <View className="px-4 pb-6">
      <TouchableOpacity
        onPress={onPress}
        className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-300 flex-row items-start"
      >
        <View className="bg-yellow-200 rounded-lg p-2 mr-3">
          <Feather name="package" size={20} color="#f59e0b" />
        </View>
        <View className="flex-1">
          <Text className="font-semibold text-gray-900 mb-1">Expiring Soon</Text>
          <Text className="text-sm text-gray-700 mb-2">
            3 items need attention within the next 3 days
          </Text>
          <Text className="text-sm font-semibold text-yellow-600">View Details →</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ExpiringAlert;
