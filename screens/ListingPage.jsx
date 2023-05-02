import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import React from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import Geocoding from "react-native-geocoding";
import { useState } from "react";
import { Marker } from "react-native-maps";
import GOOGLE_API_KEY from "../google_api_key";
const greenGoogleMarkerImage = require("../assets/green-map-marker.png");

Geocoding.init(GOOGLE_API_KEY);

function ListingPage() {
  const [address, setAddress] = useState("");
  const [mapPosition, setMapPosition] = useState({
    latitude: 51.507359,
    longitude: -0.136439,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState(mapPosition);

  const onSubmit = async () => {
    try {
      const response = await Geocoding.from(address);
      const location = response.results[0].geometry.location;
      const newPosition = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setMarkerPosition(newPosition);
      setMapPosition(newPosition);
    } catch (error) {
      console.log(error);
    }
  };

  const onRegionChangeComplete = (newPosition) => {
    // Only update the map's position, not the marker's position
    setMapPosition(newPosition);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LogoHeader />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter location"
        onSubmitEditing={onSubmit}
      />
      <Text>
        Position: {markerPosition.latitude}, {markerPosition.longitude}
      </Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={mapPosition}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          <Marker key="green-marker" coordinate={markerPosition} />
        </MapView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
  },
  mapContainer: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: "#39C67F",
    width: "90%",
    aspectRatio: 1.25,
    alignSelf: "center",
  },
  map: {
    flex: 1,
  },
});

export default ListingPage;
