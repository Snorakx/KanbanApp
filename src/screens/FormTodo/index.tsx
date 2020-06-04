import React, { FC, useState } from "react";
import { TextInput, View, StyleSheet, Button, Image } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setNewElemTodoList } from "../../actions/todoList/todoListActions";
import { InGreenElement } from "../../entities/todoSingleEl";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../constans/Layout";
import { db } from "../../constans/Config";

const wW = Layout.window.width;
const hW = Layout.window.height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  txtInput: {
    backgroundColor: "#daded5",
    position: "absolute",
    top: 0.44 * hW,
    marginLeft: 0.15 * wW,
    borderRadius: wW / 50,
    width: 0.7 * wW,
    height: 0.14 * hW,
    textAlign: "center",
    color: "#4789a5",
    fontSize: wW / 17,
  },
  btn: {
    position: "absolute",
    marginTop: 0.02 * hW,
    borderRadius: wW / 50,
    backgroundColor: "#4789a5",
    textAlign: "center",
    fontSize: wW / 17,
    fontWeight: "bold",
    marginLeft: 0.15 * wW,
    width: 0.7 * wW,
    height: 0.06 * hW,
    top: 0.62 * hW,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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

  const [nameInput, setNameInput] = useState<string>("");

  const nav = useNavigation();

  const nameValueChange = (txt) => {
    setNameInput(txt.nativeEvent.text);
  };

  const lvl = 0;
  let data = Date.now();

  const ref = db.ref("tasks");

  const addToDb = () => {
    ref.push({
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
      <Image
        style={styles.img}
        source={require("../../assets/notee.png")}
      ></Image>
      <TextInput
        style={styles.txtInput}
        value={nameInput}
        onChange={nameValueChange}
        placeholder="Task"
        placeholderTextColor="#4789a5"
      />
      <View style={styles.btn}>
        <Button title="Create" onPress={saveData} color="gray" />
      </View>
    </View>
  );
};

export default FormTodo;
