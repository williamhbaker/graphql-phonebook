import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import User from './userModel';

const MONGODB_URI = 'mongodb://localhost/phonebook';
const JWT_SECRET = process.env.JWT_SECRET;
const USER_PASSWORD = process.env.USER_PASSWORD;

const establishConnection = async () => {
  if (mongoose.connection.readyState === 1) return;

  console.log('connecting to', MONGODB_URI);

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('connected to MongoDB');
  } catch (error) {
    console.log('error connection to MongoDB:', error.message);
  }
};

export const getFirstUser = async () => {
  await establishConnection();
  return await User.findOne({});
};

export const createUser = async (data) => {
  await establishConnection();
  const user = new User({ ...data });
  return await user.save().catch((err) => console.log(err.message));
};

export const login = async ({ username, password }) => {
  await establishConnection();
  const user = await User.findOne({ username });

  if (!user || password !== USER_PASSWORD) {
    console.log('invalid credentials');
    return false;
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return { value: jwt.sign(userForToken, JWT_SECRET) };
};

export const getCurrentUser = async ({ req }) => {
  const auth = req ? req.headers.authorization : null;

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id).populate(
      'friends'
    );
    return { currentUser };
  }

  return { currentUser: null };
};
