import path from 'node:path'
import fs from 'node:fs'

import { uploadFile } from '../../../core'
import { CustomError } from '../../../core/errors'
import { ParentModel } from '../../../data/mongodb'
import { Parent } from '../models'

export class ParentsService {
  constructor() {}

  getParents = async (userId: string) => {
    try {
      const parents = await ParentModel.find({ user: userId }).populate('user', 'name lastName username email role image')
      return parents
    } catch (error) {
      throw error
    }
  }

  getParent = async (id: string, userId: string) => {
    try {
      const parent = await ParentModel.findOne({ _id: id }).populate('user', 'name lastName username email role image')

      if (!parent) {
        throw CustomError.notFound('Parent not found')
      }

      if (parent.user._id.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      return parent
    } catch (error) {
      throw error
    }
  }

  createParent = async (parent: Parent, userId: string) => {
    try {
      const newParent = new ParentModel({ ...parent, user: userId })

      await newParent.save()
      await newParent.populate('user', 'name lastName username email role image')

      return newParent
    } catch (error) {
      throw error
    }
  }

  updateParent = async (id: string, parent: Parent, userId: string) => {
    try {
      const parentExists = await ParentModel.findOne({ _id: id })

      if (!parentExists) {
        throw CustomError.notFound('Parent not found')
      }

      if (parentExists.user.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      const updatedParent = await ParentModel.findOneAndUpdate({ _id: id }, parent, { new: true }).populate(
        'user',
        'name lastName username email role image'
      )

      if (!updatedParent) {
        throw CustomError.notFound('Parent not found')
      }

      await updatedParent.save()

      return updatedParent
    } catch (error) {
      throw error
    }
  }

  deleteParent = async (id: string, userId: string) => {
    try {
      const parent = await ParentModel.findOne({ _id: id })

      if (!parent) {
        throw CustomError.notFound('Parent not found')
      }

      if (parent.user.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      await ParentModel.deleteOne({ _id: id })

      return { message: 'Parent deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadImage = async (id: string, userId: string, file: any) => {
    try {
      const parent = await ParentModel.findOne({ _id: id })

      if (!parent) {
        throw CustomError.notFound('Parent not found')
      }

      if (parent.user.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      if (parent.image) {
        const pathImage = path.join(process.cwd(), 'public', parent.image)

        if (fs.existsSync(pathImage)) {
          fs.unlinkSync(pathImage)
        }
      }

      const { name } = await uploadFile(file, 'parents')

      parent.image = '/uploads/parents/' + name
      await parent.save()

      await parent.populate('user', 'name lastName username email role image')

      return parent
    } catch (error) {
      throw error
    }
  }
}
