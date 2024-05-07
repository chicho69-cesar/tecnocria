import { IParent } from '../interfaces'

export class Parent {
  public name: string
  public lastName: string
  public relationship: string
  public age: number

  constructor(name: string, lastName: string, relationship: string, age: number) {
    this.name = name
    this.lastName = lastName
    this.relationship = relationship
    this.age = age
  }

  static createParent(body: IParent): Parent {
    const { name, lastName, relationship, age } = body
    return new Parent(name, lastName, relationship, age)
  }
}
