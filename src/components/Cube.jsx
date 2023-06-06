import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Cube = ({ cube, duplicate, x, y, selected, positions, setSelected }) => {
  const isRed = duplicate.some((dupl) => x === dupl.row && y === dupl.col);
  const isSelected = selected[0] === x && selected[1] === y;
  const isFixed = positions.has(`${x},${y}`);

  const handleNumberChange = () => {
    setSelected(x, y);
  };

  return (
    <TouchableOpacity
      style={[
        styles.cube,
        {
          backgroundColor: isFixed
            ? "rgba(255, 98, 0, 0.2)"
            : isSelected
            ? "rgba(0, 0, 0, 0.2)"
            : "transparent",
        },
      ]}
      onPress={handleNumberChange}>
      <Text style={[styles.text, { color: isRed ? "red" : "black" }]}>
        {cube || ""}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cube: {
    flex: 1,
    alignItems: "center",
    width: 40,
    height: 45,
    borderWidth: 1,
    borderColor: "#000",
  },
  text: {
    fontSize: 30,
  },
});

export default Cube;
