import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const EquipmentShortcut = ({ onAddPress, onViewAllPress }) => {
  const equipment = [
    {
      id: 1,
      name: "Diesel Pump",
      status: "Available",
      statusColor: "#22c55e",
    },
    {
      id: 2,
      name: "Thresher Machine",
      status: "In Use",
      statusColor: "#f59e0b",
    },
  ];

  return (
    <View className="space-y-3 px-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Feather name="tool" size={20} color="#bd9e4b" />
          <Text className="text-lg font-semibold text-gray-900">Equipment</Text>
        </View>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text className="text-sm text-blue-600 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
        {equipment.map((item) => (
          <View
            key={item.id}
            className="bg-white rounded-lg p-3 border border-gray-200"
            style={{ minWidth: 180 }}
          >
            <Text className="text-sm font-semibold text-gray-900 mb-1">
              {item.name}
            </Text>
            <View
              className="inline-flex items-center rounded-full px-2 py-1"
              style={{ backgroundColor: `${item.statusColor}20` }}
            >
              <View
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: item.statusColor }}
              />
              <Text className="text-xs text-gray-700">{item.status}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          onPress={onAddPress}
          className="rounded-lg p-3 border-2 border-dashed items-center justify-center"
          style={{ minWidth: 180, borderColor: "#bd9e4b" }}
        >
          <Feather name="plus" size={28} color="#bd9e4b" />
          <Text className="text-xs text-gray-700 mt-1 font-medium">Add Equipment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EquipmentShortcut;
