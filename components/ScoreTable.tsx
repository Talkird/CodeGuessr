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
  const sortedScores = (scores || []).slice().sort((a, b) => b.score - a.score);

  return (
    <Row style={{ gap: 32 }}>
      <Column style={styles.column}>
        <SubTitle style={styles.header}>Jugador</SubTitle>
        {sortedScores.map((entry, idx) => (
          <SmallText key={entry.player + idx}>{entry.player}</SmallText>
        ))}
      </Column>
      <Column style={styles.column}>
        <SubTitle style={styles.header}>Puntos</SubTitle>
        {sortedScores.map((entry, idx) => (
          <SmallText key={entry.player + idx}>{entry.score}</SmallText>
        ))}
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
