import { Button } from "@/components/ui/Button";
import { Column } from "@/components/ui/Column";
import Input from "@/components/ui/Input";
import { SmallText } from "@/components/ui/SmallText";
import { Title } from "@/components/ui/Title";
import { usePlayerStore } from "@/stores/player";
import { primary } from "@/utils/colors";
import { Link, router } from "expo-router";
import { useState } from "react";

import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [name, setName] = useState("");
  const playerStore = usePlayerStore();

  function handlePlayPress() {
    if (name.trim() === "") {
      alert("Por favor, ingresa tu nombre");
      return;
    }
    playerStore.setName(name);
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
            <Title style={{ color: primary }}>CodeGuessr</Title>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Ingresa tu nombre"
            />
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
