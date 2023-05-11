import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RateForm = () => {
  const [ratings, setRatings] = useState({
    cleanliness: 0,
    location: 0,
    communication: 0,
  });

  const [reviewsRating, setReviewsRating] = useState({
    cleanliness: [4.2],
    location: [4],
    communication: [4.5],
  });

  const handleRating = (category, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  const handleSubmit = () => {
    const newReviewsRating = {};
    for (const [category, rating] of Object.entries(ratings)) {
      newReviewsRating[category] = [...reviewsRating[category], rating];
    }
    setReviewsRating(newReviewsRating);
  };

  const handleClear = () => {
    setRatings({
      cleanliness: 0,
      location: 0,
      communication: 0,
    });
  };

  const calculateAverages = () => {
    const averages = {};
    for (const [category, ratings] of Object.entries(reviewsRating)) {
      const sum = ratings.reduce((acc, cur) => acc + cur, 0);
      const average = sum / ratings.length || 0;
      averages[category] = average;
    }
    return averages;
  };

  const averages = calculateAverages();

  return (
    <View>
      <Text style={styles.header}>Rate This Property</Text>

      <CategoryItem
        category="Cleanliness"
        rating={ratings.cleanliness}
        onRating={(rating) => handleRating("cleanliness", rating)}
      />
      <CategoryItem
        category="Location"
        rating={ratings.location}
        onRating={(rating) => handleRating("location", rating)}
      />
      <CategoryItem
        category="Communication"
        rating={ratings.communication}
        onRating={(rating) => handleRating("communication", rating)}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Clear" onPress={handleClear} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        {Object.entries(averages).map(([category, average]) => (
          <Text key={category} style={styles.category}>
            ⭐ {category}: {average.toFixed(1)} ⭐
          </Text>
        ))}
      </View>
    </View>
  );
};

const CategoryItem = ({ category, rating, onRating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {stars.map((star) => (
          <TouchableOpacity key={star} onPress={() => onRating(star)}>
            <Icon
              name={star <= rating ? "star" : "star-o"}
              size={20}
              color="#7bd060"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "Helvetica",
  },
  categoryContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#D7dfe4",
    borderRadius: 10,
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainerHover: {
    backgroundColor: "#8ef2a1",
    borderColor: "#999",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default RateForm;
