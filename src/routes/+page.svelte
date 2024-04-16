<script lang="ts">
	import { selectFileAndUploadToServer } from '$lib/utils/index.js';

	let fileinput: HTMLInputElement;
	export let data;

	function handleFileInputChange() {
		if (fileinput.files != null) {
			const file = fileinput.files[0];
			selectFileAndUploadToServer(file, onSuccess, onError);
		}
	}

	function onSuccess(
		fileName: string,
		file: string,
		fileType: string,
		fileSize: number,
		width: number,
		height: number
	) {
		console.log('File Selected successfully: ', fileType, fileSize);
		// upload image to database
		uploadMedia(fileName, file, fileType, fileSize, width, height);
	}

	function onError(error: string) {
		console.error('Error during image upload: ', error);
	}

	async function uploadMedia(
		fileName: string,
		file: string,
		type: string,
		size: number,
		width: number,
		height: number
	) {
		try {
			const res = await fetch('/api/media/upload', {
				method: 'POST',
				body: JSON.stringify({
					fileName: fileName,
					file: file,
					fileType: type,
					fileSize: size,
					width: width,
					height: height
				})
			});
			const data = await res.json();
			console.log('Image uploaded successfully', data);
		} catch (err) {
			console.error(err);
		}
	}
</script>

<h1>Customers Page</h1>

<input type="file" accept="*" bind:this={fileinput} on:change={handleFileInputChange} />

<div>
	{JSON.stringify(data)}
</div>
