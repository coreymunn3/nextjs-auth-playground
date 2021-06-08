import { MongoClient } from 'mongodb';

export const connectDb = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://coreymunn:Sherm@n5@cluster0.kdjja.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );
  return client;
};
