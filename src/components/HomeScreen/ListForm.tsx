import React, { FC, useState } from "react";
import { TextInput, View, StyleSheet, Button, Image } from "react-native";

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
    backgroundColor: "white",
  },
  btn: {
    marginTop: 0.02 * hW,
    borderColor: "#eaffd0",
    borderRadius: wW / 50,
    backgroundColor: "#ff4f5a",
    textAlign: "center",
    fontSize: wW / 17,
    fontWeight: "bold",
    marginLeft: 0.1 * wW,
    width: 0.67 * wW,
    height: 0.06 * hW,
    top: 0.4 * hW,
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
  imgGirl: {
    resizeMode: "cover",
    position: "absolute",
    width: 0.55 * wW,
    height: 0.4 * hW,
    marginLeft: 0.05 * wW,
    top: 0.01 * hW,
    zIndex: 1,
  },
  txtInput: {
    borderColor: "#ff4f5a",
    borderWidth: 1,
    position: "absolute",
    top: 0.2 * hW,
    marginLeft: 0.1 * wW,
    borderRadius: wW / 50,
    width: 0.67 * wW,
    height: 0.14 * hW,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#fafafa",
    borderColor: "black",
    borderWidth: 0.5,
    width: "85%",
    height: "57.5%",
    top: "23.5%",
    left: "13%",
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
      <Image
        source={require("../../assets/cards.png")}
        style={styles.img}
      ></Image>
      <Image
        source={require("../../assets/girl.png")}
        style={styles.imgGirl}
      ></Image>
      <View style={styles.form}>
        <TextInput
          style={styles.txtInput}
          value={nameInput}
          onChange={nameValueChange}
          placeholder="ListName"
          placeholderTextColor="#ff4f5a"
        ></TextInput>
        <View style={styles.btn}>
          <Button title="Create" onPress={saveData} color="gray" />
        </View>
      </View>
    </View>
  );
};

export default ListForm;
