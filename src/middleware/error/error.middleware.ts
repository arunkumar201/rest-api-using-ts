import {
	StatusCodes,
} from 'http-status-codes';
export class AppError extends Error{
	public readonly name: string;
	public readonly httpCode: StatusCodes;
	public readonly isOperational: boolean;

	
	constructor(name: string,httpCode: StatusCodes,description: string,isOperational: boolean) {
		
		super(description)
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name;
		this.httpCode = httpCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this);
	}
}


// const productToAdd = undefined;
//usage 
// if (!productToAdd) {
//   throw new AppError(ReasonPhrases.NO_CONTENT, StatusCodes.NOT_FOUND, 'Due to the Invalid product Info or Validation Error', true); 
// }
