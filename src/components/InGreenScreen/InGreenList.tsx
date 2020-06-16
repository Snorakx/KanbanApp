import React, { FC } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { InGreenElement } from "../../entities/todoSingleEl";
import { db } from "../../constans/Config";
import {
  taskLevelUp,
  deleteElemTodoList,
} from "../../actions/todoList/todoListActions";
import { Feather } from "react-native-vector-icons";
import Layout from "../../constans/Layout";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

const wW = Layout.window.width;
const hW = Layout.window.height;

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: "#f0f0f0",
  },
  taskBox: {
    height: 0.7 * hW,
    marginTop: 0.05 * hW,
    marginBottom: 0.05 * hW,
    width: 0.9 * wW,
    backgroundColor: "#d6e6ff",
    marginLeft: wW / 2 - (0.9 * wW) / 2,
    borderRadius: wW / 50,
    borderWidth: 0.004 * wW,
    borderColor: "#8fbcff",
    shadowColor: "#0155b7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  taskScroller: {
    marginTop: 0.05 * wW,
    marginBottom: 0.05 * wW,
    backgroundColor: "#8fbcff75",
    width: 0.8 * wW,
    marginLeft: wW / 2 - (0.9 * wW) / 2,
  },
  task: {
    backgroundColor: "#8fbcff",
    width: 0.8 * wW,
    height: 0.1 * hW,
    marginBottom: 0.03 * hW,
    shadowColor: "#0155b7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  taskName: {
    marginTop: 0.025 * wW,
    textAlign: "center",
    fontSize: 0.07 * wW,
  },

  addBtn: {
    position: "absolute",
    width: wW / 7,
    height: 0.15 * wW,
    bottom: 0.05 * hW,
    right: 0.08 * wW,
  },
  addBtnIcon: {
    color: "#0180ff",
    fontSize: wW / 6.75,
    textAlign: "center",
    marginTop: -0.01 * hW,
  },
  deleteTask: {
    backgroundColor: "#0180ff",
    flexDirection: "row",
    width: 0.3 * wW,
    height: 0.1 * hW,
    marginBottom: 0.03 * hW,
    shadowColor: "#0155b7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  doneTask: {
    backgroundColor: "#0180ff",
    flexDirection: "row",
    width: 0.3 * wW,
    height: 0.1 * hW,
    marginBottom: 0.03 * hW,
    shadowColor: "#0155b7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  inOptionsIcon: {
    fontSize: 0.08 * wW,
    position: "absolute",
    marginLeft: 0.03 * wW,
    color: "#00000075",
    marginTop: 0.02 * wW,
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
  let user = firebase.auth().currentUser.uid;

  let ref = db.ref("users/" + user + "/tasks");

  const levelUp = (elem, lvl: number, id: number) => {
    dispatch<TaskLevelUp>(taskLevelUp(elem, lvl, id));

    ref.once("value", (snapshot) => {
      let data = snapshot.val() || {};
      let keys = Object.keys(data);
      keys.forEach((key) => {
        if (data[key].id === id) {
          return db
            .ref("users/" + user + "/tasks/" + key)
            .child("taskLevel")
            .set(firebase.database.ServerValue.increment(1));
        }
      });
    });
  };

  const deleteMe = (id) => {
    dispatch<DeleteElemTodoList>(deleteElemTodoList(id));

    ref.once("value", (snapshot) => {
      let data = snapshot.val() || {};
      let keys = Object.keys(data);

      keys.forEach((key) => {
        if (data[key].id === id) {
          db.ref("users/" + user + "/tasks")
            .child(key)
            .remove();
        } else {
          console.log(data[key].id);
        }
      });
    });
  };

  const addTask = () => {
    nav.navigate("Form");
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskBox}>
        <ScrollView style={styles.taskScroller}>
          {todoListState.temp.map((elem: InGreenElement, index: number) => (
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              key={index}
            >
              <View style={styles.task} key={index}>
                <Text style={styles.taskName}>{elem.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  levelUp(elem, elem.taskLevel, elem.id);
                }}
                style={styles.doneTask}
              >
                <Text style={styles.inOptionsIcon}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  deleteMe(elem.id);
                }}
                style={styles.deleteTask}
              >
                <Text style={styles.inOptionsIcon}>Delete</Text>
              </TouchableOpacity>
            </ScrollView>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={addTask} style={styles.addBtn}>
        <Feather name="plus-circle" style={styles.addBtnIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskScreen;
