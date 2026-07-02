import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
async function seed() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava.chen@example.com', role: 'captain' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
    { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', role: 'member' },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Ocean Runners',
      sport: 'running',
      members: [users[0].name, users[1].name],
    },
    {
      name: 'Harbor Cyclists',
      sport: 'cycling',
      members: [users[2].name],
    },
  ]);

  await Activity.insertMany([
    {
      type: 'run',
      durationMinutes: 35,
      userId: users[0].id,
      date: new Date('2026-07-01T06:30:00.000Z'),
    },
    {
      type: 'cycle',
      durationMinutes: 50,
      userId: users[1].id,
      date: new Date('2026-07-01T18:00:00.000Z'),
    },
    {
      type: 'strength',
      durationMinutes: 30,
      userId: users[2].id,
      date: new Date('2026-07-02T07:00:00.000Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { userId: users[0].id, score: 1320, rank: 1 },
    { userId: users[1].id, score: 1180, rank: 2 },
    { userId: users[2].id, score: 1100, rank: 3 },
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Mobility Flow',
      category: 'mobility',
      difficulty: 'beginner',
      durationMinutes: 20,
    },
    {
      title: 'Interval Sprint Circuit',
      category: 'cardio',
      difficulty: 'intermediate',
      durationMinutes: 30,
    },
    {
      title: 'Core Strength Builder',
      category: 'strength',
      difficulty: 'intermediate',
      durationMinutes: 25,
    },
  ]);

  console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, leaderboard entries, and workouts.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
