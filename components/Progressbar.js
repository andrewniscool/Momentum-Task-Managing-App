import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function ProgressBar({ progress }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedValue]);

  const widthInterpolated = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fill, { width: widthInterpolated }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 16,
    backgroundColor: "#e0f2e9", // pale green background
    borderRadius: 8,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#4CAF50", // soft green fill
  },
});
