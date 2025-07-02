import React from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function AddTaskModal({ 
  visible, 
  onClose, 
  onSave, 
  editingTask = null // Add editingTask prop
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isFocused, setIsFocused] = React.useState({ title: false, description: false });

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  // Determine if we're editing or creating
  const isEditing = editingTask !== null;

  // Pre-populate fields when editing
  React.useEffect(() => {
    if (visible && editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
    } else if (visible && !editingTask) {
      // Reset for new task
      setTitle("");
      setDescription("");
    }
  }, [visible, editingTask]);

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);
      slideAnim.setValue(50);
    }
  }, [visible, fadeAnim, scaleAnim, slideAnim]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      if (!isEditing) {
        setTitle("");
        setDescription("");
      }
      setIsFocused({ title: false, description: false });
    }, 200);
  };

  const handleSave = () => {
    if (title.trim()) {
      if (isEditing) {
        // Call onSave with the task ID for editing
        onSave(editingTask.id, title.trim(), description.trim());
      } else {
        // Call onSave without ID for creating new task
        onSave(title.trim(), description.trim());
      }
      
      if (!isEditing) {
        setTitle("");
        setDescription("");
      }
      setIsFocused({ title: false, description: false });
    }
  };

  const isFormValid = title.trim().length > 0;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{isEditing ? "✏️" : "✨"}</Text>
              </View>
              <Text style={styles.title}>
                {isEditing ? "Edit Task" : "Create New Task"}
              </Text>
              <Text style={styles.subtitle}>
                {isEditing 
                  ? "Update your task details" 
                  : "Turn your ideas into actionable tasks"
                }
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Task Title</Text>
                <TextInput
                  placeholder="What needs to be done?"
                  placeholderTextColor="#A0A5BA"
                  style={[
                    styles.input,
                    isFocused.title && styles.inputFocused,
                    !isFormValid && title.length > 0 && styles.inputError,
                  ]}
                  value={title}
                  onChangeText={setTitle}
                  onFocus={() => setIsFocused((prev) => ({ ...prev, title: true }))}
                  onBlur={() => setIsFocused((prev) => ({ ...prev, title: false }))}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Description <Text style={styles.optional}>(optional)</Text>
                </Text>
                <TextInput
                  placeholder="Add more details about this task..."
                  placeholderTextColor="#A0A5BA"
                  style={[styles.input, styles.descriptionInput, isFocused.description && styles.inputFocused]}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  textAlignVertical="top"
                  onFocus={() => setIsFocused((prev) => ({ ...prev, description: true }))}
                  onBlur={() => setIsFocused((prev) => ({ ...prev, description: false }))}
                />
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity onPress={handleClose} style={styles.cancelButton} activeOpacity={0.7}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
                activeOpacity={0.8}
                disabled={!isFormValid}
              >
                <View style={styles.saveButtonContent}>
                  <Text style={[styles.saveText, !isFormValid && styles.saveTextDisabled]}>
                    {isEditing ? "Update Task" : "Create Task"}
                  </Text>
                  <Text style={styles.saveIcon}>→</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(8px)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    width: width - 40,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  optional: {
    fontWeight: "400",
    color: "#9CA3AF",
  },
  input: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#FAFAFA",
  },
  inputFocused: {
    borderColor: "#3B82F6",
    backgroundColor: "#FFFFFF",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  descriptionInput: {
    height: 80,
    paddingTop: 12,
  },
  actions: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
  },
  saveButton: {
    flex: 2,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: "#E5E7EB",
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  saveTextDisabled: {
    color: "#9CA3AF",
  },
  saveIcon: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 4,
  },
});