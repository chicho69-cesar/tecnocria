/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },
    repliedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    toObject: { virtuals: true }
  }
)

const globalMessageSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },
    repliedTo: {
      type: Schema.Types.ObjectId,
      ref: 'GlobalMessage'
    }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    toObject: { virtuals: true }
  }
)

const hugBuddyMessageSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },
    isFromHugBuddy: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
    toObject: { virtuals: true }
  }
)

messageSchema.methods.toJSON = function () {
  const { __v, _id, ...message } = this.toObject()
  message.id = _id
  return message
}

globalMessageSchema.methods.toJSON = function () {
  const { __v, _id, ...message } = this.toObject()
  message.id = _id
  return message
}

hugBuddyMessageSchema.methods.toJSON = function () {
  const { __v, _id, ...message } = this.toObject()
  message.id = _id
  return message
}

export const MessageModel = mongoose.model('Message', messageSchema)
export const GlobalMessageModel = mongoose.model('GlobalMessage', globalMessageSchema)
export const HugBuddyMessageModel = mongoose.model('HugBuddyMessage', hugBuddyMessageSchema)
