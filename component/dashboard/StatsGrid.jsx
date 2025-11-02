import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const StatsGrid = ({ stats, onStatPress }) => {
  return (
    <View className="px-4 pt-4 pb-6">
      <View className="flex-row flex-wrap justify-between">
        {stats.map((stat) => (
          <TouchableOpacity
            key={stat.id}
            onPress={() => onStatPress(stat.id)}
            className="bg-white rounded-lg p-4 border border-gray-200 mb-4"
            style={{ width: "48%" }}
          >
            <View
              className="w-10 h-10 rounded-lg items-center justify-center mb-3"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <Feather name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </Text>
            <Text className="text-xs font-semibold text-gray-900 mb-1">
              {stat.title}
            </Text>
            <Text className="text-xs text-gray-600">{stat.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StatsGrid;
