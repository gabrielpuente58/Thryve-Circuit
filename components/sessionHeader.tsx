// components/SessionHeader.tsx
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string;
  onBack: () => void;
};

export default function SessionHeader({ title = "Workout", onBack }: Props) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onBack} style={styles.backBtn} hitSlop={10}>
        <Feather name="chevron-left" size={24} color="#222" />
        <Text style={styles.backText}>Back</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 60 }} />
      {/* spacer to balance layout */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 55,
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f6f6f7",
  },
  backBtn: { flexDirection: "row", alignItems: "center" },
  backText: { marginLeft: 2, fontSize: 16, fontWeight: "600", color: "#222" },
  title: { fontSize: 18, fontWeight: "700", color: "#222" },
});
