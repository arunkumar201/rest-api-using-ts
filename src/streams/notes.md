## Streams in Nodejs

Streams are the collections of data just like Arrays or strings.
Streams are the ways of handling the reading/writing files ,communications  or any kind of 
info exchange  between two entities in efficient manner .

what stream does?
streams allows us to read/write the large data/file into a chucks by chunks ,processing its content without 
keeping it all in memory

- this makes the streams more power full when we deals with large amount of data set.
eg. one video file can have 30gb of space which makes our server/machine impossible to read at once as 
machine might not have that much of memory/ram 
yeah , we can streams to process the 30gb file  by processing chunks by chunks , it makes possible to
read the 30gb file.

Streaming services like youtube,facebook,twitter,instagram,etc. are using streams to process the large amount of
data in efficient manner.

Why Streams?

1. Memory Efficient -don't keep all the data in memory at once and process the data in chunks.
2. Time Efficient - it takes less time to process the data in chunks instead processing large data.

Types of streams:
1. Readable Stream - are the streams which are used to read the data from the source.
2. Writable Stream - are the streams which are used to write the data to the destination.
3. Duplex Stream - are the streams which are used to read and write the data from the source and destination.
4. Transform Stream - are the streams which are used to transform the data from the source to the destination.
