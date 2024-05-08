import { CustomError } from '../../../core/errors'
import { BinnacleModel, ParentModel } from '../../../data/mongodb'
import { Binnacle } from '../models'

export class BinnacleService {
  constructor() {}

  getBinnacles = async (userId: string) => {
    try {
      const binnacles = await BinnacleModel.find({ user: userId }).populate('user parents', 'name lastName username email role image')
      return binnacles
    } catch (error) {
      throw error
    }
  }

  getBinnacle = async (id: string, userId: string) => {
    try {
      const binnacle = await BinnacleModel.findOne({ _id: id }).populate('user parents', 'name lastName username email role image')

      if (!binnacle) {
        throw CustomError.notFound('Binnacle not found')
      }

      if (binnacle.user._id.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      return binnacle
    } catch (error) {
      throw error
    }
  }

  createBinnacle = async (binnacle: Binnacle, userId: string) => {
    try {
      const newBinnacle = new BinnacleModel({ ...binnacle, user: userId, parents: [] })

      await newBinnacle.save()
      await newBinnacle.populate('user parents', 'name lastName username email role image')

      return newBinnacle
    } catch (error) {
      throw error
    }
  }

  updateBinnacle = async (id: string, binnacle: Binnacle, userId: string) => {
    try {
      const binnacleExists = await BinnacleModel.findOne({ _id: id })

      if (!binnacleExists) {
        throw CustomError.notFound('Binnacle not found')
      }

      if (binnacleExists.user.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      const updatedBinnacle = await BinnacleModel.findOneAndUpdate({ _id: id }, binnacle, { new: true }).populate(
        'user parents',
        'name lastName username email role image'
      )

      if (!updatedBinnacle) {
        throw CustomError.notFound('Binnacle not found')
      }

      await updatedBinnacle.save()

      return updatedBinnacle
    } catch (error) {
      throw error
    }
  }

  deleteBinnacle = async (id: string, userId: string) => {
    try {
      const binnacle = await BinnacleModel.findOne({ _id: id })

      if (!binnacle) {
        throw CustomError.notFound('Binnacle not found')
      }

      if (binnacle.user.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      await BinnacleModel.deleteOne({ _id: id })

      return { message: 'Binnacle deleted successfully' }
    } catch (error) {
      throw error
    }
  }

  assignParent = async (id: string, parents: string[], userId: string) => {
    try {
      const binnacleExists = await BinnacleModel.findOne({ _id: id }).populate('user parents', 'name lastName username email role image')

      if (!binnacleExists) {
        throw CustomError.notFound('Binnacle not found')
      }

      if (binnacleExists.user._id.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      const existingParents = await ParentModel.find({ _id: { $in: parents } })
      const existingParentIds = existingParents.map((parent) => parent._id.toString())

      const newParents = existingParentIds.filter((parentId) => !binnacleExists.parents.some((parent) => parent._id.toString() === parentId))

      if (newParents.length > 0) {
        const validParents = await ParentModel.find({ _id: { $in: newParents }, user: userId })

        if (validParents.length !== newParents.length) {
          throw CustomError.forbidden('You are not allowed to access some of the parents')
        }

        await BinnacleModel.updateOne({ _id: id, user: userId }, { $push: { parents: { $each: validParents.map((parent) => parent._id) } } })
      }

      const binnacle = await BinnacleModel.findOne({ _id: id }).populate('user parents', 'name lastName username email role image')

      if (!binnacle) {
        throw CustomError.notFound('Binnacle not found')
      }

      return binnacle
    } catch (error) {
      throw error
    }
  }

  removeParent = async (id: string, parents: string[], userId: string) => {
    try {
      const binnacleExists = await BinnacleModel.findOne({ _id: id }).populate('user parents', 'name lastName username email role image')

      if (!binnacleExists) {
        throw CustomError.notFound('Binnacle not found')
      }

      if (binnacleExists.user._id.toString() !== userId) {
        throw CustomError.forbidden('You are not allowed to access this resource')
      }

      const existingParentIds = binnacleExists.parents.map((parent) => parent._id.toString())
      const parentsToRemove = existingParentIds.filter((parentId) => parents.includes(parentId))

      if (parentsToRemove.length > 0) {
        await BinnacleModel.updateOne({ _id: id, user: userId }, { $pullAll: { parents: parentsToRemove } })
      }

      const binnacle = await BinnacleModel.findOne({ _id: id }).populate('user parents', 'name lastName username email role image')

      if (!binnacle) {
        throw CustomError.notFound('Binnacle not found')
      }

      return binnacle
    } catch (error) {
      throw error
    }
  }
}
