import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      Leaderboard.deleteMany({}),
    ]);

    // Create users
    const users = await User.create([
      { name: 'Alicia Rivera', email: 'alicia@example.com' },
      { name: 'Miguel Santos', email: 'miguel@example.com' },
      { name: 'Sara Kim', email: 'sara@example.com' },
    ]);

    // Create teams
    const teams = await Team.create([
      { name: 'Team Red', members: [users[0]._id, users[1]._id] },
      { name: 'Team Blue', members: [users[2]._id] },
    ]);

    // Create workouts
    const workouts = await Workout.create([
      { title: 'Quick HIIT', description: '20-minute high intensity interval', durationMinutes: 20, creator: users[0]._id },
      { title: 'Morning Yoga', description: '30-minute mobility and breathing', durationMinutes: 30, creator: users[2]._id },
    ]);

    // Create activities
    const activities = await Activity.create([
      { user: users[0]._id, type: 'run', durationMinutes: 25, calories: 300 },
      { user: users[1]._id, type: 'bike', durationMinutes: 45, calories: 600 },
      { user: users[2]._id, type: 'yoga', durationMinutes: 30, calories: 150 },
    ]);

    // Create leaderboard
    await Leaderboard.create([
      { user: users[1]._id, score: 1200, rank: 1 },
      { user: users[0]._id, score: 900, rank: 2 },
      { user: users[2]._id, score: 600, rank: 3 },
    ]);

    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded workouts:', workouts.length);
    console.log('Seeded activities:', activities.length);

    console.log('Database seeding complete');
    // If running in short-lived seed mode, disconnect. If we're running in-memory for dev,
    // keep the connection open so the server can reuse it (MONGODB_MEMORY=1).
    if (process.env.MONGODB_MEMORY !== '1') {
      await mongoose.disconnect();
    } else {
      console.log('Keeping mongoose connection open for in-memory dev');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
