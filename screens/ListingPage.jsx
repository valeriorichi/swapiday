import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  onImageSwipe,
  activeImageIndex,
  Modal,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import Geocoding from "react-native-geocoding";
import { useState, useEffect } from "react";
import { Marker } from "react-native-maps";
import Swiper from "react-native-swiper";
import GOOGLE_API_KEY from "../google_api_key";
import testedUser from "../temp";

const chatButton = require("../assets/chatButton.png");
const wishlistButton = require("../assets/wishlistButton.png");
const yellowStar = require("../assets/yellowStar.png");

Geocoding.init(GOOGLE_API_KEY);

const images = testedUser.houseImage;

function ListingPage() {
  const [address, setAddress] = useState("");
  const [mapPosition, setMapPosition] = useState({
    latitude: 51.507359,
    longitude: -0.136439,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState(mapPosition);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    Geocoding.from(testedUser.houseLocation)
      .then((response) => {
        const location = response.results[0].geometry.location;
        const newPosition = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setMarkerPosition(newPosition);
        setMapPosition(newPosition);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onRegionChangeComplete = (newPosition) => {
    // Only update the map's position, not the marker's position
    setMapPosition(newPosition);
  };

  const openGoogleMaps = (newPosition) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${markerPosition.latitude},${markerPosition.longitude}`;
    Linking.openURL(url);
  };

  const addToWishlist = () => {
    // For now, display an alert message
    alert("Redirecting to WishList");
    //navigation.navigate('Wishlist');
  };

  const goToChat = () => {
    // For now, display an alert message
    alert("Redirecting to ChatPage");
    //navigation.navigate('Chat');
  };

  const goToCommentPage = () => {
    // For now, display an alert message
    alert("Redirecting to Comment Page");
    //navigation.navigate('Comment');
  };

  const goToUserProfile = () => {
    // For now, display an alert message
    alert("Redirecting to User Profile");
    //navigation.navigate('Comment');
  };

  const goToReservationPage = () => {
    // For now, display an alert message
    alert("Redirecting to Reservation Page");
    //navigation.navigate('Comment');
  };

  return (
    <ScrollView>
      <LogoHeader style={styles.logoHeader} />
      <Text style={styles.header}>{testedUser.houseHeaderInfo}</Text>
      <View style={styles.mapAndImageContainer}>
        <Swiper
          style={styles.swiper}
          onIndexChanged={onImageSwipe}
          loop={false}
          showsPagination={false}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.image} />
          ))}
        </Swiper>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icons} onPress={addToWishlist}>
          <Image
            source={require("../assets/../assets/wishlistButton.png")}
            style={styles.icons}
          />
          <Text style={styles.iconText}>Add in{"\n"}Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icons} onPress={goToChat}>
          <Image
            source={require("../assets/chatButton.png")}
            style={styles.icons}
          />
          <Text style={styles.iconText}>Contact{"\n"}host</Text>
        </TouchableOpacity>
        <View style={styles.commentContainer}>
          <TouchableOpacity style={styles.icons} onPress={goToCommentPage}>
            <View style={styles.ratingContainer}>
              <Image
                source={require("../assets/yellowStar.png")}
                style={[styles.icons, { marginLeft: -12 }]}
              />
              <Text style={[styles.iconText, { fontSize: 24 }]}>
                {testedUser.comments.rating}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.iconText, { fontSize: 24 }]}>
                {testedUser.comments.review}
              </Text>
              <Text
                style={[
                  styles.iconText,
                  { fontSize: 18, marginRight: -20, marginLeft: 5 },
                ]}
              >
                reviews
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={goToReservationPage}
      >
        <Text style={styles.reserveButtonText}>Reserve</Text>
      </TouchableOpacity>
      <Text style={styles.header}>About accomodation:</Text>
      <View style={styles.mapAndImageContainer}>
        <Text>{testedUser.houseInfo}</Text>
      </View>
      <Text style={styles.header}>Location</Text>
      <Text style={styles.userLocation}>{testedUser.houseLocation}</Text>
      <View style={styles.mapAndImageContainer}>
        <MapView
          style={styles.map}
          region={mapPosition}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          <Marker key="green-marker" coordinate={markerPosition} />
        </MapView>
        <TouchableOpacity onPress={openGoogleMaps} style={styles.button}>
          <Text style={styles.buttonText}>Open in Google Maps</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Available dates</Text>
      <View style={styles.availableDatesContainer}>
        {testedUser.available_dates.map((date, index) => (
          <Text style={styles.datesText}>
            {date.from} - {date.to}
          </Text>
        ))}
      </View>
      <Text style={styles.header}>About host</Text>
      <TouchableOpacity onPress={goToUserProfile}>
        <Text style={styles.userName}>
          {testedUser.name + " " + testedUser.surname}
        </Text>
        <View style={styles.mapAndImageContainer}>
          <Image source={testedUser.userImage[0]} style={styles.userImage} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.reserveButton, { marginBottom: 100 }]}
        onPress={goToReservationPage}
      >
        <Text style={styles.reserveButtonText}>Reserve</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const { width } = Dimensions.get("window");
const imageHeight = width * 0.8;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
  },
  mapAndImageContainer: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: "#39C67F",
    width: "90%",
    aspectRatio: 1.25,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  map: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: imageHeight,
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center", // Add this line
    maxHeight: Dimensions.get("window").width * 0.9 * 0.8, // Add this line
  },
  button: {
    position: "absolute",
    bottom: 1,
    right: 1,
    backgroundColor: "#39C67F",
    padding: 2,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#39C67F",
    marginTop: 20,
    marginBottom: 20,
    textShadowColor: "#1c633f",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  logoHeader: {
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: "10%",
    marginTop: 15,
    marginBottom: 50,
  },
  icons: {
    width: 50,
    height: 50,
  },
  iconText: {
    textAlign: "center",
    color: "#39C67F",
    textShadowColor: "#1c633f",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 10,
    width: "30%",
  },
  availableDatesContainer: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: "#39C67F",
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  datesText: {
    fontSize: 18,
    textAlign: "center",
    color: "#39C67F",
    textShadowColor: "#1c633f",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  userImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#39C67F",
    overflow: "hidden",
  },
  userImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userName: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#39C67F",
    marginTop: -10,
    marginBottom: 5,
    textShadowColor: "#1c633f",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  userLocation: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#39C67F",
    marginTop: -10,
    marginBottom: 5,
    textShadowColor: "#1c633f",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  userComments: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#39C67F",
    marginTop: 20,
    marginBottom: 20,
    textShadowColor: "#1c633f",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  reserveButton: {
    width: 100,
    height: 50,
    backgroundColor: "lightcoral",
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#39C67F",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 5,
  },
  reserveButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "#39C67F",
    textShadowColor: "#1c633f",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
});

export default ListingPage;
