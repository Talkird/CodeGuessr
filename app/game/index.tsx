import GuessInput from "@/components/GuessInput";
import { Button } from "@/components/ui/Button";
import { Column } from "@/components/ui/Column";
import { SmallText } from "@/components/ui/SmallText";
import { SubTitle } from "@/components/ui/SubTitle";
import { Title } from "@/components/ui/Title";
import { usePlayerStore } from "@/stores/player";
import { primary } from "@/utils/colors";
import { Link } from "expo-router";
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
              <Title style={{ color: primary }}>Hola, {playerStore.name}</Title>
              <SubTitle style={{ opacity: 0.5 }}>
                Intentos restantes: 10
              </SubTitle>
            </Column>

            <GuessInput />

            <Column style={{ gap: 8 }}>
              <Button>Adivinar</Button>
              <Link href="/">
                <SmallText
                  style={{ color: primary, textDecorationLine: "underline" }}
                >
                  Volver al menú
                </SmallText>
              </Link>
            </Column>
          </Column>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
