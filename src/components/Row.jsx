import { View, StyleSheet } from "react-native";
import React from "react";
import { KEYS } from "../constants/common";
import Cube from "./Cube";

const Row = (props) => {
  const { duplicate, selected, setSelected } = props;
  const { row, x, positions } = props;
  return (
    <View style={styles.row}>
      {row.map((cube, y) => (
        <Cube
          key={KEYS[x][y]}
          cube={cube}
          x={x}
          y={y}
          duplicate={duplicate}
          selected={selected}
          setSelected={setSelected}
          positions={positions}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

export default Row;
