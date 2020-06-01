import React, { FC, useState } from "react";
import { Button, View, ScrollView, ImageBackground } from "react-native";
import Start from "../../components/Start/OnStart";
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
