<script lang="ts">
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	export let Class = '';
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
				borderRadius: 10,
				borderWidth: 2
			},
			{
				label: 'Female (%)',
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
