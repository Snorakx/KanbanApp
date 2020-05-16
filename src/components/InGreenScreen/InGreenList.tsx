import React, { FC, useState } from "react";
import {
  Text,
  Button,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ColorPropType,
} from "react-native";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { InGreenElement } from "../../entities/todoSingleEl";
import {
  taskLevelUp,
  deleteElemTodoList,
} from "../../actions/todoList/todoListActions";
import { AntDesign } from "react-native-vector-icons";
import Layout from "../../constans/Layout";
import { useNavigation } from "@react-navigation/native";

const wW = Layout.window.width;
const hW = Layout.window.height;

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: "gray",
  },
  taskBox: {
    height: 0.7 * hW,
    marginTop: 0.05 * hW,
    marginBottom: 0.05 * hW,
    width: 0.9 * wW,
    backgroundColor: "whitesmoke",
    marginLeft: wW / 2 - (0.9 * wW) / 2,
  },
  taskScroller: {
    marginTop: 0.05 * wW,
    marginBottom: 0.05 * wW,
  },
  task: {
    backgroundColor: "brown",
    width: 0.8 * wW,
    height: 0.1 * hW,
    marginBottom: 0.03 * hW,
    marginLeft: wW / 2 - (0.9 * wW) / 2,
  },
  addBtn: {
    position: "absolute",
    width: wW / 7,
    height: 0.15 * wW,
    bottom: 0.05 * hW,
    right: 0.08 * wW,
  },
  addBtnIcon: {
    color: "black",
    fontSize: wW / 7,
    textAlign: "center",
    marginTop: -0.01 * hW,
  },
});

type TaskLevelUp = ReturnType<typeof taskLevelUp>;
type DeleteElemTodoList = ReturnType<typeof deleteElemTodoList>;

interface ITaskScreen {}
const TaskScreen: FC<ITaskScreen> = (props) => {
  const dispatch = useDispatch();

  const todoListState = useSelector<IState, ITodoListReducer>(
    (state) => state.todoList
  );
  const nav = useNavigation();

  const levelUp = (elem, lvl, id) => {
    dispatch<TaskLevelUp>(taskLevelUp(elem, lvl, id));
  };

  const deleteMe = (id) => {
    dispatch<DeleteElemTodoList>(deleteElemTodoList(id));
  };

  const addTask = () => {
    nav.navigate("Form");
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskBox}>
        <ScrollView style={styles.taskScroller}>
          {todoListState.temp.map((elem: InGreenElement, index: number) => (
            <TouchableOpacity
              style={styles.task}
              key={index}
              onPress={() => {
                levelUp(elem, elem.taskLevel, elem.id);
              }}
            >
              <Text>
                {elem.name} naLevelu: {elem.taskLevel}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={addTask} style={styles.addBtn}>
        <AntDesign name="pluscircle" style={styles.addBtnIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskScreen;
