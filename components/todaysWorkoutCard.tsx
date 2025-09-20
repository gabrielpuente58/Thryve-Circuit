import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  title?: string;
  name?: string;
  rounds?: number;
  estMinutes?: number;
  style?: ViewStyle;
};

export default function TodaysWorkoutCardUI({
  title = "Today’s Workout",
  name = "Workout of the Day",
  rounds = 3,
  estMinutes = 18,
  style,
}: Props) {
  const router = useRouter();

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.linkBtn}>
          <Text style={styles.linkText}>Suggest another</Text>
        </View>
      </View>

      <Text style={styles.wodName}>{name}</Text>
      <Text style={styles.meta}>
        Rounds: {rounds} • Est: {estMinutes} min
      </Text>

      <View style={styles.actionsRow}>
        {/* Non-interactive buttons */}
        <View style={[styles.btn, styles.secondary]}>
          <Text style={[styles.btnText, styles.secondaryText]}>Customize</Text>
        </View>

        <View style={[styles.btn, styles.primary]}>
          <Pressable onPress={() => router.push("/workout-page")}>
            <Text style={styles.btnText}>Start Today’s Circuit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/* Optional: keep a skeleton purely for UI previews (also non-interactive) */
export function TodaysWorkoutSkeletonUI({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={[styles.skel, { width: 140, height: 18 }]} />
        <View style={[styles.skel, { width: 110, height: 14 }]} />
      </View>
      <View
        style={[styles.skel, { width: "70%", height: 16, marginTop: 10 }]}
      />
      <View style={[styles.skel, { width: "45%", height: 14, marginTop: 8 }]} />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 16,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={[styles.skel, { width: 110, height: 40, borderRadius: 12 }]}
        />
        <View
          style={[styles.skel, { width: 180, height: 40, borderRadius: 12 }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

  // “Link” displayed as plain text (not pressable)
  linkBtn: { padding: 6 },
  linkText: { color: "#6b5cff", fontWeight: "600", opacity: 0.9 },

  wodName: { marginTop: 8, fontSize: 16, fontWeight: "600" },
  meta: { color: "#666", marginTop: 2 },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    justifyContent: "flex-end",
  },
  btn: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12 },
  primary: { backgroundColor: "#6b5cff" },
  secondary: { backgroundColor: "#e7e7ff" },
  btnText: { color: "#fff", fontWeight: "700" },
  secondaryText: { color: "#3a36a5" },

  // Skeleton blocks
  skel: { backgroundColor: "#eee", borderRadius: 8 },
});
