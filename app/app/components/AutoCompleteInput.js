import React, { useCallback, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const AutoComplete = ({
  isDestinationMode,
  startingLocation,
  setStartingLocation,
  destination,
  setDestination,
  duration,
  setDuration,
  startingSuggestions,
  setStartingSuggestions,
  destinationSuggestions,
  setDestinationSuggestions,
}) => {
  const [startingCache, setStartingCache] = useState({});
  const [destinationCache, setDestinationCache] = useState({});

  const fetchSuggestions = useCallback(
    async (input, setFunction, cache, setCache) => {
      if (cache[input]) {
        setFunction(cache[input]);
        return;
      }
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyB59YCGJoPs5wvPfHRQB3oZmd8LT7uDU-4`
        );
        setFunction(response.data.predictions);
        setCache({
          ...cache,
          [input]: response.data.predictions,
        });
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    },
    []
  );

  const debouncedFetchSuggestions = useCallback(
    (input, setFunction, cache, setCache) => {
      const timeout = setTimeout(() => {
        fetchSuggestions(input, setFunction, cache, setCache);
      }, 300);
      return () => clearTimeout(timeout);
    },
    [fetchSuggestions]
  );
  const handleStartingLocationChange = (text) => {
    setStartingLocation({
      description: text,
    });
    debouncedFetchSuggestions(
      text,
      setStartingSuggestions,
      startingCache,
      setStartingCache
    );
  };

  const handleDestinationChange = (text) => {
    setDestination({
      description: text,
    });
    debouncedFetchSuggestions(
      text,
      setDestinationSuggestions,
      destinationCache,
      setDestinationCache
    );
  };

  const handleSuggestionPress = (suggestion, setFunction) => {
    setFunction(suggestion);
    setStartingSuggestions([]);
    setDestinationSuggestions([]);
  };
  const renderSuggestionsList = (suggestions, setFunction) => (
    <FlatList
      style={styles.list}
      data={suggestions}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleSuggestionPress(item, setFunction)}
          style={styles.listItem}
        >
          <Text>{item.description}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.place_id}
    />
  );
  return (
    <View style={styles.autoCompleteContainer}>
      <TextInput
        value={startingLocation.description}
        onChangeText={handleStartingLocationChange}
        placeholder="Enter Starting Location"
        style={styles.input}
      />
      {renderSuggestionsList(startingSuggestions, setStartingLocation)}
      {isDestinationMode ? (
        <>
          <TextInput
            value={destination.description}
            onChangeText={handleDestinationChange}
            placeholder="Enter Destination"
            style={styles.input}
          />
          {renderSuggestionsList(destinationSuggestions, setDestination)}
        </>
      ) : (
        <TextInput
          value={duration}
          onChangeText={setDuration}
          placeholder="Enter Duration (in minutes)"
          style={styles.input}
        />
      )}
    </View>
  );
};

const styles = {
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    zIndex: 10,
  },
  autoCompleteContainer: {
    gap: 5,
    flexDirection: "coloumn",
    justifyContent: "space-around",
  },
  list: {
    zIndex: 10,
  },
  listItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    zIndex: 10,
  },
};

export default AutoComplete;
