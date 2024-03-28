// Recommendations.js
import React, { useEffect, useState } from "react";
import { TVShowAPI } from "./TvShowApi";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

export default function Recommendations({ tvShowId, onRecommendationClick }) {
  const [recommendations, setRecommendations] = useState([]);

  async function fetchRecommendations() {
    const fetchedRecommendations = await TVShowAPI.fetchRecommendations(tvShowId);
    setRecommendations(fetchedRecommendations);
  }

  useEffect(() => {
    if (tvShowId) {
      fetchRecommendations();
    }
  }, [tvShowId]);

  return (
    <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white"}}>You may also like :</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onRecommendationClick(item)}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }}
              style={{ width: 100, height: '20vh', margin: 5 }}
            />   
            <Text style={{ textAlign: "center", color: "white" }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
