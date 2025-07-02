import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

export default function SearchBar({ searchText, onChangeText }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search tasks..."
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
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
});
