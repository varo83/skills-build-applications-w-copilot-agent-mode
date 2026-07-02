import { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, default: 'beginner' },
  durationMinutes: { type: Number, required: true },
}, { timestamps: true });

export const Workout = model<IWorkout>('Workout', workoutSchema);
