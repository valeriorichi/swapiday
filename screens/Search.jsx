import * as React from 'react';
import { Searchbar, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  showCheckinDatePicker,
  showCheckoutDatePicker,
  TextInput,
  calenderDate,
  ScrollView,
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { useState, useEffect } from 'react';
import LogoHeader from './LogoHeader';
import {
  doc,
  getDoc,
  updateDoc,
  FieldValue,
  arrayUnion,
  addDoc,
  collection,
  arrayRemove,
  update,
  firebase,
  firesrore,
  getAuth,
  getUser,
  listUsers,
  getDocs,
  query,
  userProfilesCollection,
  where,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { database, auth } from '../config/firebase';
import 'firebase/firestore';
import HomeCard from '../components/HomeCard';

function Search() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showCheckinDatePicker, setShowCheckinDatePicker] = useState(false);
  const [showCheckoutDatePicker, setShowCheckoutDatePicker] = useState(false);
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());
  const [isSearching, setIsSearching] = useState(false);
  const [allListArray, setAllListArray] = useState([]);
  const onChangeSearch = (query) => setSearchQuery(query);

  //const docRef = doc(database, `userProfiles`);
  useEffect(() => {
    const usersCollection = collection(database, 'userProfiles');
    getDocs(usersCollection)
      .then((querySnapshot) => {
        const usersList = querySnapshot.docs.map((doc) => doc.data());
        setAllListArray(usersList);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function handleSearchPress() {
    setIsSearching(true);
    // Perform search logic here
  }
  if (isSearching) {
    return (
      <>
        <LogoHeader style={styles.logoHeader} />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            width: '80%',
            marginLeft: '10%',
            marginTop: '10%',
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
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => setShowCheckinDatePicker(true)}
              style={[styles.dateContainer, { marginRight: 10 }]}
            >
              <Text style={styles.dateText}>
                Check-in Date:{' '}
                {checkinDate.toLocaleDateString() ===
                new Date().toLocaleDateString()
                  ? 'Enter'
                  : checkinDate?.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowCheckoutDatePicker(true)}
              style={styles.dateContainer}
            >
              <Text style={styles.dateText}>
                Check-out Date:{' '}
                {checkoutDate.toLocaleDateString() ===
                new Date().toLocaleDateString()
                  ? 'enter'
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
              onPress={() => setIsSearching(false)}
              style={styles.searchButton}
              labelStyle={{ fontWeight: 'bold' }}
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
        <View style={styles.searchButton}>
          <TouchableOpacity>
            <Button
              title="Search"
              style={styles.searchButtonText}
              onPress={handleSearchPress}
            >
              Search for your Swapiday house
            </Button>
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Available houses:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {allListArray.map((userHome, index) => (
            <>
              <HomeCard key={index} home={userHome}>
                <HomeCard.Image />
                <View style={styles.removeButtonContainer}>
                  <TouchableOpacity
                    onPress={() => goToListingPage(userHome.uid)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>House info</Text>
                  </TouchableOpacity>
                </View>

                <HomeCard.Info>
                  <HomeCard.Location />
                  <HomeCard.Rating />
                </HomeCard.Info>
                <HomeCard.Info>
                  <HomeCard.HomeTypeAndBedrooms />
                  <HomeCard.CommentCount />
                </HomeCard.Info>
              </HomeCard>
              <Text></Text>
            </>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderColor: '#39C67F',
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
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
    justifyContent: 'center',
  },
  logoHeader: {
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  dateContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#39C67F',
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
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#39C67F',
    marginTop: 20,
    marginBottom: 20,
    textShadowColor: '#1c633f',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  searchButton: {
    width: 300,
    height: 30,
    backgroundColor: '#DAEBDD',
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#39C67F',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 5,
    marginTop: 15,
  },
  searchButtonText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#39C67F',
    textShadowColor: '#1c633f',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
    marginTop: -15,
  },
});

export default Search;
