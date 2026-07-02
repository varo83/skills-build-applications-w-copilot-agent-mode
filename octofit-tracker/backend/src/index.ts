import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

const createResourceHandlers = (model: mongoose.Model<any>, _resourceName: string) => {
  const listHandler = async (_req: Request, res: Response) => {
    const records = await model.find().lean();
    res.json(records);
  };

  const createHandler = async (req: Request, res: Response) => {
    const record = await model.create(req.body);
    res.status(201).json(record);
  };

  return {
    listHandler,
    createHandler,
  };
};

const users = createResourceHandlers(User, 'users');
const teams = createResourceHandlers(Team, 'teams');
const activities = createResourceHandlers(Activity, 'activities');
const leaderboard = createResourceHandlers(LeaderboardEntry, 'leaderboard');
const workouts = createResourceHandlers(Workout, 'workouts');

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl, port });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl, port, codespaceName: codespaceName || null });
});

app.get(['/api/users', '/api/users/'], users.listHandler);
app.post(['/api/users', '/api/users/'], users.createHandler);
app.get(['/api/teams', '/api/teams/'], teams.listHandler);
app.post(['/api/teams', '/api/teams/'], teams.createHandler);
app.get(['/api/activities', '/api/activities/'], activities.listHandler);
app.post(['/api/activities', '/api/activities/'], activities.createHandler);
app.get(['/api/leaderboard', '/api/leaderboard/'], leaderboard.listHandler);
app.post(['/api/leaderboard', '/api/leaderboard/'], leaderboard.createHandler);
app.get(['/api/workouts', '/api/workouts/'], workouts.listHandler);
app.post(['/api/workouts', '/api/workouts/'], workouts.createHandler);

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running');
});

const seedData = async () => {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.create([
      { name: 'Ava', email: 'ava@example.com', role: 'captain' },
      { name: 'Noah', email: 'noah@example.com' },
    ]);
  }

  const teamCount = await Team.countDocuments();
  if (teamCount === 0) {
    await Team.create({ name: 'Ocean Runners', sport: 'running', members: ['Ava', 'Noah'] });
  }

  const activityCount = await Activity.countDocuments();
  if (activityCount === 0) {
    await Activity.create({ type: 'run', durationMinutes: 35, userId: 'Ava' });
  }

  const leaderboardCount = await LeaderboardEntry.countDocuments();
  if (leaderboardCount === 0) {
    await LeaderboardEntry.create({ userId: 'Ava', score: 1200, rank: 1 });
  }

  const workoutCount = await Workout.countDocuments();
  if (workoutCount === 0) {
    await Workout.create({ title: 'Core Blast', category: 'strength', difficulty: 'beginner', durationMinutes: 25 });
  }
};

mongoose
  .connect(mongoUri)
  .then(async () => {
    await seedData();
    console.log('Connected to MongoDB');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${apiUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
