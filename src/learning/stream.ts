import fs from 'fs'

//Readable Stream

const readStream= fs.createReadStream('./test.txt','utf-8')
readStream.on("data",(chunk) => {
	console.log(chunk)
})
