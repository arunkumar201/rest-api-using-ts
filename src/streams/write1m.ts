
import fs from 'fs/promises';
import { createWriteStream } from 'fs';

//this implementation is not good - it might consume 100% cpu 
// might take up 10s to write 1 million lines
const write_1m_lines = async () => {
	console.time("start_read_1m_lines");
	//open the file 
	const fileHandle = await fs.open('./1m_lines.txt',"w");

	//write 1 million lines
	for (let i = 0; i < 1000000; i++) {
		fileHandle.write(`line ${i}\n`);
	}
	console.timeEnd("start_read_1m_lines");
	console.log('done');
	return;
}
write_1m_lines();

//took less than 1s to write 1 million lines 
console.log("----using streams----")
const write_1m_lines_streams = async () => {
	console.time("start_read_1m_lines");
	//open the file 
	const createWrite = createWriteStream('./1m_lines.txt');

	//write 1 million lines
	for (let i = 0; i < 1000000; i++) {
		createWrite.write(`line ${i}\n`);
	}
	createWrite.end();
	console.timeEnd("start_read_1m_lines");
	console.log('done');
	return;
}
write_1m_lines_streams();
