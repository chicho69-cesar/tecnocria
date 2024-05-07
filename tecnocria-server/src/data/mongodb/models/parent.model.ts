/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema } from 'mongoose'

const parentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required']
    },
    age: {
      type: Number,
      required: [true, 'Age is required']
    },
    image: {
      type: String
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

parentSchema.methods.toJSON = function () {
  const { __v, _id, ...parent } = this.toObject()
  parent.id = _id
  return parent
}

export const ParentModel = mongoose.model('Parent', parentSchema)
