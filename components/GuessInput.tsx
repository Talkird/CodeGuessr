import React, { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { Row } from "./ui/Row";

export default function GuessInput() {
  const [guess, setGuess] = useState(["", "", "", ""]);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.slice(-1); // Only keep one character
    const newGuess = [...guess];
    newGuess[index] = digit;
    setGuess(newGuess);

    // Focus next input
    if (digit && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && guess[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const newGuess = [...guess];
        newGuess[index - 1] = "";
        setGuess(newGuess);
      }
    }
  };

  return (
    <Row style={{ gap: 5 }}>
      {guess.map((value, index) => (
        <View key={index} style={styles.input}>
          <TextInput
            ref={(ref) => {
              inputsRef.current[index] = ref;
            }}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            style={styles.text}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            returnKeyType="next"
          />
        </View>
      ))}
    </Row>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 50,
    borderColor: "#808080",
    borderRadius: 12,
    borderWidth: 1,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Outfit_500Medium",
    color: "#808080",
  },
});
