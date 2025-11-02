import { Text, View } from "react-native";

const DashboardHeader = ({ unreadNotifications, onNotificationPress }) => {
  return (
    <View className="px-6 py-6 rounded-b-3xl flex-row items-center justify-between"
    style={{ backgroundColor: '#bd9e4b', paddingTop: 50 }}>
      <View>
        <Text className="text-3xl font-bold text-white mb-1">Sabz Souch</Text>
        <Text className="text-sm text-green-100">Your Smart Farming Companion</Text>
      </View>
    </View>
  );
};

export default DashboardHeader;
