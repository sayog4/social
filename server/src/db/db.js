import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    console.log(`MONGO DB SERVER IS RUNNING ON -------- ${con.connection.host}`)
  } catch (err) {
    console.log(`ErrorDB----${err.message}`)
    process.exit(1)
  }
}

export default connectDB
