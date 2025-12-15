import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Load test environment variables
dotenv.config({ path: '.env.test' });

let mongoServer: MongoMemoryServer | null = null;

export const connectTestDB = async () => {
  try {
    // Create in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Connect mongoose to in-memory database
    await mongoose.connect(mongoUri);

    console.log('✅ Test database connected');
  } catch (error) {
    console.error('❌ Test database connection failed:', error);
    throw error;
  }
};

export const clearTestDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const disconnectTestDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    if (mongoServer) {
      await mongoServer.stop();
      mongoServer = null;
    }

    console.log('✅ Test database disconnected');
  } catch (error) {
    console.error('❌ Test database disconnection failed:', error);
    throw error;
  }
};
