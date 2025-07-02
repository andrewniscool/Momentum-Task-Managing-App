Momentum is a simple task manager built with React Native and Expo. Users can add tasks, mark them as complete, and delete them with intuitive visual feedback. The app uses local component state to track task data.

Features:
- Add tasks with optional description
- Mark tasks complete or imcomplete by tapping the card
- Edit or delete tasks with action buttons
- Search bar to find tasks by title or description
- Tabs to filter tasks based on complete, incomplete, or all
- Progress bar to show completion of tasks
- Info modal explaining how to use the app

Getting Started

1. Clone the repository

git clone 
cd 

2. Install the needed dependencies: run this in your terminal

npm install

also make sure you have node.js installed.

3. Run the app: use this command to run the app

npx expo start

After running the app, use your phone to scan the QR code with the Expo Go app (Android) or the Camera app (iOS).



Using Momentum

- Add a Task: Tap the + button in the top right to open the add task modal. Enter a title and (optional) description.
- Mark Complete: Tap anywhere on a task card (except the icons) to toggle completion. Completed tasks are crossed out.
- Edit Task: Tap the ✏️ icon.
- Delete Task: Tap the 🗑️ icon.
- View Tabs: Switch between All, Completed, and Incomplete.
- Search: Use the search bar to filter tasks by keyword.
- Info: Tap the i button in the bottom right to see usage instructions.


This app uses the following libraries: 
- **expo** (~53.0.15): Core Expo SDK.
- **expo-linear-gradient** (^14.1.5): Adds gradient components.
- **react** (19.0.0): React framework.
- **react-native** (0.79.4): React Native core.
