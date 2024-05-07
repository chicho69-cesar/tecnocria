/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

export function uploadFile(files: any, folder = '', validExtensions = ['png', 'jpg', 'jpeg', 'gif']): Promise<{ path: string; name: string }> {
  return new Promise((resolve, reject) => {
    const { image } = files
    const nameSplitted = image.name.split('.')
    const extension = nameSplitted[nameSplitted.length - 1]

    if (!validExtensions.includes(extension)) {
      return reject(`The extension ${extension} is not a valid extension - ${validExtensions}`)
    }

    const tempName = uuidv4() + '.' + extension
    const uploadPath = path.join(process.cwd(), 'public', 'uploads', folder, tempName)

    image.mv(uploadPath, (err: any) => {
      if (err) {
        console.log(err)
        return reject(err)
      }

      resolve({
        path: uploadPath,
        name: tempName
      })
    })
  })
}
