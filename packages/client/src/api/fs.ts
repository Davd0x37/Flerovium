export interface FileReadHandlers {
	onload: (
		result: string | ArrayBuffer | null,
		event: ProgressEvent<FileReader>,
	) => any;
	onerror: (event: ProgressEvent<FileReader>) => any;
	onprogress: (event: ProgressEvent<FileReader>) => any;
	onabort: (event: ProgressEvent<FileReader>) => any;
}

export const readFile = (file: File, handlers: FileReadHandlers) => {
	const fr = new FileReader();

	fr.onload = function onload(event) {
		handlers.onload(fr.result, event);
	};

	fr.onerror = handlers.onerror;

	fr.onprogress = handlers.onprogress;

	fr.onabort = handlers.onabort;

	fr.readAsText(file);
};

export const generateDownloadUrl = (data: string | ArrayBuffer): string => {
	const blob = new Blob([data], {
		type: 'application/octet-stream',
	});

	const url = URL.createObjectURL(blob);
	return url;
};
