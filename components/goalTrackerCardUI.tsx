import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function GoalTrackerCardUI({
  weeklyGoal = 5,
  completed = 3,
}: {
  weeklyGoal?: number;
  completed?: number;
}) {
  const pct = Math.min(1, completed / weeklyGoal);

  return (
    <View style={[tw.card, { flex: 1 }]}>
      <Text style={tw.title}>Goal Tracker</Text>
      <Text style={{ marginTop: 6, color: "#555" }}>
        {completed} / {weeklyGoal} workouts this week
      </Text>

      <View style={tw.progressTrack}>
        <View style={[tw.progressFill, { width: `${pct * 100}%` }]} />
      </View>

      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <Pressable style={[tw.btn, tw.secondary, tw.disabledBtn]}>
          <Text style={tw.secondaryText}>Edit Goal</Text>
        </Pressable>
      </View>
    </View>
  );
}

const tw = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "700" },
  progressTrack: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6b5cff",
    borderRadius: 8,
  },
  btn: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12 },
  primary: { backgroundColor: "#6b5cff" },
  secondary: { backgroundColor: "#e7e7ff" },
  btnText: { color: "#fff", fontWeight: "700" },
  secondaryText: { color: "#3a36a5" },
  disabledBtn: { opacity: 0.6 },
});
