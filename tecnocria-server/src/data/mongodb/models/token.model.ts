/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema } from 'mongoose'

const tokenSchema = new Schema({
  token: {
    type: String,
    required: [true, 'Token is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
})

tokenSchema.methods.toJSON = function () {
  const { __v, _id, ...token } = this.toObject()
  token.id = _id
  return token
}

export const TokenModel = mongoose.model('Token', tokenSchema)
