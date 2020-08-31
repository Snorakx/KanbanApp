import React, { useState } from "react";
import { View } from "react-native";
import Layout from "../../constans/Layout";
import OnStartScreen from "../../components/Start/OnStart";
import WelcomeScreen from "../../components/Start/Login";

const StartScreen = () => {
  const [formView, setFormView] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      {formView ? (
        <WelcomeScreen switchView={setFormView} />
      ) : (
        <OnStartScreen switchView={setFormView} />
      )}
    </View>
  );
};

export default StartScreen;
