import { SubTitle } from "@/components/SubTitle";
import { primary } from "@/utils/colors";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";

interface USwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  text?: string;
}

export default function USwitch({ value, onValueChange, text }: USwitchProps) {
  return (
    <View style={styles.container}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#ccc", true: `${primary}50` }}
        thumbColor={value ? `${primary}80` : "#f4f3f4"}
      />
      <SubTitle style={{ opacity: 0.5 }}>{text}</SubTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
