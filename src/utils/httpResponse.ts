import { Request,Response } from 'express'
import { EApplicationEnvironment } from '../constants/application'
import { THttpResponse } from '../types/HttpResponse'
import { ENVConfig } from '../config/env.config'
import Logger from './logger'
export const httpResponse = (req: Request,res: Response,responseStatusCode: number,responseMessage: string,data: unknown = null): void => {
	const response: THttpResponse = {
		success: true,
		statusCode: responseStatusCode,
		request: {
			ip: req.ip || null,
			method: req.method,
			url: req.originalUrl
		},
		message: responseMessage,
		data: data
	}

	// Log
	Logger.info(`CONTROLLER_RESPONSE`,{
		meta: response
	})

	if (ENVConfig.NODE_ENV === EApplicationEnvironment.PRODUCTION) {
		delete response.request.ip
	}

	res.status(responseStatusCode).json(response)
}
