import { Request, Response } from "express";

import fs from 'fs'

export const getTextFile = async (req: Request,res: Response) => {
	
  try {
    // await uploadToS3(file);
    return res.status(200).send({
      message: 'File uploaded successfully'
    });

  } catch (err) {
    return res.status(500).send({
      message: 'Error uploading file',
      error: err
    });
  }
};


export const readFileUsingStream = async (req: Request,res: Response) => {
  let chunkCount = 0;
  try {
    const readStream = fs.createReadStream('./sample.txt',{
      highWaterMark: 30,
      encoding: "utf-8",
    })
    readStream.on("data",(chunk) => {
      if (chunkCount % 2 === 0) {
        readStream.pause();
        setTimeout(() => {
          readStream.resume();
        },20)
      }
      chunkCount++;
      console.log('chunk',chunk)
      res.write(chunk,() => {
        console.log('data sent to postman')
      });
    })
    readStream.on("end",() => {
      console.log("chunkCount",chunkCount)
      res.end()
    })

  } catch (error) {
    console.log("Error While Reading File",error)
    res.send({ error: "Error While Reading File" })
  }
}

export const writeFileUsingStream = async (req: Request,res: Response) => {
  try {
    const writeStream = fs.createWriteStream('./sample1.txt',{
      encoding: "utf-8",
      highWaterMark: 30
    })
    req.on('data', (chunk) => {
      writeStream.write(chunk);
    });
    req.on('end', () => {
      writeStream.end();
      res.send({ message: 'File has been written successfully' });
    });

       req.on('error', (error) => {
      console.log('Error While Reading File', error);
      res.send({ error: 'Error While Reading File' });
       });
  }
    catch (error) {
    console.log('Error While Writing File', error);
    res.send({ error: 'Error While Writing File' });
  }
};
