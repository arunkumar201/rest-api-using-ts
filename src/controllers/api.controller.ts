import responseMessage from '../constants/responseMessage'
import { getApplicationHealth,getSystemHealth } from '../utils/getSystemHealth'
import { httpError } from '../utils/httpError.ts'
import { httpResponse } from '../utils/httpResponse'
import { NextFunction,Request,Response } from 'express'

export default {
	test: async (req: Request,res: Response,next: NextFunction) => {
		try {
			httpResponse(req,res,200,responseMessage.SUCCESS)
		} catch (err) {
			httpError(next,err,req,500)
		}
	},
	health: async (req: Request,res: Response,next: NextFunction) => {
		try {
			const healthData = {
				application: await getApplicationHealth(),
				system: await getSystemHealth(),
				timestamp: Date.now()
			}

			httpResponse(req,res,200,responseMessage.SUCCESS,healthData)
		} catch (err) {
			httpError(next,err,req,500)
		}
	}
}
