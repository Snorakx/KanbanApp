import React, { FC, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setNewElemTodoList } from "../../actions/todoList/todoListActions";
import { InGreenElement } from "../../entities/todoSingleEl";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../constans/Layout";
import { db } from "../../constans/Config";
import firebase from "firebase";

const wW = Layout.window.width;
const hW = Layout.window.height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1F2B",
  },
  btn: {
    borderRadius: 0.04 * wW,
    backgroundColor: "#FF4D00",
    fontSize: wW / 17,
    fontWeight: "bold",
    marginLeft: 0.1 * wW,
    width: 0.8 * wW,
    height: 0.07 * hW,
    top: 0.25 * hW,
  },
  textBtn: {
    color: "white",
    fontSize: 0.06 * wW,
    textAlign: "center",
    marginTop: 0.02 * wW,
  },
  labelForInput: {
    color: "white",
    fontSize: 0.08 * wW,
    marginLeft: 0.1 * wW,
    top: 0.06 * hW,
  },
  txtInput: {
    backgroundColor: "#FFFFFF50",
    position: "absolute",
    top: 0.15 * hW,
    marginLeft: 0.1 * wW,
    borderRadius: 0.05 * wW,
    width: 0.8 * wW,
    height: 0.08 * hW,
    textAlign: "center",
    color: "white",
    fontSize: 0.05 * wW,
  },
  form: {
    backgroundColor: "#2A2C3E",
    width: wW,
    height: 0.5 * hW,
    top: 0.25 * hW,
  },
  img: {
    resizeMode: "cover",
    position: "absolute",
    width: 1 * wW,
    height: 0.85 * hW,
  },
});

type SetNewElemTodoList = ReturnType<typeof setNewElemTodoList>;

const FormTodo = (props) => {
  const dispatch = useDispatch();

  let user = firebase.auth().currentUser.uid;

  const [nameInput, setNameInput] = useState<string>("");

  const nav = useNavigation();

  const nameValueChange = (txt) => {
    setNameInput(txt.nativeEvent.text);
  };

  const lvl = 0;
  let data = Date.now();

  const addToDb = () => {
    db.ref("users/" + user + "/tasks").push({
      name: nameInput,
      id: data,
      taskLevel: lvl,
    });
  };

  const saveData = () => {
    dispatch<SetNewElemTodoList>(
      setNewElemTodoList({
        name: nameInput,
        id: data,
        taskLevel: lvl,
      } as InGreenElement)
    );
    addToDb();
    nav.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.labelForInput}>Name</Text>
        <TextInput
          style={styles.txtInput}
          value={nameInput}
          onChange={nameValueChange}
        />
        <TouchableOpacity style={styles.btn} onPress={saveData}>
          <Text style={styles.textBtn}>Add new task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormTodo;
