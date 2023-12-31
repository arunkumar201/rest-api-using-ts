import { NextFunction, Request, Response } from "express";

import fs from 'fs';
import path from 'path';

interface CustomRequest extends Request {
	timestamp?: number;
}

/**
 * Logs a message to the console along with the timestamp, request method, IP, and original URL.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @return {void} This function does not return a value.
 */


export function logger(req: CustomRequest, res: Response, next: NextFunction) {
  req.timestamp = Date.now();
  const logMessage = `${req.timestamp} :- ${req.method} || ${req.ip} || ${req.originalUrl}`;
console.log(logMessage);
	const logFolder = path.join('','log');
	console.log(__filename, logFolder);
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }

  const logFile = path.join(logFolder, 'logs.txt');
  fs.appendFileSync(logFile, logMessage + '\n');

  next();
}
