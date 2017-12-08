import { MongoClient } from 'mongodb';

let mongoDB;

const MONGO_URL = 'mongodb://yuvannoah:homodeus@107.21.77.208/admin';

const initMongoClient = async () => {
  try {
    mongoDB = await MongoClient.connect(MONGO_URL);
  }
  catch (e) {
    console.error('cannot connect to db', e);
  }
  return mongoDB;
};


export const getMongoClient = async () => {
  if (!mongoDB) {
    await initMongoClient();
  }
  return mongoDB;
};