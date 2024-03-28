import axios from "axios";
import { API_KEY_PARAM, BASE_URL } from "../config";
const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY_PARAM = "?api_key=0e49479bd42be0ad81a4e9cf929aaf11"
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original/"

export class TVShowAPI {
  static async fetchPopulars() {
    const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`);
    // console.log("####", response.data.results)
    return response.data.results;
  }

  static async fetchRecommendations(tvShowId) {
    const response = await axios.get(
      `${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`
    );
    console.log("+++recommendations+++", response.data.results);
    return response.data.results;
  }

  static async fetchByTitle(title) {
    try {
      const response = await axios.get(
        `${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`
      );
      console.log("////", response.data.results);
      return response.data.results;
    } catch (error) {
      alert("erreur durant la recherche de la série");
    }
  }
}
