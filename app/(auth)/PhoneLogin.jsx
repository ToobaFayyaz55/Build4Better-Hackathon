import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PhoneLogin() {
  const router = useRouter();
  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const otpInputs = useRef([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validatePhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/\s/g, "");
    return cleanPhone.startsWith("+92") && cleanPhone.length === 13;
  };

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (!text.startsWith("+92")) {
      return "+92";
    }
    if (cleaned.length <= 2) return "+92";
    if (cleaned.length <= 5) return `+92 ${cleaned.slice(2)}`;
    if (cleaned.length <= 8)
      return `+92 ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
    return `+92 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 12)}`;
  };

  const handlePhoneChange = (text) => {
    if (!text.startsWith("+92")) {
      setPhoneNumber("+92");
      return;
    }
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setErrorMessage("Please enter a valid Pakistani phone number");
      setShowErrorModal(true);
      return;
    }

    // ACTUAL SUPABASE IMPLEMENTATION (commented out):
    /*
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber.replace(/\s/g, ''),
      });

      if (error) throw error;

      setStep('otp');
      setResendTimer(60);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to send OTP');
      setShowErrorModal(true);
    }
    */

    // HARDCODED FOR PREVIEW:
    console.log("Sending OTP to:", phoneNumber);
    animateTransition(() => {
      setStep("otp");
      setResendTimer(60);
    });
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    // ACTUAL SUPABASE IMPLEMENTATION (commented out):
    /*
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber.replace(/\s/g, ''),
      });

      if (error) throw error;

      setResendTimer(60);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to resend OTP');
      setShowErrorModal(true);
    }
    */

    // HARDCODED FOR PREVIEW:
    console.log("Resending OTP to:", phoneNumber);
    setResendTimer(60);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit code");
      setShowErrorModal(true);
      return;
    }

    // ACTUAL SUPABASE IMPLEMENTATION (commented out):
    /*
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber.replace(/\s/g, ''),
        token: otpCode,
        type: 'sms',
      });

      if (error) throw error;

      router.replace('/(tabs)');
    } catch (error) {
      setErrorMessage('Invalid or expired code. Please try again.');
      setShowErrorModal(true);
    }
    */

    // HARDCODED FOR PREVIEW:
    if (otpCode === "123456") {
      console.log("OTP Verified Successfully");
      router.replace("/Layout");
    } else {
      setErrorMessage("Invalid verification code. Please try again.");
      setShowErrorModal(true);
    }
  };

  const animateTransition = (callback) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(callback, 200);
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
    if (step === "otp" && errorMessage.includes("Invalid")) {
      animateTransition(() => {
        setOtp(["", "", "", "", "", ""]);
        setStep("phone");
        setResendTimer(0);
      });
    }
  };

  const handleBack = () => {
    if (step === "otp") {
      animateTransition(() => {
        setStep("phone");
        setOtp(["", "", "", "", "", ""]);
        setResendTimer(0);
      });
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      backgroundColor={"white"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        backgroundColor="white"
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons
            name="chevron-back"
            color="#bd9e4b"
            size={28}
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={["#bd9e4b", "#d4b560"]}
              style={styles.iconCircle}
            >
              {step === "phone" ? (
                <Feather name="phone" color="#fff" size={40} strokeWidth={2} />
              ) : (
                <Feather name="lock" color="#fff" size={40} strokeWidth={2} />
              )}
            </LinearGradient>
          </View>

          <Text style={styles.title}>
            {step === "phone" ? "Enter Your Phone" : "Verify Your Code"}
          </Text>
          <Text style={styles.subtitle}>
            {step === "phone"
              ? "We will send you a verification code"
              : `Code sent to ${phoneNumber}`}
          </Text>

          {step === "phone" ? (
            <View style={styles.inputContainer}>
              <View style={styles.phoneInputWrapper}>
                <Feather
                  name="phone"
                  color="#bd9e4b"
                  size={20}
                  strokeWidth={2}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.phoneInput}
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  placeholder="+92 3XX XXX XXXX"
                  placeholderTextColor="#999"
                  maxLength={17}
                />
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSendOTP}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#bd9e4b", "#d4b560"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.primaryButtonText}>Send Code</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (otpInputs.current[index] = ref)}
                    style={[styles.otpInput, digit && styles.otpInputFilled]}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleOtpKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleVerifyOTP}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#bd9e4b", "#d4b560"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.primaryButtonText}>Verify Code</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResendOTP}
                disabled={resendTimer > 0}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.resendButtonText,
                    resendTimer > 0 && styles.resendButtonTextDisabled,
                  ]}
                >
                  {resendTimer > 0
                    ? `Resend code in ${resendTimer}s`
                    : "Resend Code"}
                </Text>
              </TouchableOpacity>

              <Text style={styles.hintText}>
                Hint for preview: Use code 123456
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      <Modal
        visible={showErrorModal}
        transparent
        animationType="fade"
        onRequestClose={handleErrorClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.errorIconContainer}>
              <Text style={styles.errorIcon}>✕</Text>
            </View>
            <Text style={styles.modalTitle}>Oops!</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleErrorClose}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#bd9e4b", "#d4b560"]}
                style={styles.modalButtonGradient}
              >
                <Text style={styles.modalButtonText}>Try Again</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#bd9e4b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#bd9e4b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2c2c2c",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 22,
  },
  inputContainer: {
    width: "100%",
  },
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  inputIcon: {
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 17,
    color: "#2c2c2c",
    paddingVertical: 18,
    fontWeight: "600",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#2c2c2c",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  otpInputFilled: {
    borderColor: "#bd9e4b",
    backgroundColor: "#fffbf5",
  },
  primaryButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#bd9e4b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  resendButton: {
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  resendButtonText: {
    color: "#bd9e4b",
    fontSize: 15,
    fontWeight: "600",
  },
  resendButtonTextDisabled: {
    color: "#999",
  },
  hintText: {
    textAlign: "center",
    color: "#999",
    fontSize: 13,
    marginTop: 20,
    fontStyle: "italic",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  errorIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffe5e5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  errorIcon: {
    fontSize: 36,
    color: "#ff4444",
    fontWeight: "700",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c2c2c",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  modalButton: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },
  modalButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
