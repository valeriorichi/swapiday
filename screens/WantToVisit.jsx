import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

const WantToVisit = () => {
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);

  const handleAddCity = () => {
    setCityList([...cityList, city]);
    setCity("");
  };

  const handleDeleteCity = (index) => {
    const newList = [...cityList];
    newList.splice(index, 1);
    setCityList(newList);
  };

  const cityListItems = cityList.map((city, index) => (
    <View key={index} style={styles.cityListItem}>
      <Text style={styles.cityText}>{city}</Text>
      <Button title="Remove" onPress={() => handleDeleteCity(index)} />
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Places I Want To Visit</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter city name"
        />
        <Button title="Add City" onPress={handleAddCity} />
      </View>
      <View style={styles.cityListContainer}>
        <Text style={styles.heading}>My Wish List:</Text>
        {cityListItems}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
  },
  cityListContainer: {
    marginTop: 20,
  },
  cityListItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  cityText: {
    flex: 1,
    marginRight: 10,
  },
});

export default WantToVisit;
