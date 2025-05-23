import React from "react";
import { StyleSheet, TextInput } from "react-native";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function NumberInput({
  placeholder,
  value,
  onChangeText,
}: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#808080"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType="number-pad"
      maxLength={4}
      returnKeyType="done"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: "#808080",
    backgroundColor: "#fff",
    color: "#808080",
    fontSize: 16,
    borderRadius: 12,
    fontFamily: "Outfit_500Medium",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
