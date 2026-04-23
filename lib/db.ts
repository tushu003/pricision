import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var -- module cache
  var mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cache;
}

export async function connectDb(): Promise<typeof mongoose> {
  if (!MONGODB_URI && process.env.NODE_ENV === "production") {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local",
    );
  }

  if (cache.conn) {
    return cache.conn;
  }

  const uri = MONGODB_URI ?? "mongodb://127.0.0.1:27017/precision_dev";

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (e) {
    cache.promise = null;
    throw e;
  }

  return cache.conn;
}
