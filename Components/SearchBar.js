// SearchBar.js
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { ListItem } from "react-native-elements";
import { TVShowAPI } from "./TvShowApi";
import { Search as SearchIcons } from "react-bootstrap-icons";


export default function SearchBar({ onSearchResultSelect }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (text) => {
    try {
      setLoading(true);
      const searchData = await TVShowAPI.fetchByTitle(text);
      setSearchResults(searchData);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchValue(text);
    fetchSearchResults(text);
  };

  const handleSelect = (tvShow) => {
    onSearchResultSelect(tvShow);
  };

  const styles = StyleSheet.create({
	search: {
	backgroundColor: 'white',
	borderRadius: 30,
    backgroundColor: '#d9d9d96e',
    height: 30,
    fontWeight: 100,
    fontSize: 20,
    width: '100%',
    borderColor: 'transparent',
    paddingTop: 18,
	paddingRight: 18,
	paddingBottom: 18,
	paddingLeft: 50,
    color: 'white',
	},
	icon: {
	position:'absolute',
	marginTop: 7,
	marginLeft: 15
	},
	empty: {
		color: 'white',
	}
  })
  return (
    <View>
		<SearchIcons size={27} style={styles.icon}/>
		 <TextInput
        placeholder="Search a Tv Show you may like..."
        value={searchValue}
        onChangeText={handleSearch}
		style={styles.search}
      /> 
	  
     
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <ListItem onPress={() => handleSelect(item)}>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>Aucun résultat trouvé</Text>
        )}
      />
      {loading && <Text>Chargement...</Text>}
    </View>

	
  );
 
}
