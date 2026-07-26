"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Workout_1 = __importDefault(require("../models/Workout"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing data
        await Promise.all([
            User_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            Activity_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
        ]);
        // Create users
        const users = await User_1.default.create([
            { name: 'Alicia Rivera', email: 'alicia@example.com' },
            { name: 'Miguel Santos', email: 'miguel@example.com' },
            { name: 'Sara Kim', email: 'sara@example.com' },
        ]);
        // Create teams
        const teams = await Team_1.default.create([
            { name: 'Team Red', members: [users[0]._id, users[1]._id] },
            { name: 'Team Blue', members: [users[2]._id] },
        ]);
        // Create workouts
        const workouts = await Workout_1.default.create([
            { title: 'Quick HIIT', description: '20-minute high intensity interval', durationMinutes: 20, creator: users[0]._id },
            { title: 'Morning Yoga', description: '30-minute mobility and breathing', durationMinutes: 30, creator: users[2]._id },
        ]);
        // Create activities
        const activities = await Activity_1.default.create([
            { user: users[0]._id, type: 'run', durationMinutes: 25, calories: 300 },
            { user: users[1]._id, type: 'bike', durationMinutes: 45, calories: 600 },
            { user: users[2]._id, type: 'yoga', durationMinutes: 30, calories: 150 },
        ]);
        // Create leaderboard
        await Leaderboard_1.default.create([
            { user: users[1]._id, score: 1200, rank: 1 },
            { user: users[0]._id, score: 900, rank: 2 },
            { user: users[2]._id, score: 600, rank: 3 },
        ]);
        console.log('Seeded users:', users.length);
        console.log('Seeded teams:', teams.length);
        console.log('Seeded workouts:', workouts.length);
        console.log('Seeded activities:', activities.length);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
