import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";

interface ColumnProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function Column({ children, style, ...rest }: ColumnProps) {
  return (
    <View style={[styles.column, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
