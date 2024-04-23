import mongoose from 'mongoose'

interface Options {
  mongoUrl: string
  databaseName: string
}

export class MongoDatabase {
  public static async connect(options: Options): Promise<void> {
    const { databaseName, mongoUrl } = options

    try {
      await mongoose.connect(mongoUrl, { dbName: databaseName })
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB', error)
      throw error
    }
  }
}
