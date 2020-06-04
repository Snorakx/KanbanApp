import React, { FC, useState } from "react";
import { View } from "react-native";
import ChooseProject from "../../components/HomeScreen/ChooseProject";
import ListForm from "../../components/HomeScreen/ListForm";
import Layout from "../../constans/Layout";

const HomeScreen = () => {
  const [formView, setFormView] = useState<boolean>(false);

  return (
    <View style={{ flex: 1, marginTop: Layout.statusBar }}>
      {formView ? (
        <ListForm switchView={setFormView} />
      ) : (
        <ChooseProject switchView={setFormView} />
      )}
    </View>
  );
};

export default HomeScreen;
