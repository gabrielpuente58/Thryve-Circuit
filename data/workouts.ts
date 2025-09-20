// data/workouts.ts
export type Step = { label: string; duration: number }; // seconds
export type Workout = { id: string; name: string; steps: Step[] };

export const WORKOUTS: Workout[] = [
  {
    id: "classic-circuit",
    name: "Classic Circuit",
    steps: [
      { label: "Push-ups", duration: 30 },
      { label: "Rest", duration: 15 },
      { label: "Squats", duration: 45 },
      { label: "Rest", duration: 15 },
      { label: "Plank", duration: 60 },
    ],
  },
];
