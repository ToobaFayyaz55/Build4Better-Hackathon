import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define the colors for consistent theming
const PRIMARY_GOLD = "#bd9e4b";
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function EquipmentDetailModal({ visible, equipment, onClose }) {
  if (!equipment) return null;

  const handleContact = () => {
    // Remove non-numeric characters for clean dialing
    const phoneNumber = equipment.owner.phone.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this equipment: ${equipment.name}\nCategory: ${equipment.category}\nContact: ${equipment.owner.phone}`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close button - Positioned absolutely inside the container */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close-circle" size={32} color="#4B5563" />
          </TouchableOpacity>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
            
            {/* Image carousel */}
            <ScrollView 
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false} 
              style={styles.imageScrollContainer}
              // Set the content width to match screen for correct paging behavior
              contentContainerStyle={{ width: SCREEN_WIDTH * equipment.images.length }}
            >
              {equipment.images.map((uri, idx) => (
                <Image 
                  key={idx} 
                  source={{ uri }} 
                  style={styles.image} 
                  resizeMode="cover" 
                />
              ))}
            </ScrollView>

            <View style={styles.infoSection}>
                {/* Name and Category */}
                <Text style={styles.name}>{equipment.name}</Text>
                <Text style={styles.category}>{equipment.category}</Text>

                {/* Status */}
                <View style={[styles.statusPill, { backgroundColor: getStatusColor(equipment.status) }]}>
                    <Text style={styles.statusText}>{equipment.status}</Text>
                </View>
                
                {/* Condition / Specs */}
                <Text style={styles.conditionLabel}>Description / Specs</Text>
                <Text style={styles.condition}>{equipment.condition}</Text>
            </View>


            {/* Owner Card */}
            <View style={styles.ownerCard}>
                <View style={styles.ownerHeader}>
                    <Text style={styles.ownerTitle}>Owner Information</Text>
                    {equipment.owner.verified && (
                        <View style={styles.verified}>
                            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                    )}
                </View>
                <View style={styles.ownerDetails}>
                    <Text style={styles.ownerName}>{equipment.owner.name}</Text>
                    <Text style={styles.ownerPhone}>{equipment.owner.phone}</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttons}>
              <TouchableOpacity style={[styles.button, styles.contactButton]} onPress={handleContact}>
                <Ionicons name="call-outline" size={20} color={PRIMARY_GOLD} />
                <Text style={styles.buttonText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleShare}>
                <Ionicons name="share-social-outline" size={20} color="#fff" />
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Status color helper - Remains unchanged
const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "#16A34A";
    case "Rented":
      return "#DC2626";
    case "Under Maintenance":
      return "#F59E0B";
    default:
      return "#6B7280";
  }
};

const styles = StyleSheet.create({
  // -------------------------------------------------------------------
  // 1. Modal Container Styles (Themed)
  // -------------------------------------------------------------------
  overlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.6)", 
    justifyContent: "center",
    alignItems: "center",
  },
  container: { 
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#fff", 
    borderRadius: 16, 
    padding: 20, 
    // Elevated shadow for a premium look
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  closeBtn: { 
    position: "absolute", 
    top: 12, 
    right: 12, 
    zIndex: 10,
    padding: 4, // Added padding for easier touch
    backgroundColor: 'white',
    borderRadius: 50,
  },

  // -------------------------------------------------------------------
  // 2. Image and Basic Info Styles
  // -------------------------------------------------------------------
  imageScrollContainer: {
    marginHorizontal: -20, // Negative margin to fill the container width
    marginBottom: 20,
    height: 220,
  },
  // Image style must use SCREEN_WIDTH for paging to work correctly
  image: { 
    width: SCREEN_WIDTH - 40, // Container width (90% of screen) minus padding (20*2)
    height: 220,
  },
  infoSection: {
    paddingHorizontal: 5,
  },
  name: { 
    fontSize: 26, 
    fontWeight: "800", 
    color: "#1F2937",
    marginBottom: 2,
  },
  category: { 
    fontSize: 16, 
    color: "#6B7280", 
    marginBottom: 10,
    fontWeight: '500',
  },
  statusPill: { 
    alignSelf: "flex-start", 
    paddingHorizontal: 12, 
    paddingVertical: 5, 
    borderRadius: 16, 
    marginBottom: 16,
  },
  statusText: { 
    color: "#fff", 
    fontWeight: "700",
    fontSize: 13,
  },
  conditionLabel: {
      fontSize: 14,
      fontWeight: '700',
      color: '#4B5563',
      marginBottom: 4,
  },
  condition: { 
    fontSize: 15,
    color: "#374151",
    marginBottom: 20 
  },

  // -------------------------------------------------------------------
  // 3. Owner Card Styles
  // -------------------------------------------------------------------
  ownerCard: { 
    padding: 16, 
    borderWidth: 1, 
    borderColor: "#E5E7EB", 
    borderRadius: 12, 
    marginBottom: 24, 
    backgroundColor: '#F9FAFB',
  },
  ownerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  ownerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  ownerDetails: {
      paddingTop: 4,
  },
  ownerName: { 
    fontWeight: "700",
    fontSize: 18,
    color: '#1F2937',
  },
  ownerPhone: { 
    marginBottom: 4,
    color: '#4B5563',
  },
  verified: { 
    flexDirection: "row", 
    alignItems: "center",
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: { 
    marginLeft: 4, 
    color: "#065F46", 
    fontWeight: "600",
    fontSize: 12,
  },

  // -------------------------------------------------------------------
  // 4. Action Buttons Styles (Themed)
  // -------------------------------------------------------------------
  buttons: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  button: { 
    flex: 1, 
    flexDirection: 'row',
    justifyContent: "center", 
    alignItems: "center", 
    paddingVertical: 14, // Taller buttons
    borderRadius: 10, 
    marginHorizontal: 4,
    gap: 8, // Space between icon and text
  },
  // Contact Button (Secondary Action - Gold Border)
  contactButton: { 
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: PRIMARY_GOLD,
  },
  buttonText: { 
    color: PRIMARY_GOLD, 
    fontWeight: "700",
    fontSize: 16,
  },
  // Share Button (Primary Action - Solid Gold)
  shareButton: { 
    backgroundColor: PRIMARY_GOLD,
  }, 
  shareButtonText: { 
    color: "#fff", 
    fontWeight: "700",
    fontSize: 16,
  },
});