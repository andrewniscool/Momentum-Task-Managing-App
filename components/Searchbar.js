import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons"; 
export default function SearchBar({ searchText, onChangeText }) {
  return (
    <View style={styles.container}>
      <Feather
        name="search" // magnifying glass
        size={20}
        color="#888"
        style={styles.icon}
      /> 
      <TextInput
        placeholder="Search tasks..."
        placeholderTextColor="#888" // Placeholder color
        value={searchText}
        onChangeText={onChangeText}
        style={styles.input}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    marginLeft: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#000", // Text color
  },
});
