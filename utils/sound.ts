import { Audio } from "expo-av";

let backgroundMusic: Audio.Sound | null = null;

async function playSound(soundAsset: any) {
  const { sound } = await Audio.Sound.createAsync(soundAsset);
  await sound.playAsync();
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      sound.unloadAsync();
    }
  });
}

export async function playBackgroundMusic(musicAsset: any, isLooping = true) {
  if (backgroundMusic) {
    await backgroundMusic.unloadAsync();
    backgroundMusic = null;
  }
  const { sound } = await Audio.Sound.createAsync(musicAsset, { isLooping });
  backgroundMusic = sound;
  await sound.playAsync();
}

export async function stopBackgroundMusic() {
  if (backgroundMusic) {
    await backgroundMusic.stopAsync();
    await backgroundMusic.unloadAsync();
    backgroundMusic = null;
  }
}

export async function playWinEffect() {
  const winSound = require("@/assets/sounds/win.mp3");
  await playSound(winSound);
}

export async function playLoseEffect() {
  const loseSound = require("@/assets/sounds/lose.mp3");
  await playSound(loseSound);
}
