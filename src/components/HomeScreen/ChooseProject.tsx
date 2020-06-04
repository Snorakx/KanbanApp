import React, { FC, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { ISingleUserList } from "../../entities/todoSingleEl";
import {
  filterTaskLevel,
  deleteList,
} from "../../actions/todoList/todoListActions";
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
type DeleteList = ReturnType<typeof deleteList>;

const ChooseProject: FC<{ switchView(formView: boolean) }> = (props) => {
  const dispatch = useDispatch();
  const todoListState = useSelector<IState, ITodoListReducer>(
    (state) => state.todoList
  );

  const goToForm = () => {
    props.switchView(true);
  };

  const filterList = (index: number) => {
    dispatch<FilterTaskLevel>(filterTaskLevel(index));
    db.ref("tasks").on("value", (snapshot) => {
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

  const deleteThisList = (id: number) => {
    dispatch<DeleteList>(deleteList(id));

    db.ref("lists").once("value", (snapshot) => {
      let data = snapshot.val() || {};
      let keys = Object.keys(data);

      keys.forEach((key) => {
        if (data[key].id === id) {
          db.ref("lists").child(key).remove();
        } else {
          console.log("nie tu");
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.buttonListContainer}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        {todoListState.userList.map((elem: ISingleUserList, index: number) => (
          <TouchableHighlight
            style={styles.buttonList}
            onPress={() => {
              filterList(index);
            }}
            onLongPress={() => {
              deleteThisList(elem.id);
            }}
            key={index}
          >
            <View>
              <Image
                style={styles.imgBtn}
                source={require("../../assets/folder.png")}
              ></Image>
              <Text style={styles.Title}>{elem.name}</Text>
            </View>
          </TouchableHighlight>
        ))}
        <TouchableHighlight style={styles.addListBtn} onPress={goToForm}>
          <Image
            style={styles.imgBtn}
            source={require("../../assets/addList.png")}
          ></Image>
        </TouchableHighlight>
      </ScrollView>
      <TaskScreen />
    </View>
  );
};

export default ChooseProject;
