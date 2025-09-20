import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  /** ISO dates to highlight as workout days, e.g. ["2025-09-14","2025-09-16"] */
  workoutDates?: string[];
  /** "Sun" | "Mon" — which day the week starts on (default "Sun") */
  weekStartsOn?: "Sun" | "Mon";
  /** Optional title above the calendar */
  title?: string;
  /** Optional tap handler if you want to open a detail/log view */
  onDayPress?: (isoDate: string) => void;
};

const DAY_LABELS_SUN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABELS_MON = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfThisWeek(today: Date, weekStartsOn: "Sun" | "Mon") {
  const dow = today.getDay(); // 0 Sun .. 6 Sat
  const shift = weekStartsOn === "Sun" ? dow : (dow + 6) % 7; // Mon=0..Sun=6
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  start.setDate(today.getDate() - shift);
  return start;
}

export default function WeeklyCalendar({
  workoutDates = [],
  weekStartsOn = "Sun",
  title = "This Week",
  onDayPress,
}: Props) {
  const workoutSet = useMemo(() => new Set(workoutDates), [workoutDates]);
  const labels = weekStartsOn === "Sun" ? DAY_LABELS_SUN : DAY_LABELS_MON;

  const days = useMemo(() => {
    const today = new Date();
    const start = startOfThisWeek(today, weekStartsOn);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = toISODate(d);
      return {
        date: d,
        iso,
        isToday: toISODate(today) === iso,
        isWorkout: workoutSet.has(iso),
      };
    });
  }, [weekStartsOn, workoutSet]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        {days.map((day, idx) => {
          const content = (
            <View
              style={[
                styles.dayCell,
                day.isWorkout && styles.dayCellWorkout,
                day.isToday && styles.todayRing,
              ]}
            >
              <Text style={styles.dayLabel}>{labels[idx]}</Text>
              <Text
                style={[styles.dayNumber, day.isWorkout && styles.dayNumberOn]}
              >
                {day.date.getDate()}
              </Text>
            </View>
          );

          if (!onDayPress) {
            return (
              <View
                key={day.iso}
                style={styles.cellWrap}
                accessible
                accessibilityLabel={`${labels[idx]} ${day.iso}${
                  day.isWorkout ? " workout logged" : ""
                }${day.isToday ? " (today)" : ""}`}
              >
                {content}
              </View>
            );
          }

          return (
            <Pressable
              key={day.iso}
              style={styles.cellWrap}
              onPress={() => onDayPress(day.iso)}
              android_ripple={{ borderless: true }}
              accessibilityRole="button"
              accessibilityLabel={`${labels[idx]} ${day.iso}${
                day.isWorkout ? " workout logged" : ""
              }${day.isToday ? " (today)" : ""}`}
            >
              {content}
            </Pressable>
          );
        })}
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
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  cellWrap: { flex: 1, alignItems: "center" },
  dayCell: {
    width: 42,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#ECECF6",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  dayCellWorkout: {
    backgroundColor: "#b3acf5ff",
  },
  dayLabel: { fontSize: 12, color: "#666", fontWeight: "600" },
  dayNumber: { fontSize: 16, fontWeight: "800", color: "#2b2b2b" },
  dayNumberOn: { color: "#fff" },
  todayRing: {
    borderWidth: 2,
    borderColor: "#3A36A5",
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    flexWrap: "wrap",
  },
  legendDot: { width: 14, height: 14, borderRadius: 7 },
  legendRing: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#3A36A5",
  },
  legendText: { fontSize: 12, color: "#666", marginRight: 8 },
});
