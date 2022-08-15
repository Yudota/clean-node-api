import { Controller, HttpRequest } from '../../../presentation/protocols'
import { Request, Response } from 'express'

const successStatusCode = (statusCode: number): boolean => {
  return statusCode >= 200 && statusCode <= 299
}
export const adaptRoute = (controller: Controller): any => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (successStatusCode(httpResponse.statusCode)) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
