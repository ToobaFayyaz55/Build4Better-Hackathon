import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Clipboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductCard({ brandData }) {
  const productsArray = Array.isArray(brandData.products)
    ? brandData.products
    : [];

  const [promoStates, setPromoStates] = useState(
    productsArray.map(() => false)
  );
  const [copyStates, setCopyStates] = useState(productsArray.map(() => false));

  const togglePromo = (index) => {
    const newStates = [...promoStates];
    newStates[index] = !newStates[index];
    setPromoStates(newStates);
  };

  const handleCopy = (index) => {
    Clipboard.setString(productsArray[index].promoCode);
    const newCopyStates = [...copyStates];
    newCopyStates[index] = true;
    setCopyStates(newCopyStates);

    setTimeout(() => {
      const resetCopyStates = [...copyStates];
      resetCopyStates[index] = false;
      setCopyStates(resetCopyStates);
    }, 1000);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.brand}>{brandData.brand}</Text>
      {productsArray.map((p, index) => (
        <View key={p.id} style={styles.product}>
          <View style={styles.topRow}>
            <Text style={styles.name}>{p.name}</Text>
            <TouchableOpacity onPress={() => handleCopy(index)}>
              {copyStates[index] ? (
                <MaterialIcons name="check" size={20} color="green" />
              ) : (
                <MaterialIcons name="content-copy" size={15} color="#888" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.discount}>{p.discount}</Text>

          <TouchableOpacity
            style={[styles.button, promoStates[index] && styles.buttonActive]}
            onPress={() => togglePromo(index)}
          >
            <Text
              style={[
                styles.buttonText,
                promoStates[index] && styles.buttonTextActive,
              ]}
            >
              {promoStates[index] ? p.promoCode : "Get Promo Code"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fffffa",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  brand: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#bd9e4b",
    marginBottom: 6,
  },
  product: {
    marginBottom: 10,
    backgroundColor: "#F9F9F9",
    padding: 8,
    borderRadius: 6,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 14, fontWeight: "600" },
  discount: {
    fontSize: 14,
    color: "#D84315",
    fontWeight: "bold",
    marginTop: 4,
  },
  button: {
    marginTop: 4,
    backgroundColor: "#bd9e4b",
    padding: 6,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  buttonActive: { backgroundColor: "#ccc" },
  buttonTextActive: { color: "#000" },
});
