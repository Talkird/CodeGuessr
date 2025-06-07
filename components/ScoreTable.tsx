import { Column } from "@/components/Column";
import { Row } from "@/components/Row";
import { SubTitle } from "@/components/SubTitle";
import { primary } from "@/utils/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { SmallText } from "./SmallText";

interface WinEntry {
  player: string;
  wins: number;
}

interface ScoreTableProps {
  scores?: WinEntry[];
}

export function ScoreTable({ scores }: ScoreTableProps) {
  const topScores = (scores || [])
    .filter((entry) => typeof entry.wins === "number" && !isNaN(entry.wins))
    .slice()
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 5);

  return (
    <Row style={{ gap: 32 }}>
      <Column style={styles.column}>
        <SubTitle style={styles.header}>Jugador</SubTitle>
        {topScores.map((entry, idx) => (
          <SmallText key={entry.player + idx}>{entry.player}</SmallText>
        ))}
      </Column>
      <Column style={styles.column}>
        <SubTitle style={styles.header}>Victorias</SubTitle>
        {topScores.map((entry, idx) => (
          <SmallText key={entry.player + idx}>{entry.wins}</SmallText>
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
