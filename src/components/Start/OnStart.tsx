import React, { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { db } from "../../constans/Config";

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

  const todoListState = useSelector<IState, ITodoListReducer>(
    (state) => state.todoList
  );

  const addTask = () => {
    db.ref("lists")
      .once("value", (snapshot) => {
        let data = snapshot.val() || [];
        let keys = Object.keys(data);

        keys.forEach((key) => {
          if (todoListState.userList.length !== snapshot.numChildren()) {
            todoListState.userList.push(data[key]);
          }
        });
      })
      .then(() => nav.navigate("Home"));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.login} onPress={addTask}>
        <Text style={styles.loginText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnStartScreen;
