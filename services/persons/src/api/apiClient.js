import mongoose from 'mongoose';

import Person from './personModel';

const MONGODB_URI = 'mongodb://localhost/phonebook';

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

export const peopleCount = async () => {
  await establishConnection();
  return await Person.collection
    .countDocuments()
    .catch((err) => console.log(err.message));
};

export const allPeople = async () => {
  await establishConnection();
  return await Person.find({}).catch((err) => console.log(err.message));
};

export const findPersonByName = async (name) => {
  await establishConnection();
  return await Person.findOne(
    { name }.catch((err) => console.log(err.message))
  );
};

export const findPersonById = async (_id) => {
  await establishConnection();
  return await Person.findOne({ _id }).catch((err) => console.log(err.message));
};

export const createPerson = async (data) => {
  await establishConnection();
  const person = new Person({ ...data });
  return await person.save().catch((err) => console.log(err.message));
};

export const editNumber = async ({ name, phone }) => {
  await establishConnection();
  const person = await Person.findOne({ name });

  if (person) {
    person.phone = phone;
    return await person.save().catch((err) => console.log(err.message));
  }

  return null;
};
