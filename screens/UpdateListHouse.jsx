import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const UpdateListHouse = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [untilDate, setUntilDate] = useState(new Date());
  const [dateList, setDateList] = useState([]);

  const handleAddDate = () => {
    setDateList([...dateList, { from: fromDate, until: untilDate }]);
  };

  const handleDeleteDate = (index) => {
    const newList = [...dateList];
    newList.splice(index, 1);
    setDateList(newList);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const dateListItems = dateList.map((date, index) => (
    <View key={index} style={styles.dateListItem}>
      <Text style={styles.dateText}>From: {formatDate(date.from)}</Text>
      <Text style={styles.dateText}>Until: {formatDate(date.until)}</Text>
      <Button title="Delete" onPress={() => handleDeleteDate(index)} />
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Available Dates</Text>
      <View style={styles.dateContainer}>
        <DateTimePicker
          value={fromDate}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 1, 1)}
          onChange={(event, date) => setFromDate(date)}
        />
        <DateTimePicker
          value={untilDate}
          minimumDate={fromDate}
          maximumDate={new Date(2025, 1, 1)}
          onChange={(event, date) => setUntilDate(date)}
        />
      </View>
      <View style={styles.addButtonContainer}>
        <Button title="Add Date" onPress={handleAddDate} />
      </View>
      <View style={styles.dateListContainer}>
        <Text style={styles.heading}>Your Listed Dates:</Text>
        {dateListItems}
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
  addButtonContainer: {
    marginTop: 10,
  },
  dateListContainer: {
    marginTop: 20,
  },
  dateListItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  dateText: {
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UpdateListHouse;
