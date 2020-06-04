import React from "react";
import { View } from "react-native";
import Layout from "../../constans/Layout";
import OnStartScreen from "../../components/Start/OnStart";

const StartScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: Layout.statusBar }}>
      <OnStartScreen />
    </View>
  );
};

export default StartScreen;
