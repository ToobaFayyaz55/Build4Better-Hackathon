import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const ProduceSummary = ({ onFilterPress }) => {
  const produce = [
    {
      id: "fresh",
      label: "Fresh",
      count: 12,
      color: "#22c55e",
      icon: "check-circle",
      description: "Good condition",
    },
    {
      id: "expiring",
      label: "Expiring Soon",
      count: 5,
      color: "#eab308",
      icon: "clock",
      description: "3-7 days left",
    },
    {
      id: "expired",
      label: "Expired",
      count: 2,
      color: "#ef4444",
      icon: "alert-circle",
      description: "Remove ASAP",
    },
  ];

  return (
    <View className="space-y-3 px-4">
      <Text className="text-lg font-semibold text-gray-900">Produce Summary</Text>
      <View className="flex-row justify-between gap-3">
        {produce.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onFilterPress(item.id)}
            className="flex-1 rounded-lg p-3 border-2"
            style={{
              borderColor: item.color,
              backgroundColor: `${item.color}20`,
            }}
          >
            <View className="items-center space-y-2">
              <Feather name={item.icon} size={24} color={item.color} />
              <View className="items-center">
                <Text className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.count}
                </Text>
                <Text className="text-xs text-gray-600 text-center">
                  {item.label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProduceSummary;
