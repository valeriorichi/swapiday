import * as React from "react";
import { Searchbar, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, StyleSheet } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";

function Search() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const [showDropDown, setShowDropDown] = useState(false);
  const [beds, setBeds] = useState("");

  const bedList = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },

    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6+",
    },
  ];

  return (
    <View
      style={{
        justifyContent: "space-between",
        height: "90%",
        width: "80%",
        marginLeft: "10%",
        marginTop: "10%",
      }}
    >
      <View>
        <Searchbar
          placeholder="Search Destinations"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DateTimePicker
          value={new Date()}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 1, 1)}
        ></DateTimePicker>
        <DateTimePicker
          value={new Date()}
          //works on last day of month
          minimumDate={new Date(new Date().valueOf() + 1000 * 3600 * 24)}
          maximumDate={new Date(2025, 1, 1)}
        ></DateTimePicker>
      </View>
      <View>
        <DropDown
          label={"Beds"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={beds}
          setValue={setBeds}
          list={bedList}
        />
        <View style={styles.spacerStyle} />
      </View>
      <View>
        <Button
          icon="magnify"
          mode="contained"
          buttonColor="#39C67F"
          onPress={() => console.log("Pressed")}
        >
          Search
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

export default Search;
