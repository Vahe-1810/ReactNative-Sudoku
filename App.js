import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SudokuMain from "./SudokuMain";
import MainMenu from "./src/components/MainMenu";
import { useState } from "react";

export default function App() {
  const [startGame, setStartGame] = useState(false);
  return (
    <View style={styles.container}>
      {startGame ? (
        <SudokuMain back={setStartGame} />
      ) : (
        <MainMenu start={setStartGame} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(115, 105, 6)",
    alignItems: "center",
    justifyContent: "center",
  },
});
