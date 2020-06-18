import React, { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { IState } from "../../reducers";
import { ITodoListReducer } from "../../reducers/todoListReducer";
import { db } from "../../constans/Config";
import Login from "../Start/Login";
import Layout from "../../constans/Layout";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";

const wW = Layout.window.width;
const hW = Layout.window.height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6e6ff",
  },
  SignWithGoogleIcon: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  SignWithGoogle: {
    width: 0.6 * wW,
    marginLeft: wW / 2 - (0.6 * wW) / 2,
    marginTop: 0.6 * hW,
    height: 0.1 * hW,
  },
  loginText: {
    textAlign: "center",
    marginTop: 0.02 * wW,
  },
});

const OnStartScreen: FC<{ switchView(formView: boolean) }> = (props) => {
  const nav = useNavigation();

  const todoListState = useSelector<IState, ITodoListReducer>(
    (state) => state.todoList
  );

  const googleLogIn = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        db.ref("users/" + user.uid + "/lists")
          .once("value", (snapshot) => {
            let data = snapshot.val() || [];
            let keys = Object.keys(data);

            keys.forEach((key) => {
              if (todoListState.userList.length !== snapshot.numChildren()) {
                todoListState.userList.push(data[key]);
              }
            });
          })
          .then(() => nav.navigate("Home"));
      } else {
        try {
          const result = await Google.logInAsync({
            androidClientId:
              "385375136747-pltajseufe4ge8oe2ang4e84spii5qo3.apps.googleusercontent.com",
            iosClientId:
              "385375136747-d8f4deafs2jk8m9hp09chht1b1m6275p.apps.googleusercontent.com",
            scopes: ["profile", "email"],
          });
          if (result.type === "success") {
            console.log(
              "Logged in!",
              `Hi ${result.user.name}! \n  ${JSON.stringify(result.user)}`
            );
            const credential = firebase.auth.GoogleAuthProvider.credential(
              result.idToken,
              result.accessToken
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then((result) => {
                if (result.additionalUserInfo.isNewUser) {
                  db.ref("users/" + result.user.uid).push({
                    name: result.user.displayName,
                    email: result.user.email,
                  });
                } else {
                  console.log("on swój");
                }
              });

            return result.accessToken;
          } else {
            console.log("Cancelled!", "Login was cancelled!");
            return { cancelled: true };
          }
        } catch (e) {
          console.log("Oops!", "Login failed!", e);
          return { error: true };
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.SignWithGoogle} onPress={googleLogIn}>
        <Image
          source={require("../../assets/GoogleSignInIcon.png")}
          style={styles.SignWithGoogleIcon}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default OnStartScreen;
