import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";
import TopBar from "./components/topbar";
import TasksList from "./components/tasklist";
import AddTaskModal from "./components/AddTaskModal";
import SearchBar from "./components/Searchbar";
import { LinearGradient } from "expo-linear-gradient";
import NameModal from "./components/nameModal";

export default function App() {
  const [tasks, setTasks] = useState([
    {id: "1", title: "Welcome!", description: "Edit with the pencil icon, and delete with the trash icon. Click on the task itself to mark it as complete!", completed: false},
  ]);
  const [username, setUserName] = useState("User");
  const [showNameModal, setShowNameModal] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const filteredTasksBySearch = tasks.filter((task) => {
    const lowerSearch = searchText.toLowerCase();
    return (
      task.title.toLowerCase().includes(lowerSearch) ||
      (task.description && task.description.toLowerCase().includes(lowerSearch))
    );
  });

  const EucalyptusTheme = {
    gradient: ["#6EE7B7", "#93C5FD"], // Green to blue
  };
  const toggleInfoModal = () => {
    setInfoVisible(!infoVisible);
  };

  const handleAddTask = (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setShowModal(false);
  };

  const handleEditTask = (id, title, description) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, title, description } : task
      )
    );
    setShowModal(false);
    setEditingTask(null);
  };

  // Function to handle save (works for both create and edit)
  const handleSave = (...args) => {
    if (editingTask) {
      // Editing: args = [id, title, description]
      handleEditTask(...args);
    } else {
      // Creating: args = [title, description]
      handleAddTask(...args);
    }
  };

  // Function to open modal for editing
  const onEdit = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditingTask(taskToEdit);
    setShowModal(true);
  };

  // Function to open modal for creating new task
  const openAddTaskModal = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / totalTasks) * 100 : 0;

return (
  <LinearGradient
    colors={EucalyptusTheme.gradient}
    style={{ flex: 1 }}
  >
    <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
      <NameModal
        visible={showNameModal}
        onSubmit={(name) => {
          setUserName(name);
          setShowNameModal(false);
        }}
      />

      <TopBar
        progress={progress}
        completedTasks={completedCount}
        totalTasks={tasks.length}
        onAdd={openAddTaskModal}
        username={username}

      />
      <SearchBar
        searchText={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.listContainer}>
        <TasksList
          tasks={filteredTasksBySearch}
          onToggle={handleToggleTask}
          onEdit={onEdit}
          onDelete={handleDeleteTask}
        />
      </View>
      <AddTaskModal
        visible={showModal}
        onClose={closeModal}
        onSave={handleSave}
        editingTask={editingTask}
      />

      {/* Floating Info Button */}
      <TouchableOpacity style={styles.infoButton} onPress={toggleInfoModal} activeOpacity={0.7}>
        <Text style={styles.infoButtonText}>i</Text>
      </TouchableOpacity>

      {/* Info Modal */}
      <Modal
        transparent
        visible={infoVisible}
        animationType="fade"
        onRequestClose={toggleInfoModal}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={toggleInfoModal}
        >
          <TouchableOpacity style={styles.modalBubble} activeOpacity={1}>
            <Text style={styles.modalTitle}>About Momentum</Text>
            <Text style={styles.modalText}>
              Momentum helps you stay productive and organized. Create tasks, track your progress, and fuel your day with focused productivity.
            </Text>
            <Text style={styles.modalSubText}>
              • Add new tasks with the + button{'\n'}
              • Mark tasks complete by tapping the circle{'\n'}
              • Edit tasks by tapping on them{'\n'}
              • Delete tasks with the trash icon
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleInfoModal}>
              <Text style={styles.closeButtonText}>Got it!</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
     </SafeAreaView>
  </LinearGradient>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  infoButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "#3b82f6",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0.5,
    borderColor: "#60a5fa",
  },
  infoButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    fontStyle: "italic",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBubble: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 32,
    maxWidth: "90%",
    minWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  modalText: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  modalSubText: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: "400",
  },
  closeButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignSelf: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});