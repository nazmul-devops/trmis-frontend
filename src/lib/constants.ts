export const REPORT_TYPE = {
	ORGANIZATION: { id: 1, name: 'Organization-wise-trainee' },
	DESIGNATION: { id: 2, name: 'Designations-wise-trainee' },
	COURSE: { id: 3, name: 'Course-wise-trainee' },
	ATTENDENCE: { id: 4, name: 'Trainee-Attendence' },
	COURSE_CURRICULAM: { id: 5, name: 'Training-Course-Curriculam' },
	SCHEDULE: { id: 6, name: 'Training-Schedule' },
	TRAINING_NAME: { id: 7, name: 'Training-Name' },
	TRAINER: { id: 8, name: 'Trainer' },
	EXAM_TEST: { id: 9, name: 'Exam-Test-Evaluation' }
};

export const MATERIAL_STATUS = [
	{ id: 1, text: 'Married' },
	{ id: 2, text: 'UnMarried' }
];

export const MAP_VIEW_TYPE = [
	{ id: 1, text: 'Training Venue View' },
	{ id: 2, text: 'Training Completed' }
];

export const BATCH_VIEW = MAP_VIEW_TYPE[1].id;

export const galleryCategory = [
	{ id: 1, text: 'Meeting' },
	{ id: 2, text: 'Orientation' },
	{ id: 3, text: 'Training' },
	{ id: 4, text: 'Seminar' },
	{ id: 5, text: 'Workshop' }
];

export const EVENTDATA = [
	{
		id: 1,
		title: 'Meeting',
		link: '/assets/eventIcon1.jpg'
	},
	{
		id: 2,
		title: 'Workshop',
		link: '/assets/eventIcon2.jpg'
	},
	{
		id: 3,
		title: 'Orientation',
		link: '/assets/eventIcon3.jpg'
	},
	{
		id: 4,
		title: 'Sensitization',
		link: '/assets/eventIcon4.jpg'
	}
];
