<script lang="ts">
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	export let Class ="";
	let satisfactionData2021 = [
		{ framework: 'Jan', score: 96 },
		{ framework: 'Feb', score: 91 },
		{ framework: 'March', score: 91 },
		{ framework: 'April', score: 91 },
		{ framework: 'May', score: 91 },
		{ framework: 'June', score: 88 },
		{ framework: 'July', score: 85 },
		{ framework: 'Aug', score: 82 },
		{ framework: 'Sep', score: 82 },
		{ framework: 'Oct', score: 76 },
		{ framework: 'Nov', score: 67 },
		{ framework: 'Dec', score: 85 }
	];
	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: satisfactionData2021.map(({ framework }) => framework),
		datasets: [
			{
				label: 'Male (%)',
				data: satisfactionData2021.map(({ score }) => score),
				backgroundColor: [
					'hsl(347 38% 49%)',
					'hsl(346 65% 63%)',
					'hsl(346 49% 56%)',
					'hsl(346 89% 70%)',
					'hsl(346 90% 76%)',
					'hsl(346 90% 73%)',
					'hsl(346 89% 79%)',
					'hsl(346 89% 85%)',
					'hsl(347 89% 82%)',
					'hsl(346 90% 88%)',
					'hsl(347 87% 94%)',
					'hsl(347 91% 91%)'
				],
				borderColor: ['hsl(43 100% 52%)'],
				borderRadius: 10,
				borderWidth: 2
			},
			{
				label: 'Female (%)',
				data: satisfactionData2021.map(({ score }) => score-5),
				backgroundColor: [
					'hsl(347 38% 49%)',
					'hsl(346 65% 63%)',
					'hsl(346 49% 56%)',
					'hsl(346 89% 70%)',
					'hsl(346 90% 76%)',
					'hsl(346 90% 73%)',
					'hsl(346 89% 79%)',
					'hsl(346 89% 85%)',
					'hsl(347 89% 82%)',
					'hsl(346 90% 88%)',
					'hsl(347 87% 94%)',
					'hsl(347 91% 91%)'
				],
				borderColor: ['hsl(43 100% 52%)'],
				borderRadius: 10,
				borderWidth: 2
			}
		]
	};
	onMount(() => {
		if (browser) {
			new Chart(barChartElement, {
				type: 'bar',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: true
						}
					},
					scales: {
						x: {
							grid: {
								color: 'hsl(43 100% 52% / 10%)',
								tickColor: 'red'
							},
							ticks: { color: 'hsl(43 100% 52% )' }
						},
						y: {
							beginAtZero: false,
							ticks: { color: 'hsl(43 100% 52% )', font: { size: 18 } },
							grid: {
								color: 'hsl(43 100% 52% / 40%)'
							},
							title: {
								display: true,
								text: 'Satisfaction (%)',
								color: 'hsl(43 100% 52% )',
								font: { size: 24, family: 'Merriweather' }
							}
						}
					}
				}
			});
		}
	});
</script>

<main class={Class}>
	<section>
		<canvas  bind:this={barChartElement} />
	</section>
</main>
