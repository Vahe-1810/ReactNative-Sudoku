import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { BUTTONS, EXAMPLES, MATRIX } from "./src/constants/common";
import Row from "./src/components/Row";
import { checkDuplicates } from "./src/logic/checkDupls";
import { positionsMap } from "./src/logic/disabledPositions";
import { checkWin } from "./src/logic/checkWin";
import { forceWin } from "./src/logic/forceWin";
import { generateRandomBoard } from "./src/logic/randomSudokuBoard";
import { TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { random } from "./src/utils/randomNum";

const SudokuMain = ({ back }) => {
  const [history, setHistory] = useState([EXAMPLES[random(EXAMPLES.length)]]);
  const [future, setFuture] = useState([]);
  const [matrix, setMatrix] = useState(history.at(-1));
  const [newGame, setNewGame] = useState(false);
  const [duplicate, setDuplicate] = useState([]);
  const [selected, setSelected] = useState([]);
  const [difficult, setDifficult] = useState(20);
  const memoizeMatrix = useMemo(() => matrix, [newGame]);
  const positions = useMemo(() => positionsMap(matrix), [memoizeMatrix]);

  useEffect(() => {
    setDuplicate(checkDuplicates(matrix));
    if (checkWin(matrix, duplicate)) Alert.alert("Game result", "You Win!");
  }, [matrix]);

  useEffect(() => {
    setMatrix(history.at(-1));
  }, [history]);

  const changing = (x, y, newNum) => {
    const newMatrix = JSON.parse(JSON.stringify(matrix));
    newMatrix[x][y] = newNum;
    if (future.length) setFuture([]);
    setHistory([...history, newMatrix]);
  };

  const changeSelected = (x, y) => {
    if (positions.has(`${x},${y}`)) return;
    setSelected([x, y]);
  };

  const undoClick = () => {
    const newHistory = JSON.parse(JSON.stringify(history));
    const newFuture = JSON.parse(JSON.stringify(future));

    const last = newHistory.pop();
    newFuture.unshift(last);

    setHistory(newHistory);
    setFuture(newFuture);
  };
  const rendoClick = () => {
    const newHistory = JSON.parse(JSON.stringify(history));
    const newFuture = JSON.parse(JSON.stringify(future));

    const first = newFuture.shift();
    newHistory.push(first);

    setHistory(newHistory);
    setFuture(newFuture);
  };

  const addNumClick = (actn) => {
    const [x, y] = selected;
    if (selected.length) {
      let writeOrDelet = actn === "X" ? 0 : actn;
      changing(x, y, writeOrDelet);
    }
  };

  const resetClick = () => {
    setHistory([memoizeMatrix]);
    setFuture([]);
    setMatrix(memoizeMatrix);
  };

  const winClick = useCallback(() => {
    const newMatrix = JSON.parse(JSON.stringify(memoizeMatrix));
    setMatrix(forceWin(newMatrix));
    setFuture([]);
    setHistory([newMatrix]);
  }, [memoizeMatrix]);

  const newGameClick = () => {
    setNewGame(!newGame);
    generateRandomBoard(setMatrix, difficult);
  };

  return (
    <View style={styles.app}>
      <Text>SUDOKU</Text>
      <View style={styles.topActs}>
        <TouchableOpacity
          onPress={() => back(false)}
          style={{ marginRight: 15 }}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={history.length < 2}
          style={[
            styles.np,
            { backgroundColor: history.length < 2 ? "lightgrey" : "#607080" },
          ]}
          onPress={undoClick}>
          <Text style={styles.npText}>{"<--"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!future.length}
          style={[
            styles.np,
            { backgroundColor: !future.length ? "lightgrey" : "#607080" },
          ]}
          onPress={rendoClick}>
          <Text style={styles.npText}>{"-->"}</Text>
        </TouchableOpacity>
        <Picker
          style={styles.picker}
          selectedValue={difficult}
          onValueChange={(diff) => setDifficult(diff)}>
          <Picker.Item label="Easy" value={20} />
          <Picker.Item label="Medium" value={50} />
          <Picker.Item label="Hard" value={70} />
        </Picker>
      </View>
      <View style={styles.board}>
        {matrix.map((row, x) => (
          <Row
            key={Math.random()}
            row={row}
            x={x}
            duplicate={duplicate}
            selected={selected}
            setSelected={changeSelected}
            positions={positions}
          />
        ))}
      </View>
      <View style={styles.numbersDiv}>
        {BUTTONS.map((actn) => (
          <TouchableOpacity
            style={styles.num}
            key={actn}
            onPress={() => addNumClick(actn)}>
            <Text style={styles.numText}> {actn.toString()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.num} onPress={winClick}>
          <Text style={styles.numText}>Win</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.num} onPress={resetClick}>
          <Text style={styles.numText}>R</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.num} onPress={newGameClick}>
          <Text style={styles.numText}>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  app: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  board: {
    width: 400,
    height: 450,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  numbersDiv: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 450,
    gap: 10,
  },
  num: {
    width: 90,
    height: 50,
    backgroundColor: "#607080",
  },
  numText: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    right: 3,
  },
  picker: {
    width: 150,
    height: 50,
    backgroundColor: "#607080",
    margin: 10,
  },
  topActs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  np: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 55,
    borderRadius: 10,
  },
  npText: {
    fontSize: 24,
  },
};

export default SudokuMain;
