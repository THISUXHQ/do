import { cleanFileName } from '$lib/utils/index.js';

export const POST = async ({ request, platform }) => {
	const { fileName, file, fileType } = await request.json();
	console.log('fileName', fileName);
	console.log('fileType', fileType);

	// ex file type : image/png or image/jpeg or image/gif or video/mp4 get in this format .png or .jpeg or .gif or .mp4
	const fileTypeSplit = fileType.split('/')[1];

	// clean the filename
	const cleanedFileName = cleanFileName(fileName);

	console.log('cleanedFileName:', cleanedFileName);

	// random id
	const id = Math.random().toString(36).substring(7);

	// convert file to array buffer because file in binary
	const fileBuffer = file.buffer instanceof ArrayBuffer ? file.buffer : Buffer.from(file).buffer;
	
	// upload the file to the bucket
	await platform?.env?.BUCKET.put(`${cleanedFileName}-${id}.${fileTypeSplit}`, fileBuffer);

	return new Response('success');
};
