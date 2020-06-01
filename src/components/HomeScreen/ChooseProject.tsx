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
import { db } from "../../constans/Config";
import Layout from "../../constans/Layout";
import TaskScreen from "../../components/InGreenScreen/InGreenList";

const wW = Layout.window.width;
const hW = Layout.window.height;

const buttonHeight = 0.15 * hW;
const buttonWidth = 0.3 * wW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonListContainer: {
    flexDirection: "row",
    height: 0.15 * wW,
  },
  buttonList: {
    width: buttonWidth,
    height: buttonHeight,
    marginLeft: 0.03 * wW,
    borderRadius: wW / 50,
    marginTop: 0.04 * wW,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
    width: buttonWidth,
    height: buttonHeight,
    marginLeft: 0.03 * wW,
    borderRadius: wW / 50,
    marginTop: 0.04 * wW,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  imgBtn: {
    width: "100%",
    height: "100%",
  },
  Title: {
    color: "white",
    textAlign: "center",
    marginTop: "20%",
    position: "absolute",
    width: "80%",
    left: "10%",
  },
});

type FilterTaskLevel = ReturnType<typeof filterTaskLevel>;

const ChooseProject: FC<{ switchView(formView: boolean) }> = (props) => {
  const dispatch = useDispatch();

  const goToForm = () => {
    props.switchView(true);
  };

  const todoListState = useSelector<IState, ITodoListReducer>(
    (state) => state.todoList
  );

  const filterList = (index: number) => {
    updateList();
    dispatch<FilterTaskLevel>(filterTaskLevel(index));
  };

  const updateList = () => {
    db.ref("tasks").once("value", (snapshot) => {
      let data = snapshot.val() || {};
      let datanum = snapshot.numChildren();
      let keys = Object.keys(data);

      keys.forEach((key) => {
        if (todoListState.singleUserList.length === datanum) {
          console.log("to samo");
        } else {
          todoListState.singleUserList.push(data[key]);
        }
      });
    });
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
            <Image
              style={styles.imgBtn}
              source={require("../../assets/folder.png")}
            ></Image>
            <Text style={styles.Title}>{elem.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addListBtn} onPress={goToForm}>
          <Image
            style={styles.imgBtn}
            source={require("../../assets/addList.png")}
          ></Image>
        </TouchableOpacity>
      </ScrollView>
      <TaskScreen />
    </View>
  );
};

export default ChooseProject;
