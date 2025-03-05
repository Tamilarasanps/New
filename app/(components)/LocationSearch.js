import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { TextInput, List } from "react-native-paper";
import axios from "axios";

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${text}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching locations", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setResults([]);
    if (onSelect) onSelect(place);
  };

  return (
    <View style={{ margin: 10 }}>
      <TextInput
        label="Search Location"
        value={query}
        onChangeText={handleSearch}
        mode="outlined"
      />
      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <List.Item title={item.display_name} />
            </TouchableOpacity>
          )}
          style={{
            backgroundColor: "white",
            elevation: 3,
            borderRadius: 5,
            maxHeight: 200,
          }}
        />
      )}
    </View>
  );
};

export default LocationSearch;
