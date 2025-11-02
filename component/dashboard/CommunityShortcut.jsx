import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

const CommunityShortcut = ({ onPress, onViewAll }) => {
  const posts = [
    {
      id: 1,
      title: "Quality organic vegetables available",
      author: "Rajesh Kumar",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Looking for wheat buyers this season",
      author: "Priya Singh",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Pesticide disposal tips & tricks",
      author: "Farmer Community",
      timestamp: "1 day ago",
    },
  ];

  return (
    <View className="px-4 space-y-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Feather name="message-circle" size={20} color="#bd9e4b" />
          <Text className="text-lg font-semibold text-gray-900">Kisaan Post</Text>
        </View>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-sm text-blue-600 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-2">
        {posts.slice(0, 2).map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={onPress}
            className="bg-white rounded-lg p-3 border border-gray-200 flex-row items-start justify-between"
          >
            <View className="flex-1 pr-2">
              <Text className="text-sm font-semibold text-gray-900 mb-1">
                {post.title}
              </Text>
              <Text className="text-xs text-gray-600">
                by {post.author} • {post.timestamp}
              </Text>
            </View>
            <Feather name="chevron-right" size={16} color="#bd9e4b" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={onViewAll}
        className="bg-blue-50 rounded-lg p-3 border border-blue-200"
      >
        <Text className="text-center text-sm font-medium text-blue-700">
          View Community Board →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommunityShortcut;
