import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};

const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      minLength={2}
      autoFocus={false}
      returnKeyType={"search"}
      listViewDisplayed={false} // Disable the internal VirtualizedList
      fetchDetails={true}
      renderDescription={(row) => row.description}
      getDefaultValue={() => ""}
      query={{
        key: process.env.GOOGLE_MAPS_API_KEY,
        language: "en",
        types: "(cities)",
      }}
      styles={{
        textInputContainer: {
          width: "100%",
        },
        description: {
          fontWeight: "bold",
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      GooglePlacesSearchQuery={{
        rankby: "distance",
        types: "food",
      }}
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3",
      ]}
      predefinedPlaces={[homePlace, workPlace]}
      debounce={200}
    />
  );
};

export default GooglePlacesInput;
