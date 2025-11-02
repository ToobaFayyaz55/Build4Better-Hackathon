import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const QuickActions = ({ onAddProducePress, onFindMarketsPress }) => {
  return (
    <View className="px-4 pb-6">
      <Text className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</Text>
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={onAddProducePress}
          className="flex-1 bg-white rounded-lg p-4 border border-gray-200 items-center py-6"
        >
          <Feather name="package" size={24} color="#22c55e" />
          <Text className="text-sm font-semibold text-gray-900 mt-2">Add Produce</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onFindMarketsPress}
          className="flex-1 bg-white rounded-lg p-4 border border-gray-200 items-center py-6"
        >
          <Feather name="trending-up" size={24} color="#3b82f6" />
          <Text className="text-sm font-semibold text-gray-900 mt-2">Find Markets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickActions;
