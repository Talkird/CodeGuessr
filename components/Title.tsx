import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

interface TitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function Title({ children, style }: TitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "700",
    fontFamily: "Outfit_700Bold",
    color: "#000000",
    opacity: 0.8,
    textAlign: "center",
  },
});
