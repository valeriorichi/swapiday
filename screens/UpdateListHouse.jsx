import React, { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { Calendar } from "react-native-calendars";

const UpdateListHouse = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    const newMarkedDates = { ...markedDates };
    if (startDate == null) {
      newMarkedDates[day.dateString] = { startingDay: true, color: "blue" };
      setStartDate(day);
      setMarkedDates(newMarkedDates);
    } else if (endDate == null && day.dateString > startDate.dateString) {
      let date = new Date(startDate.year, startDate.month - 1, startDate.day);
      while (date <= new Date(day.year, day.month - 1, day.day)) {
        newMarkedDates[date.toISOString().slice(0, 10)] = {
          color: "blue",
          textColor: "white",
        };
        date.setDate(date.getDate() + 1);
      }
      newMarkedDates[day.dateString] = { endingDay: true, color: "blue" };
      setEndDate(day);
      setMarkedDates(newMarkedDates);
    } else {
      setStartDate(day);
      setEndDate(null);
      setMarkedDates({
        [day.dateString]: { startingDay: true, color: "blue" },
      });
    }
  };

  return (
    <View>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        markingType={"period"}
      />
      <TextInput
        label="Start Date"
        value={startDate ? startDate.dateString : ""}
        editable={false}
      />
      <TextInput
        label="End Date"
        value={endDate ? endDate.dateString : ""}
        editable={false}
      />
    </View>
  );
};

export default UpdateListHouse;
