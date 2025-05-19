import { Column } from "@/components/ui/Column";
import { Title } from "@/components/ui/Title";
import { primary } from "@/utils/colors";
import { useState } from "react";

import { Dimensions, ImageBackground } from "react-native";
const { width, height } = Dimensions.get("window");


export default function Index() {
  return (
    <ImageBackground
      source={require("@/assets/backgrounds/scatter.png")}
      style={{ width, height }}
    >
      <Column
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Title style={{ color: primary }}>Ranking</Title>
      </Column>
    </ImageBackground>
  );
}
