import React, { FC, useState } from "react";
import styled from "styled-components";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  setNewElemTodoList,
  addNewList,
} from "../../actions/todoList/todoListActions";
import { InGreenElement } from "../../entities/todoSingleEl";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { useNavigation, useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
  },
  btn: {
    marginTop: 16,
    borderColor: "#eaffd0",
    borderRadius: 6,
    backgroundColor: "#eaffd0",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
});

const CustomTextInputTitle = styled.TextInput`
  margin-top: 20%;
  padding: 10px;
  width: 100%;
  text-align: center;
  color: #eaffd0;
`;

type SetNewElemTodoList = ReturnType<typeof setNewElemTodoList>;

interface IFormTodo {}

const FormTodo = (props) => {
  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState<string>("");

  const todoListState = useSelector<IState, ITodoListReducer>(
    (state) => state.todoList
  );

  const nav = useNavigation();

  const nameValueChange = (txt) => {
    setNameInput(txt.nativeEvent.text);
  };

  const lvl = 0;

  const saveData = () => {
    dispatch<SetNewElemTodoList>(
      setNewElemTodoList({
        name: nameInput,
        id: Date.now(),
        taskLevel: lvl,
      } as InGreenElement)
    );
    nav.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <CustomTextInputTitle
        value={nameInput}
        onChange={nameValueChange}
        placeholder="Name"
        placeholderTextColor="#eaffd0"
      />

      <View style={styles.btn}>
        <Button title="save" onPress={saveData} />
      </View>
    </View>
  );
};

export default FormTodo;
