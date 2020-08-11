import React from "react";
import { View, ImageBackground, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import giveClassesBgImage from "../../assets/images/give-classes-background.png";
import styles from "./styles";

function GiveClasses() {
  const { goBack } = useNavigation();
  function NavigateBack() {
    goBack();
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor em nossa
          plataforma WEB
        </Text>
      </ImageBackground>
      <RectButton onPress={NavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo Bem :D</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
