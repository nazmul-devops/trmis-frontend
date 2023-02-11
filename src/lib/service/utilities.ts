export async function generateFromData(payload) {
	const formData = new FormData();
	Object.keys(payload).forEach((key) => {
		if (Array.isArray(payload[key])) {
			payload[key].forEach((item) => {
				formData.append(key, item);
			});
		} else {
			formData.append(key, payload[key]);
		}
	});
	return formData;
}
