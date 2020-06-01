import React, { FC, useState, createRef } from "react";
import {
  Text,
  Button,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ColorPropType,
} from "react-native";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { InGreenElement } from "../../entities/todoSingleEl";
import { db } from "../../constans/Config";
import {
  taskLevelUp,
  deleteElemTodoList,
} from "../../actions/todoList/todoListActions";
import {
  Feather,
  FontAwesome5,
  Entypo,
  MaterialIcons,
  AntDesign,
} from "react-native-vector-icons";
import Layout from "../../constans/Layout";
import { useNavigation } from "@react-navigation/native";

const wW = Layout.window.width;
const hW = Layout.window.height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6e6ff",
  },
  login: {
    width: 0.8 * wW,
    backgroundColor: "#8fbcff75",
    height: 0.1 * wW,
    marginLeft: wW / 2 - (0.8 * wW) / 2,
    marginTop: 0.7 * hW,
    borderRadius: 0.03 * wW,
  },
  loginText: {
    textAlign: "center",
    marginTop: 0.02 * wW,
  },
});

interface IOnStartScreen {}
const OnStartScreen: FC<IOnStartScreen> = (props) => {
  const nav = useNavigation();

  const ref = db.ref("tasks");

  ref.on("value", (snapshot) => {
    let data = snapshot.val() || {};
  });

  const addTask = () => {
    nav.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.login} onPress={addTask}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnStartScreen;
