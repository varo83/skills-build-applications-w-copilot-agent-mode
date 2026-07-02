import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
}, { timestamps: true });

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
