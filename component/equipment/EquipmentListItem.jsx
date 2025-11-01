import { Feather, FontAwesome5 } from "@expo/vector-icons"; // Icons
import { useNavigation } from "expo-router"; // For navigation or opening a modal
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";

// Helper to define Tailwind styles based on status
const getStatusStyles = (status) => {
  const tw = useTailwind();
  switch (status) {
    case "Available":
      return { container: tw("bg-green-600"), text: tw("text-white"), label: "🟢 Available / دستیاب" };
    case "Rented":
      return { container: tw("bg-red-600"), text: tw("text-white"), label: "🔴 Rented / کرایہ پر" };
    case "Maintenance":
      return { container: tw("bg-yellow-500"), text: tw("text-gray-800"), label: "🟡 Maintenance / دیکھ بھال میں" };
    default:
      return { container: tw("bg-gray-400"), text: tw("text-white"), label: "Grey (Unknown)" };
  }
};

const EquipmentListItem = ({ data, isMyEquipment = false }) => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const { container: statusBg, text: statusText, label: statusLabel } = getStatusStyles(data.status);

  // Function to open the Detail Modal
  const openDetailModal = () => {
    // In a real Expo Router app, this would likely open a screen in a modal group:
    // navigation.navigate('equipment-detail-modal', { equipmentId: data.id });
    console.log(`Opening detail for: ${data.name}`);
  };

  return (
    <TouchableOpacity
      style={tw("bg-white mb-4 rounded-xl shadow-lg overflow-hidden border border-gray-100")}
      onPress={openDetailModal}
      // Ensure large tappable area
      accessibilityLabel={`View details for ${data.name}`} 
    >
      {/* 1. Image Carousel (Placeholder) - 16:9 aspect ratio */}
      <View style={tw("w-full h-48 bg-gray-200")}>
        {/* Placeholder for Image/Carousel */}
        <Image 
          source={{ uri: data.imageUrl || 'https://via.placeholder.com/400x225/E5E7EB/4B5563?text=Equipment+Image' }}
          style={tw("w-full h-full")}
          resizeMode="cover"
        />
        
        {/* Overlays */}
        {/* Left Overlay: Name (bold) / Category */}
        <View style={tw("absolute bottom-0 left-0 p-3 bg-black bg-opacity-40 rounded-tr-xl")}>
          <Text style={tw("text-xl font-bold text-white")}>{data.name}</Text>
          <Text style={tw("text-sm text-gray-300")}>{data.category || 'Category'}</Text>
        </View>

        {/* Right-top Overlay: Status Tag (colored pill) */}
        <View 
          style={[
            tw("absolute top-3 right-3 px-3 py-1 rounded-full shadow-md"),
            statusBg
          ]}
        >
          {/* High contrast tag: Icon + Text for color-blind users */}
          <Text style={[tw("text-xs font-semibold"), statusText]}>
            {statusLabel}
          </Text>
        </View>
      </View>

      {/* 2. Body: Short Specs & Footer */}
      <View style={tw("p-3")}>
        {/* Body: Short Specs */}
        <Text style={tw("text-gray-600 mb-2")}>
          Engine: {data.engine} | Capacity: {data.capacity} | Condition: Good.
          <Text style={tw("text-blue-600 font-semibold")}> ...More / مزید</Text>
        </Text>

        {/* Footer: Owner info & Action Icons */}
        <View style={tw("flex-row justify-between items-center border-t border-gray-100 pt-2")}>
          <View style={tw("flex-row items-center")}>
            {/* Owner Initials + Contact Icon (for Others tab) */}
            <Text style={tw("text-sm font-semibold text-gray-700 mr-2")}>
              {data.ownerInitials}
            </Text>
            <FontAwesome5 name="phone-alt" size={14} color="#3B82F6" />
          </View>

          {/* Action Icons (for My Equipment tab) */}
          {isMyEquipment && (
            <View style={tw("flex-row")}>
              {/* Edit Icon */}
              <TouchableOpacity style={tw("p-2")} onPress={() => console.log('Edit')}>
                <Feather name="edit-2" size={20} color="#3B82F6" />
              </TouchableOpacity>
              {/* Delete Icon */}
              <TouchableOpacity style={tw("p-2 ml-3")} onPress={() => console.log('Delete')}>
                <Feather name="trash-2" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EquipmentListItem;