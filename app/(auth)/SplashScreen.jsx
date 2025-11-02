import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const [showPanel, setShowPanel] = useState(false);

  const panelTranslateY = useRef(new Animated.Value(height)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPanel(true);

      Animated.timing(panelTranslateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        Animated.sequence([
          Animated.spring(logoScale, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    router.push("/Layout");
  };

  return (
    <View style={styles.container}>
      {/* Full-screen image */}
      <Image
        source={require("../../assets/ghibli.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      {/* Sliding panel */}
      {showPanel && (
        <Animated.View
          style={[
            styles.panelContainer,
            { transform: [{ translateY: panelTranslateY }] },
          ]}
        >
          <LinearGradient colors={["#ffffff", "#faf8f3"]} style={styles.panel}>
            {/* Logo at top center */}
            <Animated.View
              style={[
                styles.logoContainer,
                { transform: [{ scale: logoScale }] },
              ]}
            >
              <View style={styles.logoCircle}>
                <Image
                  source={require("../../assets/logo.jpeg")}
                  style={styles.logo}
                  resizeMode="cover"
                />
              </View>
            </Animated.View>

            {/* Panel content */}
            <Animated.View
              style={[styles.content, { opacity: contentOpacity }]}
            >
              <Text style={styles.appName}>Sabz Umeed</Text>
              <Text style={styles.tagline}>Welcome to your journey</Text>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#bd9e4b", "#d4b560"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.loginButtonText}>Get Started</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  panelContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4 + 20,
  },
  panel: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 80,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },
  logoContainer: {
    position: "absolute",
    top: -50,
    left: width / 2 - 50,
    width: 100,
    height: 100,
    zIndex: 10,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "#bd9e4b",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  logo: { width: "100%", height: "100%" },
  content: { alignItems: "center", marginTop: 5 },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2c2c2c",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  tagline: { fontSize: 16, color: "#666", marginBottom: 40, fontWeight: "400" },
  loginButton: {
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#bd9e4b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
