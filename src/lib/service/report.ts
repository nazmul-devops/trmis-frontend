import { http } from './auth';
import fileDownload from 'js-file-download';

export async function getReports(params) {
	console.log(params);
	try {
		const { data } = await http.get('report/', {
			responseType: 'blob',
			params: {
				...params
			}
		});

		fileDownload(data, `${params.fileName}-report.xlsx`);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}
