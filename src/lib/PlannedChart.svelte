<script lang="ts">
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';

	const BACKGROUND_COLOR = ['#FFDCBF', '#BDFCBD'];

	export let Class = '';
	const plugin = {
		id: 'customCanvasBackgroundColor',
		beforeDraw: (chart, args, options) => {
			const { ctx } = chart;
			ctx.save();
			ctx.globalCompositeOperation = 'destination-over';
			ctx.fillStyle = options.color || '#fff';
			ctx.fillRect(0, 0, chart.width, chart.height);
			ctx.restore();
		}
	};

	export let plannedLabels = [];
	export let plannedData = [];
	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: plannedLabels,
		datasets: [
			{
				label: '',
				data: plannedData,
				backgroundColor: ['#FFEFE2', '#EFFCEF']
			}
		]
	};

	let chart: Chart = null;

	$: {
		if (chart) {
			chart.data.labels = plannedLabels;
			chart.data.datasets = [
				{
					data: plannedData,
					backgroundColor: BACKGROUND_COLOR
				}
			];
			chart.update();
		}
	}

	onMount(() => {
		if (browser) {
			chart = new Chart(barChartElement, {
				type: 'bar',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						x: {
							grid: {
								color: '#fff'
								// tickColor: 'red'
							},
							// ticks: { color: 'hsl(43 100% 52% )' }
							title: {
								display: true,
								text: '',
								color: '#808083',
								font: { size: 16 }
							}
						},
						y: {
							beginAtZero: true,
							// ticks: { color: 'hsl(43 100% 52% )', font: { size: 18 } },
							grid: {
								color: '#ffffff'
							},
							title: {
								display: true,
								text: 'No of batch',
								// color: '#808083',
								font: { size: 16 }
							}
						}
					}
				},
				plugins: [plugin]
			});
		}
	});
</script>

<main class={Class}>
	<section class="t-bg-white t-h-[30vh] lg:t-h-[50vh] t-flex t-justify-center t-items-center">
		<canvas class="t-w-full" bind:this={barChartElement} />
	</section>
	<p class="t-mx-auto t-text-center t-py-1 lg:t-py-3 t-text-sm md:t-text-base lg:t-text-2xl t-text-black t-font-bold">
		Planned Vs Completed Batch
	</p>
</main>
