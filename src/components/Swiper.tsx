import React, { FC } from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";
import Layout from "../constans/Layout";

import Swiper from "react-native-swiper";

const wW = Layout.window.width;
const hW = Layout.window.height;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#2a2c3e",
  },
  slide1: {
    marginTop: 0.1 * hW,
    borderRadius: 20,
    textAlign: "center",
    padding: "5%",
    marginBottom: 0.05 * hW,
    marginLeft: -0.05 * wW,
    flex: 1,
    backgroundColor: "#2A2C3E",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
    textAlign: "center",
  },
  photo: {
    flex: 1,
    resizeMode: "contain",
    width: null,
    height: null,
  },
  photoDescription: {
    width: wW,
    color: "white",
    fontSize: 0.06 * wW,
    textAlign: "center",
  },
});

const SwiperComponent: FC = () => {
  return (
    <Swiper style={styles.wrapper}>
      <View style={styles.slide1}>
        <Image
          source={require("../assets/background.png")}
          style={styles.photo}
        ></Image>
        <Text style={styles.photoDescription}>
          Keep everything under control
        </Text>
      </View>
      <View style={styles.slide1}>
        <Image
          source={require("../assets/background_2.png")}
          style={styles.photo}
        ></Image>
        <Text style={styles.photoDescription}>Manage all processes</Text>
      </View>
      {/* <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View> */}
    </Swiper>
  );
};
export default SwiperComponent;
