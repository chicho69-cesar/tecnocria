import { Bcrypt, JWT } from '../../../config'
import { CustomError } from '../../../core/errors'
import { TokenModel, UserModel } from '../../../data/mongodb'
import { Auth } from '../models'

export class AuthService {
  constructor() {}

  signUp = async (auth: Auth) => {
    try {
      const userExists = await UserModel.findOne({ email: auth.email })
      if (userExists) throw CustomError.badRequest('User already exists')

      const hashedPassword = Bcrypt.hash(auth.password)

      const user = new UserModel({
        name: auth.name,
        lastName: auth.lastName,
        username: auth.username,
        email: auth.email,
        password: hashedPassword,
        role: auth.role,
        image: auth.image
      })

      await user.save()

      const token = await JWT.generateToken({ id: user.id })
      if (!token) throw CustomError.internalServer()

      const tokenModel = new TokenModel({ token, user: user.id })
      await tokenModel.save()

      return { user, token }
    } catch (error) {
      throw error
    }
  }

  signIn = async (email: string, password: string) => {
    try {
      const user = await UserModel.findOne({ email })
      if (!user) throw CustomError.notFound('User not found with the email or password given')

      const passwordMatch = Bcrypt.compare(password, user.password)
      if (!passwordMatch) throw CustomError.unauthorized('Invalid email or password')

      const token = await JWT.generateToken({ id: user.id })

      await TokenModel.deleteMany({ user: user.id })
      const tokenModel = new TokenModel({ token, user: user.id })
      await tokenModel.save()

      return { user, token }
    } catch (error) {
      throw error
    }
  }
}
