import path from 'node:path'
import fs from 'node:fs'

import { CustomError } from '../../../core/errors'
import { UserModel } from '../../../data/mongodb'
import { User } from '../models'
import { uploadFile } from '../../../core'

export class UsersService {
  constructor() {}

  editInfo = async (user: User, userId: string) => {
    try {
      const userExists = await UserModel.findOne({ _id: userId })

      if (!userExists) {
        throw CustomError.notFound('User not found')
      }

      if (userExists._id.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, user, { new: true })

      if (!updatedUser) {
        throw CustomError.notFound('User not found')
      }

      await updatedUser.save()

      return updatedUser
    } catch (error) {
      throw error
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadImage = async (userId: string, file: any) => {
    try {
      const user = await UserModel.findOne({ _id: userId })

      if (!user) {
        throw CustomError.notFound('User not found')
      }

      if (user._id.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      if (user.image) {
        const pathImage = path.join(process.cwd(), 'public', user.image)

        if (fs.existsSync(pathImage)) {
          fs.unlinkSync(pathImage)
        }
      }

      const { name } = await uploadFile(file, 'users')

      user.image = '/uploads/users/' + name
      await user.save()

      return user
    } catch (error) {
      throw error
    }
  }
}
