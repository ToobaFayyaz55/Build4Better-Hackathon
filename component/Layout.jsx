// component/Layout.jsx
import { useState } from "react";
import { View } from "react-native";
import KisaanPost from "../app/(bulletin)/KisaanPost";
import Dashboard from "../app/(dashboard)/Dashboard";
import Footer from "./Footer";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("home"); // default home

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard />;
      case "community":
        return <KisaanPost />;
      default:
        return <KisaanPost />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <Footer active={activeTab} onNavigate={setActiveTab} />
    </View>
  );
};

export default Layout;
