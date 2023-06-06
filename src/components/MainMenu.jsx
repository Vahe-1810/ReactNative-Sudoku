import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

const MainMenu = ({ start }) => {
  const handleStartClick = () => {
    start(true);
  };
  return (
    <View style={styles.main}>
      <Text style={[styles.buttonText, styles.header]}>ՍՈՒԴՈԿՈՒ</Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStartClick}>
        <Text style={styles.buttonText}>ՍԿՍԵԼ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  main: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    height: 500,
  },
  header: {
    position: "absolute",
    top: 0,
  },
  startButton: {
    backgroundColor: "#588a06",
    width: 200,
    height: 50,
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 40,
    textAlign: "center",
    color: "#9cc4b3",
  },
};

export default MainMenu;
