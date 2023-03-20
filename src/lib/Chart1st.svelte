<script lang="ts">
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	export let Class = '';
	let satisfactionData2021 = [
		{ framework: 'A', score: 96 },
		{ framework: 'B', score: 91 },
		{ framework: 'C', score: 91 },
		{ framework: 'D', score: 91 }
	];
	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: satisfactionData2021.map(({ framework }) => framework),
		datasets: [
				{
					label: 'Male (%)',
					data: satisfactionData2021.map(({ score }) => score),
					borderRadius: 10,
					borderWidth: 2
				},
				{
					label: 'Female (%)',
					data: satisfactionData2021.map(({ score }) => score - 5),
					borderRadius: 10,
					borderWidth: 2
				},
				{
					label: 'Other (%)',
					data: satisfactionData2021.map(({ score }) => score - 5),
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
								// color: 'hsl(43 100% 52% / 10%)',
								// tickColor: 'red'
							},
							// ticks: { color: 'hsl(43 100% 52% )' }
						},
						y: {
							beginAtZero: false,
							// ticks: { color: 'hsl(43 100% 52% )', font: { size: 18 } },
							grid: {
								color: 'hsl(43 100% 52% / 40%)'
							},
							title: {
								display: true,
								text: 'No of Trainess',
								// color: 'hsl(43 100% 52% )',
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
		<canvas class="t-w-full" bind:this={barChartElement} />
	</section>
</main>
