import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  image: {
    type: String
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['PROFESIONAL', 'USER'],
    default: 'USER'
  }
})

export const UserModel = mongoose.model('User', userSchema)
