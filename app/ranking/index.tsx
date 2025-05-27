import { Button } from "@/components/Button";
import { Column } from "@/components/Column";
import { ScoreTable } from "@/components/ScoreTable";
import { Title } from "@/components/Title";
import { useRankingStore } from "@/stores/ranking";
import { primary } from "@/utils/colors";
import { useRouter } from "expo-router";
import { ImageBackground } from "react-native";

export default function Index() {
  const rankingStore = useRankingStore();
  const rankings = rankingStore.scores;
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/haikei/waves.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <Column
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Title style={{ color: primary }}>Ranking 🏆</Title>
        <Column>
          <ScoreTable scores={rankings} />
        </Column>
        <Button
          onPress={() => {
            router.replace("/");
          }}
        >
          Volver al menú
        </Button>
      </Column>
    </ImageBackground>
  );
}
