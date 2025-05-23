import { Column } from "@/components/Column";
import { Row } from "@/components/Row";
import { SubTitle } from "@/components/SubTitle";
import { primary } from "@/utils/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { SmallText } from "./SmallText";

interface ScoreEntry {
  player: string;
  score: number;
}

interface ScoreTableProps {
  scores?: ScoreEntry[];
}

export function ScoreTable({ scores }: ScoreTableProps) {
  return (
    <Row style={{ gap: 32 }}>
      <Column style={styles.column}>
        <SubTitle style={styles.header}>Jugador</SubTitle>
        <SmallText>Juan</SmallText>
        <SmallText>Maria</SmallText>
        <SmallText>Pedro</SmallText>
        <SmallText>Lucas</SmallText>
        <SmallText>Ana</SmallText>
      </Column>
      <Column style={styles.column}>
        <SubTitle style={styles.header}>Puntos</SubTitle>
        <SmallText>1000</SmallText>
        <SmallText>900</SmallText>
        <SmallText>800</SmallText>
        <SmallText>982</SmallText>
        <SmallText>123</SmallText>
      </Column>
    </Row>
  );
}

const styles = StyleSheet.create({
  column: {
    gap: 8,
    alignItems: "flex-start",
  },
  header: {
    fontSize: 20,
    opacity: 0.8,
    color: primary,
  },
});
