// App.js
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import SearchBars from "./Components/SearchBar";
import { TVShowAPI } from "./Components/TvShowApi";
import { useEffect, useState } from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Recommendations from "./Components/Recommendations"; // Importez le composant Recommendations

export default function App() {
  const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original/";

  const [currentTVShow, setCurrentTVShow] = useState();

  function handleTvShowSelect (tvShow) {
    setCurrentTVShow(tvShow);
  };

  async function fetchPopulars() {
    const populars = await TVShowAPI.fetchPopulars();
    if (populars.length > 0) {
      setCurrentTVShow(populars[1]); // Sélection de la série télévisée populaire
    }
  }

  console.log(currentTVShow);

  useEffect(() => {
    fetchPopulars();
  }, []);

  // Fonction pour mettre à jour currentTVShow lorsqu'une recommandation est cliquée
  function handleRecommendationClick(tvShow) {
    setCurrentTVShow(tvShow);
  }

  return (
    <View
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
        width: "100vw",
      }}
    >
      <View style={styles.header}>
      <Image source={require("./assets/images/logo.png")}></Image>
      <Text style={styles.title}>WhatToWatch</Text>
      </View>
      <Text style={styles.text}>Find a show that you may like</Text>
      <SearchBars
        placeholder="Type Here..."
        onSearchResultSelect={handleTvShowSelect}
      />
      <View style={styles.rating}>
      <Text style={styles.details}>{currentTVShow ? currentTVShow.name : ""}</Text>
      <StarRatingDisplay rating={currentTVShow ? currentTVShow.vote_average / 2 : ""} />
      </View>
      <Text style={styles.text}>{currentTVShow ? currentTVShow.overview : ""}</Text>
      {/* Passer la fonction de mise à jour à Recommendations */}
      <Recommendations
        tvShowId={currentTVShow ? currentTVShow.id : null}
        onRecommendationClick={handleRecommendationClick}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15
  },
  details: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    marginLeft: 10,

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: 'white'
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    padding: 20,
  }

});
