import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Types.ObjectId;
  score: number;
  rank?: number;
}

const LeaderboardSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number },
});

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
