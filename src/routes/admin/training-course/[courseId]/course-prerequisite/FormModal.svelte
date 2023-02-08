<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { coursePrerequisites } from '$lib/store/coursePrerequisite';
	import { Modal, MultiSelect, Select, SelectItem } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let coursePrerequisite = {
		id: null,
		course_id: null,
		prerequisite_course_id: [],
		prerequisite_courses: []
	};

	let prerequisites = [];
	let courseId = null;

	$: {
		// setFields('course_id', coursePrerequisite.course_id);
		// setFields('prerequisite_course_id', coursePrerequisite.prerequisite_course_id);
		prerequisites = coursePrerequisite.prerequisite_course_id
			? coursePrerequisite.prerequisite_course_id
			: [];
		courseId = coursePrerequisite.course_id;
	}

	$: {
		setFields('course_id', courseId);
		setFields('prerequisite_course_id', prerequisites);
	}

	const schema = yup.object({
		course_id: yup.number().required(),
		prerequisite_course_id: yup.array().min(1)
	});

	const { reset, createSubmitHandler, setFields, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data, prerequisite_courses) => {
			if (coursePrerequisite.id) {
				await coursePrerequisites.updateCoursePrerequisite({ ...data, id: coursePrerequisite.id });
			} else {
				await coursePrerequisites.createCoursePrerequisite({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		trainingCourses.getTrainingCourses();
		coursePrerequisites.getCoursePrerequisites();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Course Prerequisite"
	primaryButtonText={coursePrerequisite.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<MultiSelect
		selectedIds={prerequisites}
		titleText="Prerequisite"
		label="Select Prerequisite..."
		items={$trainingCourses.data.map((item) => ({ ...item, text: item.title }))}
		on:select={(e) => setFields('prerequisite_course_id', e.detail.selectedIds)}
	/>
	<Select
		selected={courseId}
		labelText="Course"
		on:change={(e) => setFields('course_id', e.detail)}
	>
		<SelectItem text="choose Course" />
		{#each $trainingCourses.data as course}
			<SelectItem value={course.id} text={course.title} />
		{/each}
	</Select>
	<!-- {JSON.stringify($errors)} -->
</Modal>
