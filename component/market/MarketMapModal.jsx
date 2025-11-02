import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MarketMapModal = ({ visible, onRequestClose, onLocationSelect }) => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return; // Don't fetch location if modal isn't visible

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        setLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setMarker({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    })();
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Select Market Location</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#bd9e4b" style={styles.loader} />
        ) : region ? (
          <MapView
            style={styles.map}
            region={region}
            onPress={(e) => setMarker(e.nativeEvent.coordinate)}
            showsUserLocation
          >
            {marker && <Marker coordinate={marker} pinColor="#bd9e4b" />}
          </MapView>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Could not load location</Text>
          </View>
        )}

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onRequestClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={() => {
              if (marker) {
                onLocationSelect(marker);
              } else {
                alert("Please select a location on the map");
              }
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    color: "#333",
  },
  map: { 
    flex: 1 
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#999",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: { 
    backgroundColor: "#999" 
  },
  confirmButton: { 
    backgroundColor: "#bd9e4b" 
  },
  buttonText: { 
    color: "white", 
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default MarketMapModal;
