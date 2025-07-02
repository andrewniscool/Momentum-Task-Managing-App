import React  from "react";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "./Progressbar";
import { EucalyptusTheme } from "./themes";

export default function TopBar({ onAdd, progress, completedTasks, totalTasks }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimMotto = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimMotto, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.titleContainer}>
          <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
            Momentum
          </Animated.Text>          
          <Animated.Text style={[styles.appMotto, { opacity: fadeAnimMotto }]}>
            Ready to be productive?
          </Animated.Text>          
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <Text style={styles.progressLabel}>Progress</Text>
        <ProgressBar progress={progress} />
        <View style={styles.progressStats}>
          <Text style={styles.progressText}>
            {completedTasks}/{totalTasks} Tasks Completed
          </Text> 
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  titleContainer: {
    flex: 1,
  },
  appName: {
    color: "#1a1a1a",
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 0,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,

  },
  appMotto: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 24,
  },
  progressBarContainer: {
    marginTop: 16,
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  progressText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
});
