import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // <-- 1. Import Linking

// Define the primary color for consistency
const PRIMARY_GOLD = "#bd9e4b";

export default function EquipmentCard({ equipment, activeTab, onPress, onEdit, onDelete, statusColors }) {
    // Determine if the card belongs to the current user (owner_id === 1 is assumed from EquipmentHub)
    const isMyEquipment = activeTab === "my";

    // 2. New function to handle the phone call
    const handleContact = () => {
        // Remove non-numeric characters from the phone number for consistent linking
        const phoneNumber = equipment.owner.phone.replace(/[^0-9+]/g, '');
        const url = `tel:${phoneNumber}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    // Fallback for devices that don't support tel: scheme
                    Alert.alert('Error', `Phone dialing is not supported on this device for ${equipment.owner.phone}`);
                }
            })
            .catch((err) => console.error('An error occurred with Linking:', err));
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>

            {/* HEADER: Title, Category, and Status Pill (Moved to the top) */}
            <View style={styles.header}>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{equipment.name}</Text>
                    <Text style={styles.cardCategory}>{equipment.category}</Text>
                </View>
                
                {/* Status Pill */}
                <View style={[styles.statusPill, { backgroundColor: statusColors[equipment.status] || "grey" }]}>
                    <Text style={styles.statusText}>{equipment.status}</Text>
                </View>
            </View>

            {/* IMAGE SECTION */}
            <Image 
                source={{ uri: equipment.images[0] }} 
                style={styles.cardImage} 
                resizeMode="cover" 
            />
            
            {/* Condition/Specs */}
            <Text style={styles.cardSpecs} numberOfLines={2}>{equipment.condition}</Text>

            {/* FOOTER: Action Buttons */}
            <View style={styles.cardFooter}>
                {isMyEquipment ? (
                    // Owner's equipment shows Edit/Delete buttons
                    <View style={styles.myEquipmentButtons}>
                        <TouchableOpacity onPress={onEdit} style={styles.footerIcon}>
                            <Ionicons name="pencil-outline" size={22} color="#4B5563" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete} style={styles.footerIcon}>
                            <Ionicons name="trash-outline" size={22} color="#DC2626" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Others' equipment shows Owner Name and 'Contact' button
                    <View style={styles.othersEquipmentFooter}>
                        <Text style={styles.footerOwnerName}>
                            Owner: <Text style={{ fontWeight: '700' }}>{equipment.owner.name}</Text>
                        </Text>
                        
                        {/* 3. The 'Contact' Button now calls handleContact */}
                        <TouchableOpacity onPress={handleContact} style={styles.moreButton}> 
                            <Text style={styles.moreButtonText}>Contact</Text>
                            <Ionicons name="call-outline" size={16} color="#fff" style={{ marginLeft: 6 }} /> 
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: { 
        backgroundColor: "#fff", 
        marginBottom: 16, 
        borderRadius: 12, 
        overflow: "hidden", 
        // Added shadow for depth
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    
    // --- Header (Title/Category/Pill) ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14, 
        backgroundColor: "#F9FAFB", 
    },
    headerTextContainer: {
        flexShrink: 1, 
        paddingRight: 10,
    },
    cardTitle: { 
        color: "#1F2937", 
        fontWeight: "800", 
        fontSize: 18 
    },
    cardCategory: { 
        color: "#6B7280", 
        fontSize: 13 
    },
    
    // Status Pill styling
    statusPill: { 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        borderRadius: 16, 
        alignSelf: 'flex-start' ,
        minWidth: 90, 
        alignItems: 'center'
    },
    statusText: { 
        color: "#fff", 
        fontSize: 12, 
        fontWeight: "700" 
    },
    
    // --- Image ---
    cardImage: { 
        width: "100%", 
        height: 180,
        borderBottomWidth: 1, 
        borderBottomColor: '#E5E7EB',
    },
    
    // --- Specs/Condition ---
    cardSpecs: { 
        paddingHorizontal: 14, 
        paddingVertical: 12, 
        color: "#4B5563",
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6', 
    },
    
    // --- Footer ---
    cardFooter: { 
        paddingHorizontal: 14, 
        paddingVertical: 10,
    },
    
    // --- My Equipment Buttons (Edit/Delete) ---
    myEquipmentButtons: {
        flexDirection: "row", 
        justifyContent: "flex-end", 
        flex: 1,
    },
    footerIcon: { 
        marginLeft: 20, 
        padding: 4, 
    },

    // --- Others' Equipment Footer (Owner Name and Contact Button) ---
    othersEquipmentFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    footerOwnerName: {
        fontSize: 14,
        color: "#4B5563",
    },
    moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PRIMARY_GOLD,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    moreButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    }
});