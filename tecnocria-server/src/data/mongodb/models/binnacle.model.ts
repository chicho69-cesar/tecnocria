/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema } from 'mongoose'

const binnacleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    progress: {
      type: Number,
      required: [true, 'Progress is required']
    },
    parents: {
      type: [Schema.Types.ObjectId],
      ref: 'Parent'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    toObject: { virtuals: true }
  }
)

binnacleSchema.methods.toJSON = function () {
  const { __v, _id, ...binnacle } = this.toObject()
  binnacle.id = _id
  return binnacle
}

export const BinnacleModel = mongoose.model('Binnacle', binnacleSchema)
