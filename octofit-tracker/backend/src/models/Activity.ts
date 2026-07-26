import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
}

const ActivitySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
