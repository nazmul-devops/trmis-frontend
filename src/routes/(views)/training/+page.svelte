<script>
	import PageTitle from '$lib/PageTitle.svelte';
	import TrainingCard from './TrainingCard.svelte';

	let trainigs = [
		{
			id: 1,
			course: 'Distributed web-enabled policy',
			studentCount: 15
		},
		{
			id: 2,
			course: 'Automated responsive flexibility',
			studentCount: 12
		},
		{
			id: 3,
			course: 'Devolved directional info-mediaries',
			studentCount: 15
		},
		{
			id: 4,
			course: 'Virtual foreground task-force',
			studentCount: 13
		},
		{
			id: 5,
			course: 'Centralized fault-tolerant internet solution',
			studentCount: 19
		},
		{
			id: 6,
			course: 'Persevering human-resource approach',
			studentCount: 5
		},
		{
			id: 7,
			course: 'Cross-platform secondary matrix',
			studentCount: 10
		},
		{
			id: 8,
			course: 'Expanded modular monitoring',
			studentCount: 10
		},
		{
			id: 9,
			course: 'Versatile actuating open system',
			studentCount: 15
		},
		{
			id: 10,
			course: 'Optional optimal open architecture',
			studentCount: 16
		},
		{
			id: 11,
			course: 'Virtual motivating ability',
			studentCount: 10
		},
		{
			id: 12,
			course: 'Object-based fresh-thinking middleware',
			studentCount: 8
		},
		{
			id: 13,
			course: 'Secured client-driven portal',
			studentCount: 8
		},
		{
			id: 14,
			course: 'Total demand-driven circuit',
			studentCount: 5
		},
		{
			id: 15,
			course: 'Optimized empowering Graphical User Interface',
			studentCount: 14
		},
		{
			id: 16,
			course: 'Enhanced multimedia definition',
			studentCount: 12
		},
		{
			id: 17,
			course: 'Focused mission-critical throughput',
			studentCount: 14
		},
		{
			id: 18,
			course: 'Re-engineered asymmetric projection',
			studentCount: 2
		},
		{
			id: 19,
			course: 'Networked asynchronous moratorium',
			studentCount: 6
		},
		{
			id: 20,
			course: 'Expanded reciprocal task-force',
			studentCount: 16
		},
		{
			id: 21,
			course: 'Face to face asymmetric budgetary management',
			studentCount: 20
		},
		{
			id: 22,
			course: 'Balanced upward-trending neural-net',
			studentCount: 20
		},
		{
			id: 23,
			course: 'Automated composite migration',
			studentCount: 3
		},
		{
			id: 24,
			course: 'Triple-buffered needs-based success',
			studentCount: 11
		},
		{
			id: 25,
			course: 'Multi-lateral asynchronous complexity',
			studentCount: 1
		},
		{
			id: 26,
			course: 'Versatile cohesive system engine',
			studentCount: 6
		},
		{
			id: 27,
			course: 'Automated uniform focus group',
			studentCount: 20
		},
		{
			id: 28,
			course: 'Horizontal context-sensitive solution',
			studentCount: 16
		},
		{
			id: 29,
			course: 'Business-focused regional extranet',
			studentCount: 3
		},
		{
			id: 30,
			course: 'Monitored regional budgetary management',
			studentCount: 20
		},
		{
			id: 31,
			course: 'Automated 6th generation service-desk',
			studentCount: 12
		},
		{
			id: 32,
			course: 'Persevering impactful alliance',
			studentCount: 13
		}
	];
</script>

<div>
	<div>
		<PageTitle
			Title="Training"
			desc="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
        sit "
		/>
        <div class="t-container t-py-32 t-transition t-ease-in-out t-delay-150  t-hover:-translate-y-1 t-hover:scale-110 t-hover:bg-indigo-500 t-duration-300">
            <div class="t-grid t-grid-cols-2 t-gap-4">
                {#each trainigs as {course, studentCount, id} }
                    <a href={`/training/${id}`} class="t-text-gray-500"><TrainingCard {course}/></a>
                {/each}
            </div>
        </div>
	</div>
</div>
