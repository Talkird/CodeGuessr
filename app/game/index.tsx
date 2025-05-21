import { Button } from "@/components/ui/Button";
import { Column } from "@/components/ui/Column";
import NumberInput from "@/components/ui/NumberInput";
import { Row } from "@/components/ui/Row";
import { SmallText } from "@/components/ui/SmallText";
import { SubTitle } from "@/components/ui/SubTitle";
import { Title } from "@/components/ui/Title";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import { primary } from "@/utils/colors";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
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

  useEffect(() => {
    gameStore.generateAnswer();
  }, []);

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
              <Title style={{ color: primary }}>Hola, {playerStore.name}</Title>
              <SubTitle style={{ opacity: 0.5 }}>
                Intentos restantes: {gameStore.attemptsLeft}
              </SubTitle>
            </Column>

            <Column>
              {gameStore.hasWon && (
                <Title style={{ color: primary, fontSize: 24 }}>
                  Felicidades, ganaste!
                </Title>
              )}
              {gameStore.hasLost && (
                <Title style={{ color: primary, fontSize: 24 }}>
                  Perdiste, el numero era {gameStore.answer}!
                </Title>
              )}
            </Column>

            {gameStore.attempts.length != 0 && (
              <Column
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 12,
                  backgroundColor: "#e8e8e8",
                }}
              >
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
              <Link href="/">
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
    </SafeAreaView>
  );
}
