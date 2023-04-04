<script lang="ts">
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	export let Class = '';

	const BACKGROUND_COLOR = ['#EFFCEF', '#FFEFE2', '#FACECE'];

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

	export let status = [];
	export let statusData = [];
	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: status.map((label) => label),
		datasets: [
			{
				label: '',
				data: statusData,
				backgroundColor: BACKGROUND_COLOR
			}
		]
	};

	let chart: Chart = null;

	$: {
		if (chart) {
			chart.data.labels = status;
			chart.data.datasets = [
				{
					data: statusData,
					backgroundColor: BACKGROUND_COLOR
				}
			];
			chart.update();
		}
	}

	onMount(() => {
		if (browser) {
			chart = new Chart(barChartElement, {
				type: 'pie',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: true,
							position: 'bottom',
							labels: {
								usePointStyle: true,
								boxWidth: 6,
								padding: 25
							}
						}
					},
					scales: {
						x: {
							display: false,
							grid: {
								color: '#fff'
								// tickColor: 'red'
							},
							ticks: { display: false }
						},
						y: {
							display: false,
							beginAtZero: false,
							ticks: {
								display: false
							},
							grid: {
								color: '#fff'
							},
							title: {
								display: false
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
	<section class="t-bg-white t-h-[30vh] lg:t-h-[50vh] t-flex t-justify-center t-items-center t-py-3">
		<canvas bind:this={barChartElement} />
	</section>
	<p class="t-mx-auto t-text-center t-py-1 lg:t-py-3 t-text-sm md:t-text-base lg:t-text-2xl t-text-black t-font-bold">Training Status</p>
</main>
