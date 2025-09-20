import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Button,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SessionHeader from "../components/sessionHeader";
import { WORKOUTS, type Step, type Workout } from "../data/workouts";

export default function WorkoutPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const workout: Workout = useMemo(
    () => WORKOUTS.find((w) => w.id === id) ?? WORKOUTS[0],
    [id]
  );

  const circuit: Step[] = workout?.steps ?? [];

  const [stepIndex, setStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(circuit[0]?.duration ?? 0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Reset session if workout changes
  useEffect(() => {
    setStepIndex(0);
    setSecondsLeft(circuit[0]?.duration ?? 0);
    setIsActive(false);
    setIsFinished(false);
  }, [workout, circuit]);

  // Timer
  useEffect(() => {
    if (!circuit.length) return;
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((p) => p - 1), 1000);
    } else if (isActive && secondsLeft === 0) {
      if (stepIndex < circuit.length - 1) {
        const next = stepIndex + 1;
        setStepIndex(next);
        setSecondsLeft(circuit[next].duration);
      } else {
        setIsActive(false);
        setIsFinished(true);
      }
    }
    return () => interval && clearInterval(interval);
  }, [isActive, secondsLeft, stepIndex, circuit]);

  const resetCircuit = () => {
    setStepIndex(0);
    setSecondsLeft(circuit[0]?.duration ?? 0);
    setIsActive(false);
    setIsFinished(false);
  };

  const confirmExit = useCallback(() => {
    const wasActive = isActive;
    if (wasActive) setIsActive(false);
    Alert.alert("Leave workout?", "Your current session will be lost.", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => wasActive && setIsActive(true),
      },
      { text: "Exit", style: "destructive", onPress: () => router.back() },
    ]);
  }, [isActive, router]);

  // Derived progress values
  const percentThroughCurrent = useMemo(() => {
    const dur = circuit[stepIndex]?.duration ?? 0;
    if (!dur) return 0;
    return (1 - secondsLeft / dur) * 100;
  }, [stepIndex, secondsLeft, circuit]);

  const totalRemaining = useMemo(() => {
    if (!circuit.length) return 0;
    const currentRemaining = secondsLeft;
    const rest = circuit
      .slice(stepIndex + 1)
      .reduce((sum, s) => sum + s.duration, 0);
    return currentRemaining + rest;
  }, [stepIndex, secondsLeft, circuit]);

  // Auto-scroll list
  const listRef = useRef<FlatList<Step> | null>(null);

  useEffect(() => {
    try {
      listRef.current?.scrollToIndex({
        index: stepIndex,
        viewPosition: 0.5,
        animated: true,
      });
    } catch {
      // ignore
    }
  }, [stepIndex]);

  const getItemLayout = (_: Step[] | null | undefined, index: number) => ({
    length: 68,
    offset: 68 * index,
    index,
  });

  const renderItem = ({ item, index }: ListRenderItemInfo<Step>) => {
    const isCurrent = index === stepIndex && !isFinished;
    const isDone =
      index < stepIndex || (isFinished && index === circuit.length - 1);
    const isUpcoming = index > stepIndex && !isFinished;

    const rowPct = isCurrent ? percentThroughCurrent : isDone ? 100 : 0;
    const rowRemaining = isCurrent
      ? `${secondsLeft}s left`
      : isDone
      ? "✓ done"
      : `${item.duration}s`;

    return (
      <View
        style={[
          styles.row,
          isCurrent && styles.rowCurrent,
          isDone && styles.rowDone,
        ]}
      >
        <View style={styles.rowHeader}>
          <Text style={[styles.rowLabel, isDone && styles.rowLabelDone]}>
            {item.label}
          </Text>
          <Text style={[styles.rowTime, isCurrent && styles.rowTimeCurrent]}>
            {rowRemaining}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${rowPct}%` }]} />
        </View>
        {isCurrent && <Text style={styles.nowTag}>Now</Text>}
        {isUpcoming && index === stepIndex + 1 && (
          <Text style={styles.nextTag}>Next</Text>
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SessionHeader
        title={workout?.name ?? "Circuit Session"}
        onBack={confirmExit}
      />
      <FlatList
        ListHeaderComponent={
          <View style={styles.topCard}>
            <Text style={styles.stepLabel}>
              {isFinished ? "Done!" : circuit[stepIndex]?.label ?? ""}
            </Text>
            <Text style={styles.timer}>
              {isFinished ? "🎉" : `${secondsLeft}s`}
            </Text>
            <View style={styles.controls}>
              <View style={styles.controlBtn}>
                <Button
                  title={isActive ? "Pause" : isFinished ? "Restart" : "Start"}
                  onPress={() => {
                    if (isFinished) {
                      resetCircuit();
                      setIsActive(true);
                    } else {
                      setIsActive((v) => !v);
                    }
                  }}
                />
              </View>
              <View style={styles.controlBtn}>
                <Button title="Reset" onPress={resetCircuit} />
              </View>
            </View>
            <Text style={styles.progressText}>
              Step {stepIndex + 1} of {circuit.length} • {totalRemaining}s left
            </Text>
          </View>
        }
        contentContainerStyle={styles.page}
        ref={listRef}
        data={circuit}
        keyExtractor={(item, i) => `${i}-${item.label}`}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, backgroundColor: "#f6f6f7", paddingBottom: 40 },
  topCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 14,
  },
  stepLabel: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2b2b2b",
    marginBottom: 8,
    textAlign: "center",
  },
  timer: { fontSize: 56, fontWeight: "800", color: "#333", marginVertical: 8 },
  controls: { flexDirection: "row", gap: 12, marginTop: 12 },
  controlBtn: { minWidth: 120 },
  progressText: { marginTop: 12, color: "#555", fontWeight: "600" },
  row: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  rowCurrent: { borderWidth: 2, borderColor: "#4f46e5" },
  rowDone: { opacity: 0.6 },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  rowLabel: { fontSize: 18, fontWeight: "700", color: "#1f2937" },
  rowLabelDone: { textDecorationLine: "line-through", color: "#6b7280" },
  rowTime: { fontSize: 14, fontWeight: "600", color: "#6b7280" },
  rowTimeCurrent: { color: "#111827" },
  progressTrack: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#4f46e5" },
  nowTag: {
    marginTop: 8,
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "700",
    color: "#4f46e5",
  },
  nextTag: {
    marginTop: 8,
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "700",
    color: "#065f46",
  },
});
