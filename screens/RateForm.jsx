import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const RateForm = () => {
  const [ratings, setRatings] = useState({
    cleanliness: 0,
    location: 0,
    communication: 0,
  });

  const [reviewsRating, setReviewsRating] = useState({
    cleanliness: [],
    location: [],
    communication: [],
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
    console.log(newReviewsRating);
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
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Clear" onPress={handleClear} />
      </View>
      <View style={{ marginTop: 20 }}>
        {Object.entries(averages).map(([category, average]) => (
          <Text key={category}>
            {category}: {average.toFixed(1)}
          </Text>
        ))}
      </View>
    </View>
  );
};

const CategoryItem = ({ category, rating, onRating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Text style={{ marginLeft: 10, marginRight: 50 }}>{category}</Text>
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

export default RateForm;
