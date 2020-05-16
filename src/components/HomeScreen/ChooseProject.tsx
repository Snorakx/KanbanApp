import React, { FC, useState } from "react";
import {
  Text,
  Button,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ColorPropType,
  Image,
  TextInput,
} from "react-native";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { ISingleUserList } from "../../entities/todoSingleEl";
import { useNavigation, useRoute } from "@react-navigation/native";
import { filterTaskLevel } from "../../actions/todoList/todoListActions";

import Layout from "../../constans/Layout";
import TaskScreen from "../../components/InGreenScreen/InGreenList";

const wW = Layout.window.width;
const hW = Layout.window.height;

// type SetNewElemChooseProject = ReturnType<typeof setNewElemChooseProject>;

const buttonHeight = 0.15 * hW;
const buttonWidth = 0.3 * wW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonListContainer: {
    flexDirection: "row",
    height: 0.1 * wW,
  },
  buttonList: {
    backgroundColor: "#ffffff65",
    width: buttonWidth,
    height: buttonHeight,
    marginLeft: 0.03 * wW,
    borderRadius: 0.01 * wW,
    marginTop: 0.02 * wW,
  },
  buttonName: {
    textAlign: "center",
    fontSize: 0.07 * wW,
  },
  touchableButtonList: {
    width: buttonWidth,
    height: buttonHeight / 1.5,
    backgroundColor: "white",
  },
  addListBtn: {
    backgroundColor: "green",
    width: buttonWidth,
    height: buttonHeight,
    marginLeft: 0.03 * wW,
    borderRadius: 0.01 * wW,
    marginTop: 0.02 * wW,
  },
});

type FilterTaskLevel = ReturnType<typeof filterTaskLevel>;

interface IChooseProjectProps {}

const ChooseProject: FC<{ switchView(formView: boolean) }> = (props) => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();

  const goToForm = () => {
    props.switchView(true);
  };

  const openList = (id) => {
    nav.navigate("InGreenListScreen");
  };

  const todoListState = useSelector<IState, ITodoListReducer>(
    (state) => state.todoList
  );

  const filterList = (index: number) => {
    dispatch<FilterTaskLevel>(filterTaskLevel(index));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttonListContainer} horizontal={true}>
        {todoListState.userList.map((elem: ISingleUserList, index: number) => (
          <TouchableOpacity
            style={styles.buttonList}
            onPress={() => {
              filterList(index);
            }}
            key={index}
          >
            <Text>{elem.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addListBtn} onPress={goToForm}>
          <Text>+</Text>
        </TouchableOpacity>
      </ScrollView>
      <TaskScreen />
    </View>
  );
};

export default ChooseProject;
