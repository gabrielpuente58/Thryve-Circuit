import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FavoritesCardUI from "../components/favoritesCardUI";
import GoalTrackerCardUI from "../components/goalTrackerCardUI";
import TodaysWorkoutCardUI from "../components/todaysWorkoutCard";
import WeeklyCalendar from "../components/weeklyHeatmap";
import WelcomeHeader from "../components/welcomeHeader";

export default function Index() {
  return (
    <React.Fragment>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.page}>
        <View style={{ paddingHorizontal: 8, paddingTop: 45 }}>
          <WelcomeHeader name="User" />
        </View>

        {/* Weekly snapshot card */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.title}>This Week</Text>
            <View style={{ height: 8 }} />
            <View style={styles.row}>
              <View style={styles.statPill}>
                <Text style={styles.statBig}>3</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statBig}>92</Text>
                <Text style={styles.statLabel}>Mins</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statBig}>3 Day</Text>
                <Text style={styles.statLabel}>Streak</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weekly calendar */}
        <View style={styles.section}>
          <WeeklyCalendar
            workoutDates={["2025-09-14", "2025-09-17", "2025-09-19"]}
            weekStartsOn="Sun"
            title="Weekly Glance"
          />
        </View>

        {/* Today’s workout */}
        <View style={styles.section}>
          <TodaysWorkoutCardUI
            name="Full-Body Template"
            rounds={3}
            estMinutes={18}
          />
        </View>

        {/* Goals + Favorites */}
        <View style={styles.twoUpRow}>
          <GoalTrackerCardUI weeklyGoal={5} completed={3} />
          <FavoritesCardUI />
        </View>

        {/* Bottom nav */}
        {/* Eventually change these to icons */}
        <View style={[styles.section, { marginBottom: 24 }]}>
          <View style={styles.bottomNav}>
            <Text style={styles.navItem}>Home</Text>
            <Text style={styles.navItem}>Workouts</Text>
            <Text style={styles.navItem}>Progress</Text>
            <Text style={styles.navItem}>Settings</Text>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 16,
    gap: "4%",
    backgroundColor: "#f6f6f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingTop: 45,
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  welcomeText: { fontSize: 20, fontWeight: "600", color: "#333" },

  section: {},

  // Card
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

  // Stats
  row: { flexDirection: "row", gap: 10, marginTop: 12 },
  statPill: {
    flex: 1,
    backgroundColor: "#f0f0ff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statBig: { fontSize: 18, fontWeight: "800", color: "#2b2b2b" },
  statLabel: { color: "#555", marginTop: 2 },

  // Two-up layout
  twoUpRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },

  // Bottom nav
  bottomNav: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  navItem: { fontWeight: "700", color: "#333" },
});
