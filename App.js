import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import SearchBaBar from "./Components/SearchBaBar";
import { TVShowAPI } from "./Components/TvShowApi";
import { useEffect, useState } from "react";






export default function App() {



  return (
    <View style={styles.container}>
      <ImageBackground source={require("./assets/images/logo.png")} >
       WhatToWatch </ImageBackground>
        <Text style={styles.text}>WhatToWatch</Text><br/>
        <Text style={styles.text}>Find a show that you may like</Text>
      
      <SearchBaBar
      style={backgroundColor = "white"}
        placeholder="Type Here..."
    
      />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //     flex: 1,
    backgroundColor: "grey",
    fontColor: "white",
    display: "flow",
    // flexDirection: "row",
    flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
  },
  text: {
  color: 'white'
  }
});
