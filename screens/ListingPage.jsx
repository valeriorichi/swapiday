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
import React, { useContext, useEffect, useState } from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
import Geocoding from "react-native-geocoding";
import { Marker } from "react-native-maps";
import Swiper from "react-native-swiper";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../config/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  FieldValue,
  arrayUnion,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import GOOGLE_API_KEY from "../google_api_key";
import testedUser from "../temp";
import ErrorPage from "./ErrorPage";

const chatButton = require("../assets/chatButton.png");
const wishlistButton = require("../assets/wishlistButton.png");
const yellowStar = require("../assets/yellowStar.png");

Geocoding.init(GOOGLE_API_KEY);
// remove "= DNuWaXM85COmHYtIXBnys2vRQxu2" from below
// change userProfilesV2 for proper name which used in Firebase
// import all pages where searchedUserUid comes from

function ListingPage({ searchedUserUid = "DNuWaXM85COmHYtIXBnys2vRQxu2" }) {
  const [address, setAddress] = useState("");
  const [mapPosition, setMapPosition] = useState({
    latitude: 51.507359,
    longitude: -0.136439,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState(mapPosition);
  const [toWishlist, setToWishlist] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();
  const [location, setLocation] = useState("");
  const [houseHeaderInfo, setHouseHeaderInfo] = useState("");
  const [houseInfo, setHouseInfo] = useState("");
  const navigation = useNavigation();
  const [reviewsField, setReviewsField] = useState("");
  const [commentsField, setCommentsField] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("[]");
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const storage = getStorage();
    const listReference = ref(storage, `users/${searchedUserUid}/houseImages`);
    listAll(listReference)
      .then((res) => {
        const images = [];
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            images.push({ url: url, name: itemRef.name });
            if (images.length === res.items.length) {
              setImages(images);
              setIsLoading(false);
            }
          });
        });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    const userImageRef = ref(
      storage,
      `users/${searchedUserUid}/userImages/userImage.jpg`
    );
    getDownloadURL(userImageRef)
      .then((url) => {
        setUserImage(url);
      })
      .catch((error) => {
        console.error(error);
      });

    const docRef = doc(database, `userProfilesV2/${searchedUserUid}`);
    getDoc(docRef)
      .then((doc) => {
        setLocation(doc.data().location);
        setHouseHeaderInfo(doc.data().houseHeaderInfo);
        const reviewsArray = doc.data().reviews;
        const sum = reviewsArray.reduce((acc, review) => acc + review, 0);
        const averageReview = (sum / reviewsArray.length).toFixed(1);
        setReviewsField(averageReview);
        setCommentsField(doc.data().comments.length);
        setHouseInfo(doc.data().houseInfo);
        setAvailableDates(doc.data().availableDates);
        setFirstName(doc.data().firstName);
        setLastName(doc.data().lastName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    if (location) {
      Geocoding.from(location)
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
          setError(true);
          setErrors(error.response.data);
        });
    }
  }, [location]);

  const onRegionChangeComplete = (newPosition) => {
    setMapPosition(newPosition);
  };

  const openGoogleMaps = (newPosition) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${markerPosition.latitude},${markerPosition.longitude}`;
    Linking.openURL(url);
  };
  const addToWishlist = () => {
    const docRef = doc(database, `userProfilesV2/${searchedUserUid}`);
    updateDoc(docRef, {
      wishList: arrayUnion(searchedUserUid),
    })
      .then(() => {
        alert("Added to WishList");
        setToWishlist(true);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const goToChat = () => {
    alert("Redirecting to ChatPage");
    navigation.navigate("Chat", { searchedUserUid: searchedUserUid });
  };

  const goToReviewsPage = () => {
    alert("Redirecting to Reviews andComment Page");
    navigation.navigate("Reviews", { searchedUserUid: searchedUserUid });
  };

  const goToUserProfile = () => {
    alert("Redirecting to User Profile");
    navigation.navigate("Reviews", { searchedUserUid: searchedUserUid });
  };

  const addBooking = () => {
    const docRef = doc(database, `userProfilesV2/${searchedUserUid}`);
    const docRef1 = doc(database, `userProfilesV2/${currentUser.uid}`);

    Promise.all([
      updateDoc(docRef, { reservedMe: arrayUnion(searchedUserUid) }),
      updateDoc(docRef1, { myBooking: arrayUnion(searchedUserUid) }),
    ])
      .then(() => {
        setIsReserved(true);
        alert("Booked");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  if (error) return <ErrorPage message={error} />;
  return (
    <ScrollView>
      <LogoHeader style={styles.logoHeader} />
      <Text style={styles.header}>{houseHeaderInfo}</Text>
      <View style={styles.mapAndImageContainer}>
        <Swiper
          style={styles.swiper}
          onIndexChanged={onImageSwipe}
          loop={false}
          showsPagination={false}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.url }}
              style={styles.image}
            />
          ))}
        </Swiper>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={[styles.icons, { opacity: toWishlist ? 0.2 : 1 }]}
          disabled={toWishlist}
          onPress={addToWishlist}
        >
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
          <TouchableOpacity style={styles.icons} onPress={goToReviewsPage}>
            <View style={styles.ratingContainer}>
              <Image
                source={require("../assets/yellowStar.png")}
                style={[styles.icons, { marginLeft: -12 }]}
              />
              <Text style={[styles.iconText, { fontSize: 24 }]}>
                {reviewsField}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.iconText, { fontSize: 24 }]}>
                {commentsField}
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
        style={[styles.reserveButton, { opacity: isReserved ? 0.2 : 1 }]}
        disabled={isReserved}
        onPress={addBooking}
      >
        <Text style={styles.reserveButtonText}>Book now</Text>
      </TouchableOpacity>
      <Text style={styles.header}>About accomodation:</Text>
      <View style={styles.mapAndImageContainer}>
        <Text>{houseInfo}</Text>
      </View>
      <Text style={styles.header}>Location</Text>
      <Text style={styles.userLocation}>{location}</Text>
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
        {availableDates.map((date, index) => (
          <Text key={index} style={styles.datesText}>
            {date.from.toDate().toLocaleDateString()} -{" "}
            {date.to.toDate().toLocaleDateString()}
          </Text>
        ))}
      </View>
      <Text style={styles.header}>About host</Text>
      <TouchableOpacity onPress={goToUserProfile}>
        <Text style={styles.userName}>{firstName + " " + lastName}</Text>
        <View style={styles.mapAndImageContainer}>
          <Image source={{ uri: userImage }} style={styles.userImage} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.reserveButton,
          { marginBottom: 100 },
          { opacity: isReserved ? 0.2 : 1 },
        ]}
        disabled={isReserved}
        onPress={addBooking}
      >
        <Text style={styles.reserveButtonText}>Book now</Text>
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
    backgroundColor: "#DAEBDD",
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
