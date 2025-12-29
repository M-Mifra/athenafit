export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
  videoUrl?: string;
}

export interface WorkoutPhase {
  name: string;
  duration: string;
  description: string;
  exercises: Exercise[];
}

export interface TrainingProgram {
  id: string;
  name: string;
  focus: string;
  totalDuration: string;
  intensity: string;
  equipment: string[];
  phases: WorkoutPhase[];
  tips: string[];
  cooldownNotes: string;
}

export const TRAINING_PROGRAMS: Record<string, TrainingProgram[]> = {
  TRAIN: [
    {
      id: "strength-full-body",
      name: "Full Body Strength",
      focus: "Build strength and muscle",
      totalDuration: "45-60 min",
      intensity: "High (RPE 7-9)",
      equipment: ["Barbell", "Dumbbells", "Bench", "Pull-up bar"],
      phases: [
        {
          name: "Warm-Up",
          duration: "10 min",
          description: "Prepare joints and activate muscles",
          exercises: [
            { name: "Jumping Jacks", sets: 1, reps: "60 sec", rest: "0s" },
            { name: "Arm Circles", sets: 1, reps: "30 sec each direction", rest: "0s" },
            { name: "Bodyweight Squats", sets: 2, reps: "15", rest: "30s" },
            { name: "Hip Circles", sets: 1, reps: "10 each leg", rest: "0s" },
            { name: "Cat-Cow Stretch", sets: 1, reps: "10", rest: "0s" },
          ],
        },
        {
          name: "Primary Lifts",
          duration: "25 min",
          description: "Heavy compound movements for strength",
          exercises: [
            { name: "Barbell Back Squat", sets: 4, reps: "5", rest: "3 min", notes: "80-85% of 1RM" },
            { name: "Barbell Bench Press", sets: 4, reps: "5", rest: "3 min", notes: "80-85% of 1RM" },
            { name: "Barbell Deadlift", sets: 3, reps: "5", rest: "3 min", notes: "80% of 1RM" },
          ],
        },
        {
          name: "Accessory Work",
          duration: "15 min",
          description: "Support muscle development",
          exercises: [
            { name: "Dumbbell Rows", sets: 3, reps: "10 each arm", rest: "60s" },
            { name: "Overhead Press", sets: 3, reps: "8", rest: "90s" },
            { name: "Lunges", sets: 3, reps: "12 each leg", rest: "60s" },
            { name: "Plank Hold", sets: 3, reps: "45 sec", rest: "30s" },
          ],
        },
        {
          name: "Cool-Down",
          duration: "5 min",
          description: "Lower heart rate and stretch",
          exercises: [
            { name: "Static Quad Stretch", sets: 1, reps: "30 sec each", rest: "0s" },
            { name: "Hamstring Stretch", sets: 1, reps: "30 sec each", rest: "0s" },
            { name: "Chest Doorway Stretch", sets: 1, reps: "30 sec", rest: "0s" },
            { name: "Deep Breathing", sets: 1, reps: "10 breaths", rest: "0s" },
          ],
        },
      ],
      tips: [
        "Focus on form over weight",
        "Breathe out on exertion",
        "Stay hydrated throughout",
        "Stop if you feel sharp pain",
      ],
      cooldownNotes: "Foam roll any tight areas for 5-10 minutes post-workout",
    },
    {
      id: "hiit-cardio",
      name: "HIIT Cardio Blast",
      focus: "Cardiovascular endurance & fat burn",
      totalDuration: "30-40 min",
      intensity: "Very High (RPE 8-10)",
      equipment: ["None (Bodyweight)"],
      phases: [
        {
          name: "Dynamic Warm-Up",
          duration: "5 min",
          description: "Elevate heart rate gradually",
          exercises: [
            { name: "High Knees", sets: 1, reps: "45 sec", rest: "15s" },
            { name: "Butt Kicks", sets: 1, reps: "45 sec", rest: "15s" },
            { name: "Arm Swings", sets: 1, reps: "30 sec", rest: "0s" },
            { name: "Torso Twists", sets: 1, reps: "30 sec", rest: "0s" },
          ],
        },
        {
          name: "HIIT Circuit (4 Rounds)",
          duration: "20 min",
          description: "40 sec work / 20 sec rest per exercise",
          exercises: [
            { name: "Burpees", sets: 4, reps: "40 sec", rest: "20s", notes: "Modify: Step back instead of jump" },
            { name: "Mountain Climbers", sets: 4, reps: "40 sec", rest: "20s" },
            { name: "Jump Squats", sets: 4, reps: "40 sec", rest: "20s", notes: "Modify: Regular squats" },
            { name: "Push-Ups", sets: 4, reps: "40 sec", rest: "20s", notes: "Modify: Knee push-ups" },
            { name: "Plank Jacks", sets: 4, reps: "40 sec", rest: "20s" },
          ],
        },
        {
          name: "Finisher",
          duration: "5 min",
          description: "Final push",
          exercises: [
            { name: "Tabata Sprints (in place)", sets: 8, reps: "20 sec on / 10 sec off", rest: "10s" },
          ],
        },
        {
          name: "Cool-Down",
          duration: "5 min",
          description: "Bring heart rate down",
          exercises: [
            { name: "Walking in Place", sets: 1, reps: "2 min", rest: "0s" },
            { name: "Standing Forward Fold", sets: 1, reps: "45 sec", rest: "0s" },
            { name: "Child's Pose", sets: 1, reps: "60 sec", rest: "0s" },
          ],
        },
      ],
      tips: [
        "Push hard during work intervals",
        "Use modifications if needed",
        "Keep water nearby",
        "Don't skip the cool-down",
      ],
      cooldownNotes: "Light walking for 5 minutes helps clear lactate",
    },
  ],
  ACTIVE_RECOVERY: [
    {
      id: "mobility-flow",
      name: "Full Body Mobility Flow",
      focus: "Joint health & flexibility",
      totalDuration: "25-30 min",
      intensity: "Low (RPE 3-4)",
      equipment: ["Yoga mat", "Foam roller (optional)"],
      phases: [
        {
          name: "Joint Prep",
          duration: "5 min",
          description: "Wake up the joints",
          exercises: [
            { name: "Neck Circles", sets: 1, reps: "10 each direction", rest: "0s" },
            { name: "Shoulder Rolls", sets: 1, reps: "10 each direction", rest: "0s" },
            { name: "Wrist Circles", sets: 1, reps: "10 each direction", rest: "0s" },
            { name: "Hip CARs", sets: 1, reps: "5 each leg", rest: "0s", notes: "Controlled Articular Rotations" },
            { name: "Ankle Circles", sets: 1, reps: "10 each foot", rest: "0s" },
          ],
        },
        {
          name: "Movement Flow",
          duration: "15 min",
          description: "Gentle movement sequences",
          exercises: [
            { name: "Cat-Cow Flow", sets: 1, reps: "2 min continuous", rest: "0s" },
            { name: "World's Greatest Stretch", sets: 1, reps: "5 each side", rest: "0s" },
            { name: "90/90 Hip Switch", sets: 1, reps: "10 total", rest: "0s" },
            { name: "Thoracic Spine Rotations", sets: 1, reps: "10 each side", rest: "0s" },
            { name: "Downward Dog to Cobra Flow", sets: 1, reps: "10", rest: "0s" },
            { name: "Deep Squat Hold", sets: 3, reps: "30 sec", rest: "15s" },
          ],
        },
        {
          name: "Breathwork",
          duration: "5 min",
          description: "Parasympathetic activation",
          exercises: [
            { name: "Box Breathing", sets: 1, reps: "5 min", rest: "0s", notes: "4 sec inhale, 4 sec hold, 4 sec exhale, 4 sec hold" },
          ],
        },
      ],
      tips: [
        "Never force a stretch",
        "Move slowly and deliberately",
        "Focus on breathing",
        "This is NOT a workout - ease into it",
      ],
      cooldownNotes: "Consider 10 min foam rolling for any tight spots",
    },
    {
      id: "light-cardio",
      name: "Zone 2 Cardio Session",
      focus: "Aerobic base & recovery",
      totalDuration: "30-45 min",
      intensity: "Low-Moderate (RPE 4-5)",
      equipment: ["None - Walking/Cycling"],
      phases: [
        {
          name: "Warm-Up",
          duration: "5 min",
          description: "Gradually increase heart rate",
          exercises: [
            { name: "Easy Walking", sets: 1, reps: "5 min", rest: "0s", notes: "Conversational pace" },
          ],
        },
        {
          name: "Main Session",
          duration: "25-35 min",
          description: "Maintain Zone 2 heart rate (60-70% max HR)",
          exercises: [
            { name: "Brisk Walk or Light Jog", sets: 1, reps: "25-35 min", rest: "0s", notes: "HR: 120-140 BPM (approx). You should be able to hold a conversation." },
          ],
        },
        {
          name: "Cool-Down",
          duration: "5 min",
          description: "Gradual heart rate reduction",
          exercises: [
            { name: "Slow Walking", sets: 1, reps: "3 min", rest: "0s" },
            { name: "Standing Calf Stretch", sets: 1, reps: "30 sec each", rest: "0s" },
            { name: "Standing Quad Stretch", sets: 1, reps: "30 sec each", rest: "0s" },
          ],
        },
      ],
      tips: [
        "Use a heart rate monitor if available",
        "Don't push pace - recovery is the goal",
        "Outdoor walking is great for mental health too",
        "Stay hydrated",
      ],
      cooldownNotes: "Great time for podcast or audiobook",
    },
  ],
  REST: [
    {
      id: "rest-day-protocol",
      name: "Complete Rest Protocol",
      focus: "Systemic recovery & restoration",
      totalDuration: "Throughout day",
      intensity: "None (RPE 1-2)",
      equipment: ["None"],
      phases: [
        {
          name: "Morning",
          duration: "15-20 min",
          description: "Gentle wake-up routine",
          exercises: [
            { name: "Light Walk (optional)", sets: 1, reps: "10-15 min", rest: "0s", notes: "Outdoors for sunlight exposure, boosts circadian rhythm" },
            { name: "Gentle Stretching in Bed", sets: 1, reps: "5 min", rest: "0s" },
            { name: "Hydration", sets: 1, reps: "16 oz water", rest: "0s", notes: "Add lemon or electrolytes" },
          ],
        },
        {
          name: "Afternoon",
          duration: "20-30 min",
          description: "Mental & physical restoration",
          exercises: [
            { name: "NSDR (Non-Sleep Deep Rest)", sets: 1, reps: "20 min", rest: "0s", notes: "YouTube: 'NSDR Protocol' by Andrew Huberman" },
            { name: "OR Power Nap", sets: 1, reps: "20-30 min", rest: "0s", notes: "Set alarm, don't exceed 30 min" },
          ],
        },
        {
          name: "Evening",
          duration: "30 min",
          description: "Prepare for quality sleep",
          exercises: [
            { name: "Screen-Free Time", sets: 1, reps: "60 min before bed", rest: "0s", notes: "No phones, TV, computers" },
            { name: "Gentle Yoga or Stretching", sets: 1, reps: "10-15 min", rest: "0s" },
            { name: "Journaling or Reading", sets: 1, reps: "15 min", rest: "0s" },
            { name: "Magnesium Supplement", sets: 1, reps: "300-400mg", rest: "0s", notes: "Glycinate form preferred" },
          ],
        },
      ],
      tips: [
        "Rest is when your body adapts and grows stronger",
        "Quality sleep is non-negotiable",
        "Stay lightly active - avoid being sedentary all day",
        "Use this day for meal prep and nutrition focus",
      ],
      cooldownNotes: "Tomorrow, you'll come back stronger",
    },
    {
      id: "gentle-yoga",
      name: "Restorative Yoga",
      focus: "Deep relaxation & stress relief",
      totalDuration: "20-30 min",
      intensity: "Very Low (RPE 1-2)",
      equipment: ["Yoga mat", "Pillows/blankets"],
      phases: [
        {
          name: "Centering",
          duration: "3 min",
          description: "Settle into practice",
          exercises: [
            { name: "Seated Meditation", sets: 1, reps: "3 min", rest: "0s", notes: "Focus on breath" },
          ],
        },
        {
          name: "Restorative Poses",
          duration: "20 min",
          description: "Hold poses for deep relaxation",
          exercises: [
            { name: "Supported Child's Pose", sets: 1, reps: "3-5 min", rest: "0s", notes: "Use pillow under torso" },
            { name: "Supine Twist", sets: 1, reps: "2 min each side", rest: "0s" },
            { name: "Legs Up the Wall", sets: 1, reps: "5 min", rest: "0s", notes: "Great for circulation" },
            { name: "Supported Bridge", sets: 1, reps: "3 min", rest: "0s", notes: "Block or pillow under sacrum" },
            { name: "Savasana (Corpse Pose)", sets: 1, reps: "5 min", rest: "0s" },
          ],
        },
      ],
      tips: [
        "Use props liberally - comfort is key",
        "Dim lights or use candles",
        "Play soft ambient music",
        "Let go of any 'achieving' mindset",
      ],
      cooldownNotes: "Stay in savasana as long as you like",
    },
  ],
};

export function getRecommendedProgram(
  decision: "TRAIN" | "ACTIVE_RECOVERY" | "REST",
  constraints: {
    max_duration_minutes: number;
    recommended_location: string;
    max_intensity_percent: number;
  }
): TrainingProgram {
  const programs = TRAINING_PROGRAMS[decision];
  
  if (decision === "TRAIN") {
    if (constraints.max_intensity_percent < 70 || constraints.max_duration_minutes < 40) {
      return programs[1];
    }
    return programs[0];
  }
  
  if (decision === "ACTIVE_RECOVERY") {
    if (constraints.recommended_location === "home") {
      return programs[0];
    }
    return constraints.max_duration_minutes >= 30 ? programs[1] : programs[0];
  }
  
  return programs[0];
}

