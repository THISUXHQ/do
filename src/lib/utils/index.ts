export function selectFileAndUploadToServer(
	file: File,
	onSuccess: (
		fileName: string,
		data: string,
		fileType: string,
		fileSize: number,
		width: number,
		height: number
	) => void,
	onError: (error: string) => void
) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = (e) => {
		if (e.target != null) {
			const dataURL = e.target.result as string;
			if (file.type.startsWith('image/') && file.size < 5 * 1024 * 1024) {
				const img = new Image();
				img.src = URL.createObjectURL(file);
				let width: number;
				let height: number;

				img.onload = () => {
					width = img.width;
					height = img.height;
					onSuccess(file.name, dataURL, file.type, file.size, width, height);
				};
			} else if (file.type.startsWith('video/') && file.size < 100 * 1024 * 1024) {
				const video = document.createElement('video');
				video.src = URL.createObjectURL(file);
				video.addEventListener('loadedmetadata', () => {
					const width = video.videoWidth;
					const height = video.videoHeight;
					onSuccess(file.name, dataURL, file.type, file.size, width, height);
				});
			} else if (file.type.startsWith('audio/') && file.size < 100 * 1024 * 1024) {
				onSuccess(file.name, dataURL, file.type, file.size, 0, 0);
			} // text file
			else if (file.type.startsWith('text/') && file.size < 5 * 1024 * 1024) {
				onSuccess(file.name, dataURL, file.type, file.size, 0, 0);
			} // pdf file
			else if (file.type.startsWith('application/pdf') && file.size < 5 * 1024 * 1024) {
				onSuccess(file.name, dataURL, file.type, file.size, 0, 0);
			} // zip file
			else if (file.type.startsWith('application/zip') && file.size < 5 * 1024 * 1024) {
				onSuccess(file.name, dataURL, file.type, file.size, 0, 0);
			} else {
				onError('Please select a file with a valid type and size');
			}
		}
	};
}

export function cleanFileName(fileName: string): string {
    return fileName
        // Remove special characters and replace them with underscore
        .replace(/[^\w\s.-]/gi, '_')
        // Replace multiple spaces with a single underscore
        .replace(/\s+/g, '_')
        // Convert to lowercase
        .toLowerCase()
        // Remove file extension
        .split('.').slice(0, -1).join('.')
        // Trim leading and trailing underscores, dots, and spaces
        .replace(/^[\s._-]+|[\s._-]+$/g, '');
}