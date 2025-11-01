import { Text, View } from "react-native";

export default function StatusTag({ status }) {
  let bgColor = "bg-gray-400";
  if (status === "Available") bgColor = "bg-green-500";
  if (status === "Rented") bgColor = "bg-red-500";
  if (status === "Maintenance") bgColor = "bg-yellow-400";

  return (
    <View className={`${bgColor} px-2 py-1 rounded-full`}>
      <Text className="text-white text-sm">{status}</Text>
    </View>
  );
}
