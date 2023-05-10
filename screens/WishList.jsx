import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import LogoHeader from './LogoHeader';
import HomeCard from '../components/HomeCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
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
} from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import ErrorPage from './ErrorPage';
import { database, auth, storage } from '../config/firebase';
import 'firebase/firestore';

function WishList() {
  const { currentUser, setCurrentUser } = useAuth();
  const [wishListArray, setWishListArray] = useState([]);
  const [userList, setUserList] = useState([{}]);
  const navigation = useNavigation();

  useEffect(() => {
    const docRef = doc(database, `userProfiles/${currentUser.uid}`);
    getDoc(docRef)
      .then((doc) => {
        setWishListArray(doc.data().wishList ?? []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    Promise.all(
      wishListArray.map((uid) => {
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, [wishListArray]);

  const removeItem = (userHomeUid) => {
    const docRef = doc(database, `userProfiles/${currentUser.uid}`);
    const updatedWishList = wishListArray.filter((uid) => uid !== userHomeUid);
    console.log(updatedWishList);
    updateDoc(docRef, {
      wishList: updatedWishList,
    })
      .then(() => {
        alert('Removed from WishList');
        setWishListArray(updatedWishList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goToListingPage = (userHomeUid) => {
    console.log(userHomeUid);

    alert("Redirecting to ListingPage");
    navigation.navigate("ListingPage", {
      searchedUserUid: userHomeUid,
      fromWishList: true,
    });
  };
  console.log("userList------>>>", userList);
  return (
    <ScrollView>
      <LogoHeader />
      <Text style={styles.header}>My wishlist:</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {userList.map((userHome) => (
          <>
            <HomeCard key={userHome.uid} home={userHome}>
              <HomeCard.Image />
              <View style={styles.removeButtonContainer}>
                <TouchableOpacity
                  onPress={() => goToListingPage(userHome.uid)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>House info</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gotoButtonContainer}>
                <TouchableOpacity
                  onPress={() => removeItem(userHome.uid)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Remove</Text>
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

export default WishList;

const styles = StyleSheet.create({
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
  removeButtonContainer: {
    position: 'absolute',
    width: 100,
    bottom: 55,
    right: 10,
    marginRight: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(57,198,127,0.5)',
  },
  button: {
    padding: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gotoButtonContainer: {
    position: 'absolute',
    width: 100,
    bottom: 55,
    left: 10,
    marginRight: 15,
    borderRadius: 30,
    backgroundColor: 'rgba(57,198,127,0.5)',
  },
});
