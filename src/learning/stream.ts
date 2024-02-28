//Streaming in Nodejs 
import fs from 'fs';

export const getFileText = () => {
	const file_txt=fs.readFileSync("./sample.txt","utf8");
	return file_txt
}
