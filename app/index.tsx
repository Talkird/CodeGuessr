import { Button } from "@/components/ui/Button";
import { Column } from "@/components/ui/Column";
import Input from "@/components/ui/Input";
import { SmallText } from "@/components/ui/SmallText";
import { SubTitle } from "@/components/ui/SubTitle";
import { Title } from "@/components/ui/Title";
import USwitch from "@/components/ui/USwitch";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import { primary } from "@/utils/colors";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";

export default function Index() {
  const [name, setName] = useState("");
  const [repeatedDigits, setRepeatedDigits] = useState(false);
  const playerStore = usePlayerStore();
  const gameStore = useGameStore();

  function handlePlayPress() {
    if (name.trim() === "") {
      playerStore.setName("Invitado");
    } else {
      playerStore.setName(name);
    }
    gameStore.resetGame();
    router.push("/game");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/backgrounds/scatter.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Column
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 32,
              padding: 24,
            }}
          >
            <Column>
              <Title style={{ color: primary }}>CodeGuessr</Title>
              <SubTitle style={{ opacity: 0.5 }}>
                Adivina el número para ganar!
              </SubTitle>
            </Column>
            <Column style={{ gap: 16 }}>
              <Input
                value={name}
                onChangeText={setName}
                placeholder="Ingresa tu nombre"
              />
              <USwitch
                value={repeatedDigits}
                onValueChange={setRepeatedDigits}
                text="Digítos repetidos"
              />
            </Column>
            <Column style={{ gap: 8 }}>
              <Button onPress={handlePlayPress}>Jugar ahora</Button>
              <Link href="/ranking">
                <SmallText
                  style={{ color: primary, textDecorationLine: "underline" }}
                >
                  Ver ranking
                </SmallText>
              </Link>
            </Column>
          </Column>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
