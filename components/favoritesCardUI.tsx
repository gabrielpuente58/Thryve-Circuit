import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FavoritesCardUI({
  items = [
    { id: "w1", name: "Upper Body Blast", mins: 20 },
    { id: "w2", name: "Leg Day Express", mins: 18 },
    { id: "w3", name: "Core Crusher", mins: 12 },
    { id: "w4", name: "Full-Body Ladder", mins: 22 },
  ],
}) {
  return (
    <View style={[tw.card, { flex: 1 }]}>
      <View style={tw.headerRow}>
        <Text style={tw.title}>Saved Workouts</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingTop: 10 }}
      >
        {items.map((w) => (
          <Pressable key={w.id} style={tw.workoutChip}>
            <Text style={tw.workoutChipTitle}>{w.name}</Text>
            <Text style={tw.workoutChipSub}>{w.mins} min</Text>
          </Pressable>
        ))}
      </ScrollView>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "700" },
  linkBtn: { padding: 6 },
  linkText: { color: "#6b5cff", fontWeight: "600" },
  workoutChip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#f7f7ff",
    borderWidth: 1,
    borderColor: "#e6e6ff",
    minWidth: 160,
  },
  workoutChipTitle: { fontWeight: "700", color: "#2b2b2b" },
  workoutChipSub: { marginTop: 2, color: "#666", fontSize: 12 },
  btn: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12 },
  primary: { backgroundColor: "#6b5cff" },
  secondary: { backgroundColor: "#e7e7ff" },
  btnText: { color: "#fff", fontWeight: "700" },
  secondaryText: { color: "#3a36a5" },
  disabledBtn: { opacity: 0.6 },
  disabledTap: { opacity: 0.6 },
  disabledText: { color: "#aaa" },
});
