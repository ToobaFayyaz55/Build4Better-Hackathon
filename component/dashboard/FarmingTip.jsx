import { Text, View } from "react-native";

const FarmingTip = () => {
  return (
    <View className="px-4 pb-6">
      <View className="bg-green-50 rounded-lg p-4 border border-green-200">
        <Text className="text-base font-semibold text-gray-900 mb-2">
          💡 Farming Tip
        </Text>
        <Text className="text-sm text-gray-700 leading-5">
          Store tomatoes at room temperature to maintain their flavor and texture. 
          Refrigeration can make them mealy.
        </Text>
      </View>
    </View>
  );
};

export default FarmingTip;
