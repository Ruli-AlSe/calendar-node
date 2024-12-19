import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? '');

    console.log('DB online');
  } catch (error) {
    console.log(JSON.stringify(error));

    throw new Error('Error initializing DB');
  }
};
