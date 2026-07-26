import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  durationMinutes: number;
  creator?: Types.ObjectId;
  createdAt: Date;
}

const WorkoutSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
