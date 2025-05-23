import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

interface SmallTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function SmallText({ children, style }: SmallTextProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Outfit_400Regular",
    color: "#000000",
    opacity: 0.8,
    textAlign: "center",
  },
});
