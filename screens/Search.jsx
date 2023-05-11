import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { database } from "../config/firebase";
import LogoHeader from "./LogoHeader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeCard from "../components/HomeCard";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showCheckinDatePicker, setShowCheckinDatePicker] = useState(false);
  const [showCheckoutDatePicker, setShowCheckoutDatePicker] = useState(false);
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());
  const [isSearching, setIsSearching] = useState(false);
  const [allListArray, setAllListArray] = useState([]);
  const [listAvailableHomes, setListAvailableHomes] = useState([]);
  const [listUnavailableHomes, setListUnavailableHomes] = useState([]);

  const { currentUser, setCurrentUser } = useAuth();
  const [userList, setUserList] = useState([{}]);
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    const usersCollection = collection(database, "userProfiles");
    getDocs(usersCollection)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const ids = querySnapshot.docs.map((doc) => doc.id);
          setAllListArray(
            ids.filter((userUid) => userUid !== currentUser?.uid)
          );
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const storage = getStorage();
    Promise.all(
      allListArray.map((uid) => {
        const docRef = doc(database, `userProfiles/${uid}`);
        const reference = ref(storage, `users/${uid}/houseImages`);
        return Promise.all([
          getDoc(docRef).then((doc) => doc.data({ uid, ...doc.data() })),
          listAll(reference).then((result) =>
            result.items.length > 0 ? getDownloadURL(result.items[0]) : null
          ),
        ]).then(([userData, imageUrl]) => {
          const commentsCount = userData.comments.length;
          const rating = (
            userData.reviews.reduce(
              (total, review) => total + parseFloat(review),
              0
            ) / userData.reviews.length
          ).toFixed(1);
          return {
            ...userData,
            uid,
            imageUrl,
            commentsCount,
            rating,
          };
        });
      })
    )
      .then((users) => {
        setUserList(users);
        const matchingHomes = users.filter((home) =>
          home.houseLocation?.toLowerCase().includes(searchQuery?.toLowerCase())
        );

        const availableHomes = [];
        const unavailableHomes = [];

        matchingHomes.forEach((home) => {
          if (home.isAvailable) {
            availableHomes.push(home);
          } else {
            unavailableHomes.push(home);
          }
        });

        setListAvailableHomes(availableHomes);
        setListUnavailableHomes(unavailableHomes);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [allListArray, isSearching]);

  function handleSearchPress() {
    setIsSearching(true);

    // Perform search logic here
  }

  const goToListingPage = (userHomeUid) => {
    navigation.navigate("ListingPage", {
      screen: "ListingPage",
      params: {
        searchedUserUid: userHomeUid,
        fromWishList: false,
      },
    });
  };

  if (isSearching) {
    return (
      <>
        <LogoHeader style={styles.logoHeader} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            width: "80%",
            marginLeft: "10%",
            marginTop: "10%",
          }}
        >
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Where to?"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.searchInput}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setShowCheckinDatePicker(true)}
              style={[styles.dateContainer, { marginRight: 10 }]}
            >
              <Text style={styles.dateText}>
                Check-in Date:{" "}
                {checkinDate.toLocaleDateString() ===
                new Date().toLocaleDateString()
                  ? "Enter"
                  : checkinDate?.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowCheckoutDatePicker(true)}
              style={styles.dateContainer}
            >
              <Text style={styles.dateText}>
                Check-out Date:{" "}
                {checkoutDate.toLocaleDateString() ===
                new Date().toLocaleDateString()
                  ? "enter"
                  : checkoutDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          {showCheckinDatePicker && (
            <DateTimePicker
              value={checkinDate}
              minimumDate={new Date()}
              maximumDate={new Date(2025, 1, 1)}
              onChange={(event, selectedDate) => {
                setShowCheckinDatePicker(false);
                if (selectedDate) {
                  setCheckinDate(selectedDate);
                }
              }}
            />
          )}

          {showCheckoutDatePicker && (
            <DateTimePicker
              value={checkoutDate}
              minimumDate={checkinDate}
              maximumDate={new Date(2025, 1, 1)}
              onChange={(event, selectedDate) => {
                setShowCheckoutDatePicker(false);
                if (selectedDate) {
                  setCheckoutDate(selectedDate);
                }
              }}
            />
          )}

          <View>
            <Button
              icon="magnify"
              mode="contained"
              backgroundColor="#39C67F"
              onPress={() => {
                setIsSearching(false);
              }}
              style={styles.searchButton}
              labelStyle={{ fontWeight: "bold" }}
            >
              Search
            </Button>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <ScrollView>
        <LogoHeader />

        <View className=" flex items-center mt-7">
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Text className="text-center">Search Homes</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Available Homes:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {userList.map((userHome, index) => (
            <View>
              <HomeCard key={index} home={userHome}>
                <HomeCard.Image />

                <HomeCard.Info>
                  <HomeCard.Location />
                  <HomeCard.Rating />
                </HomeCard.Info>
                <HomeCard.Info>
                  <HomeCard.HomeTypeAndBedrooms />
                  <HomeCard.CommentCount />
                </HomeCard.Info>
                <HomeCard.Info>
                  <View style={styles.removeButtonContainer}>
                    <TouchableOpacity
                      onPress={() => goToListingPage(navigation, userHome.uid)}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>House info</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.removeButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      title="Chat"
                      onPress={() => {
                        navigation.navigate("ChatsNav", {
                          screen: "Chat",
                          params: {
                            sender: currentUser.uid,
                            recipient: userHome.firstName,
                          },
                        });
                      }}
                    >
                      <Text style={styles.buttonText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                </HomeCard.Info>
              </HomeCard>
              <Text></Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderColor: "#39C67F",
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
    color: "#000",
  },
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
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
  dateContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#39C67F",
    marginBottom: 10,
  },
  dateInput: {
    padding: 10,
    fontSize: 16,
  },
  dateText: {
    padding: 10,
    fontSize: 16,
  },
  header: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#39C67F",
    marginTop: 20,
    marginBottom: 20,
  },
  searchButton: {
    borderColor: "#39C67F",
    width: 225,
    textAlign: "middle",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(57,198,127,0.5)",
    padding: 10,
  },
  searchButtonText: {
    fontSize: 24,
    textAlign: "center",
    color: "#39C67F",

    marginTop: -15,
  },
  removeButtonContainer: {
    width: 100,
    marginTop: 5,
    borderColor: "#39C67F",
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: "rgba(57,198,127,0.5)",
  },
  button: {
    padding: 1,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});

export default Search;
