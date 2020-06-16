import React, { FC } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { db } from "../../constans/Config";

import Layout from "../../constans/Layout";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

const wW = Layout.window.width;
const hW = Layout.window.height;

const styles = StyleSheet.create({});

interface IOnStartScreen {}
const WelcomeScreen: FC<{ switchView(formView: boolean) }> = (props) => {
  const nav = useNavigation();

  let name = firebase.auth().currentUser.displayName;

  return (
    <View>
      <Text>Hi {name}!</Text>
      <TouchableOpacity>Go to your</TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
