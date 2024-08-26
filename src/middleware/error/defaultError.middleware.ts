import { THttpError } from '@/types/HttpResponse';
import { NextFunction,Request,Response } from 'express';

// Assuming developers mark known operational errors with error.isOperational=true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
process.on('uncaughtException',(error: Error) => {
  console.log('We handle it here',JSON.stringify(error))
  //received an error that was never handled, time to handle it and then decide whether a restart is needed
  // errorManagement.handler.handleError(error);
  // if (!isCriticalError(err))
  // process.exit(1);


});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
process.on('unhandledRejection',(reason: string,p: Promise<any>) => {
  //  caught an unhandled promise rejection,
  // throw reason;
});

process.on('uncaughtException',(error: Error) => {
  console.log('We handle it here',JSON.stringify(error))
  //received an error that was never handled, time to handle it and then decide whether a restart is needed
  // errorManagement.handler.handleError(error);
  // if (!isCriticalError(err))
  //   process.exit(1);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const defaultErrorHandler = (err: THttpError,_: Request,res: Response,__: NextFunction): void => {
  const errStatus = err?.statusCode || 500;
  console.error(`Error occurred: ${JSON.stringify(err)}`);
  res.status(errStatus).json(err);
};


class ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async handleError(error: Error,responseStream: Response,next: NextFunction): Promise<void> {
  // await logger.logError(error);
  // await fireMonitoringMetric(error);
  // await crashIfUntrustedErrorOrSendResponse(error, responseStream);
  //  await sendMailToAdminIfCritical();
    // await saveInOpsQueueIfCritical();
    // await determineIfOperationalError();
    //We can do the error handling logic here 
    responseStream.status(500).json({ error: 'An unexpected error occurred.' });
  };
}


export const handler = new ErrorHandler();


// Usage
// Error handling middleware
// app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
//     handler.handleError(err, req)
// });
