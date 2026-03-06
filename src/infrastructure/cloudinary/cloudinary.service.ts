import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { UploadApiResponse } from 'cloudinary'

@Injectable()
export class CloudinaryService {

  async uploadVideo(file: Express.Multer.File): Promise<UploadApiResponse> {

    return new Promise((resolve, reject) => {

      cloudinary.uploader.upload_stream(
        {
          resource_type: 'video'
        },
        (error, result) => {

          if (error) {
            reject(error)
          } else {
            resolve(result as UploadApiResponse)
          }

        }
      ).end(file.buffer)

    })

  }

}