import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TasksList({ tasks, onToggle, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "completed") return task.completed;
    if (activeTab === "uncompleted") return !task.completed;
    return true; // all
  });

const renderItem = ({ item }) => (
  <TouchableOpacity
    style={[styles.taskItem, item.completed && styles.completedTask]}
    onPress={() => onToggle(item.id)}
  >
    {/* Completion Circle */}
    <View style={[styles.circle, item.completed && styles.circleCompleted]}>
      {item.completed && <View style={styles.circleFill} />}
    </View>
    
    {/* Task Content */}
    <View style={styles.taskContent}>
      <Text style={[
        styles.taskTitle, 
        item.completed && styles.taskTitleCompleted
      ]}>
        {item.title}
      </Text>
      {item.description ? (
        <Text style={styles.taskDescription}>{item.description}</Text>
      ) : null}
    </View>
    
    {/* Action Buttons */}
    <View style={styles.actionButtons}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => onEdit(item.id)}
      >
        <Text style={styles.editButton}>✏️</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {["all", "completed", "uncompleted"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {filteredTasks.length === 0 ? (
        <Text style={styles.emptyText}>No tasks in this category.</Text>
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          <LinearGradient
            colors={["transparent", "#fff"]}
            style={styles.fadeTop}
            pointerEvents="none"
          />
          <LinearGradient
            colors={["#fff", "transparent"]}
            style={styles.fadeBottom}
            pointerEvents="none"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    borderRadius: 20
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
},
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    color: "#333",
    fontSize: 14,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedTask: {
    opacity: 0.7,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  circleCompleted: {
    backgroundColor: '#white',
  },
  circleFill: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
  },
  taskContent: {
    flex: 1,
    minWidth: 0, // Allows text to shrink and wrap
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    flexWrap: 'wrap', // Allows text to wrap to next line
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    flexShrink: 0, // Prevents buttons from shrinking
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  editButton: {
    fontSize: 16,
  },
  deleteButton: {
    fontSize: 16,
  },

});
