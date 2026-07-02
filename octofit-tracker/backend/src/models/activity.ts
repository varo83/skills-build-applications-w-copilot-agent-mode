import { Schema, model, type Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  durationMinutes: number;
  userId: string;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export const Activity = model<IActivity>('Activity', activitySchema);
