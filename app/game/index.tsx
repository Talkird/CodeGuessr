import { Button } from "@/components/Button";
import { Column } from "@/components/Column";
import NumberInput from "@/components/NumberInput";
import { Row } from "@/components/Row";
import { SmallText } from "@/components/SmallText";
import { SubTitle } from "@/components/SubTitle";
import { Title } from "@/components/Title";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import { primary } from "@/utils/colors";
import { playLoseEffect, playWinEffect } from "@/utils/sound";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function Index() {
  const [guess, setGuess] = useState("");
  const gameStore = useGameStore();
  const playerStore = usePlayerStore();
  const router = useRouter();

  useEffect(() => {
    gameStore.generateAnswer();
  }, []);

  useEffect(() => {
    if (gameStore.hasWon) playWinEffect();
    if (gameStore.hasLost) playLoseEffect();
  }, [gameStore.hasWon, gameStore.hasLost]);

  function handleGuess() {
    if (guess.length !== 4) {
      alert("El número debe tener 4 dígitos");
      return;
    }

    if (!/^\d+$/.test(guess)) {
      alert("El número solo puede contener dígitos");
      return;
    }

    gameStore.takeGuess(guess);
    Keyboard.dismiss();
    setGuess("");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/haikei/waves-low.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 24,
            }}
            keyboardShouldPersistTaps="handled"
          >
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
                <Title style={{ color: primary }}>
                  Hola, {playerStore.name} {gameStore.answer}
                </Title>
                <SubTitle style={{ opacity: 0.5 }}>
                  Intentos restantes: {gameStore.attemptsLeft}
                </SubTitle>
              </Column>

              <Column>
                {gameStore.hasWon && (
                  <Title style={{ color: primary, fontSize: 24 }}>
                    Felicidades! Ganaste 🥳
                  </Title>
                )}
                {gameStore.hasLost && (
                  <Title style={{ color: primary, fontSize: 24 }}>
                    Perdiste 😔{"\n"}Respuesta: {gameStore.answer}
                  </Title>
                )}
              </Column>

              {gameStore.attempts.length != 0 && (
                <Column>
                  {gameStore.attempts.map((attempt, index) => (
                    <Row
                      style={{
                        gap: 8,
                      }}
                      key={index}
                    >
                      <SmallText
                        style={{
                          fontSize: 24,
                          opacity: 0.5,
                          fontFamily: "Outfit_700Bold",
                        }}
                      >
                        {attempt.guess}
                      </SmallText>
                      <Row style={{ gap: 8 }}>
                        <SmallText
                          style={{
                            fontSize: 24,
                            fontFamily: "Outfit_700Bold",
                            color: "#228B22",
                          }}
                        >
                          {attempt.correct}B
                        </SmallText>

                        <SmallText
                          style={{
                            fontSize: 24,
                            fontFamily: "Outfit_700Bold",
                            color: "#DAA520",
                          }}
                        >
                          {attempt.partial}R
                        </SmallText>

                        <SmallText
                          style={{
                            fontSize: 24,
                            fontFamily: "Outfit_700Bold",
                            color: "#B22222",
                          }}
                        >
                          {attempt.incorrect}M
                        </SmallText>
                      </Row>
                    </Row>
                  ))}
                </Column>
              )}

              {!gameStore.hasWon && !gameStore.hasLost && (
                <NumberInput
                  value={guess}
                  onChangeText={setGuess}
                  placeholder="Número de 4 dígitos"
                />
              )}

              <Column style={{ gap: 8 }}>
                {!gameStore.hasWon && !gameStore.hasLost && (
                  <Button onPress={handleGuess}>Adivinar</Button>
                )}
                {(gameStore.hasWon || gameStore.hasLost) && (
                  <Button
                    onPress={() => {
                      gameStore.resetGame();
                    }}
                  >
                    Jugar de nuevo
                  </Button>
                )}
                <Link replace href="/">
                  <SmallText
                    style={{ color: primary, textDecorationLine: "underline" }}
                  >
                    Volver al menú
                  </SmallText>
                </Link>
              </Column>
            </Column>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
