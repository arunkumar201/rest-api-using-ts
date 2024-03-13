import { NextFunction, Request, Response } from 'express';

// Assuming developers mark known operational errors with error.isOperational=true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
process.on('uncaughtException',(error: Error) => {
  
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
    //  caught an unhandled promise rejection,
    throw reason;
});
  
process.on('uncaughtException', (error: Error) => {
    console.log('We handle it here', error)
    //received an error that was never handled, time to handle it and then decide whether a restart is needed
    // errorManagement.handler.handleError(error);
    // if (!isCriticalError(err))
    //   process.exit(1);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const defaultErrorHandler = (err: any, req: Request, res: Response):void => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};


class ErrorHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async handleError(error: Error, responseStream: Response,next:NextFunction): Promise<void> {
        // await logger.logError(error);
        // await fireMonitoringMetric(error);
      // await crashIfUntrustedErrorOrSendResponse(error, responseStream);
      //  await sendMailToAdminIfCritical();
    // await saveInOpsQueueIfCritical();
    // await determineIfOperationalError();
      //We can do the error handling logic here 
    };
}


export const handler = new ErrorHandler();


// Usage
// Error handling middleware
// app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
//     handler.handleError(err, req)
// });
