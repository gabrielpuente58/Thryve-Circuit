# ThryveIQ-Circuit

ThryveIQ-Circuit is a simple circuit training app built with **Expo Router**.  
It allows users to browse workouts, start a timer-driven circuit, and customize rest times with live feedback.

---

## Features

- **Multi-screen navigation** with Expo Router:

  - **Home Screen** (dashboard overview)
  - **Workouts Screen** (list of available workouts)
  - **Workout Detail Screen** (timer + step list)

- **Data passing between screens**

  - Tapping a workout passes its `id` into the Workout Detail screen.

- **Timer-driven circuits**

  - Steps count down with `useState` and `useEffect`.
  - Auto-advances to the next step until finished.

- **User input**

  - **TextInput**: Adjust the duration for all Rest steps.
  - **Switch**: Toggle haptics on/off.

- **Feedback**

  - **Haptics** on each step change and completion.
  - **Alert** when leaving a workout.
  - **Progress bars** that show time remaining.
  - Celebration 🎉 when finished.

- **Extra Expo packages**
  - [`expo-haptics`](https://docs.expo.dev/versions/latest/sdk/haptics/) → Vibrations for feedback.
  - [`expo-keep-awake`](https://docs.expo.dev/versions/latest/sdk/keep-awake/) → Prevents screen from sleeping during a workout.

---

## Tech Used

- **Expo + Expo Router**
- **React Native Components**: View, Text, Button, FlatList, TextInput, Switch
- **React Hooks**: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`
- **TypeScript** for type safety

---

## Assignment Requirements Checklist

- [x] **Two screens or more using Expo Router**

  - Implemented with `(tabs)/index.tsx`, `(tabs)/workouts.tsx`, and `/workout-page.tsx`.

- [x] **Pass data between screens**

  - Workouts tab → passes `id` → WorkoutPage loads the correct workout.

- [x] **Use `useState` and `useEffect`**

  - Timer logic, reset, and haptics all rely on state and effects.

- [x] **At least one component (`View`, `Text`, `Button`)**

  - Uses multiple core components + extras (FlatList, TextInput, Switch).

- [x] **Include one form of input from the user**

  - TextInput for rest duration + Switch for haptics toggle.

- [x] **Give some sort of feedback**

  - Haptics on step changes + completion, Alerts, and visual progress bars.

- [x] **Utilize at least two extra Expo packages**
  - `expo-haptics` and `expo-keep-awake`.
