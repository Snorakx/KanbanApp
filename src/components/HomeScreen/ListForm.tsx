import React, { FC, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";

import { useDispatch } from "react-redux";
import { addNewList } from "../../actions/todoList/todoListActions";
import { ISingleUserList } from "../../entities/todoSingleEl";
import Layout from "../../constans/Layout";
import { db, user } from "../../constans/Config";
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
});

type AddNewList = ReturnType<typeof addNewList>;

const ListForm: FC<{ switchView(formView: boolean) }> = (props) => {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState<string>("");

  const nameValueChange = (txt) => {
    setNameInput(txt.nativeEvent.text);
  };
  let user = firebase.auth().currentUser.uid;
  let date = Date.now();

  const addToDb = () => {
    db.ref("users/" + user + "/lists").push({
      name: nameInput,
      id: date,
    });
  };

  const saveData = () => {
    dispatch<AddNewList>(
      addNewList({
        elem: [],
        name: nameInput,
        id: date,
      } as ISingleUserList)
    );
    addToDb();
    props.switchView(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.labelForInput}>Name</Text>
        <TextInput
          style={styles.txtInput}
          value={nameInput}
          onChange={nameValueChange}
        ></TextInput>
        <TouchableOpacity style={styles.btn} onPress={saveData}>
          <Text style={styles.textBtn}>Add new level</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListForm;
