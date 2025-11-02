import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    getSession();

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Send OTP to phone
  const signInWithPhone = async (phoneNumber,) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone : phoneNumber.replace(/\s/g, ''),
      });

      if (error) throw error;
      return data; // OTP sent
    } catch (err) {
      console.error("Error sending OTP:", err.message);
      throw err;
    }
  };

  // Verify OTP
  const verifyOtp = async (phone, otp) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: "sms",
      });
      if (error) throw error;
      setUser(data.user);
      return data.user;
    } catch (err) {
      console.error("OTP verification failed:", err.message);
      throw err;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithPhone,
        verifyOtp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access
export const useAuth = () => useContext(AuthContext);
