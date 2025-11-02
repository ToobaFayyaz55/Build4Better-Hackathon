import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NotificationBell = ({ unreadCount, onPress }) => {
  const [showToast, setShowToast] = useState(false);

  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="relative p-2"
    >
      <Feather name="bell" size={24} color="#bd9e4b" />
      {unreadCount > 0 && (
        <View
          className="absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 items-center justify-center"
        >
          <Text className="text-white text-xs font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NotificationBell;
