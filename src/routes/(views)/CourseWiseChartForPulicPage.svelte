<script lang="ts">
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	import { httpWeb } from '$lib/service/auth';

	const BACKGROUND_COLOR = ['#FFDCBF', '#BDFCBD', '#BBECF9', '#F9BBBB', '#D7C7F9'];

	let trainingData = [];

	async function getCourse() {
		let { data } = await httpWeb.get('training-course/');

		trainingData = data;
	}
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

	let courseLabels = [];
	let courseData = [];
	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: courseLabels,
		datasets: [
			{
				label: '',
				data: courseData,
				backgroundColor: BACKGROUND_COLOR
			}
		]
	};

	let chart: Chart = null;

	$: {
		if (chart) {
			chart.data.labels = courseLabels;
			chart.data.datasets = [
				{
					data: courseData,
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
								text: 'Training Category',
								color: '#808083',
								font: { size: 16 }
							}
						},
						y: {
							beginAtZero: false,
							// ticks: { color: 'hsl(43 100% 52% )', font: { size: 18 } },
							grid: {
								color: '#ffffff'
							},
							title: {
								display: true,
								text: 'No of participants',
								// color: '#808083',
								font: { size: 16 }
							}
						}
					}
				},
				plugins: [plugin]
			});
		}

		getCourse();
	});
</script>

<main class={Class}>
	<section class="t-bg-white t-h-[30vh] lg:t-h-[50vh] t-flex t-justify-center t-items-center t-py-3">
		<canvas class="t-w-full " bind:this={barChartElement} />
	</section>
	<p class="t-mx-auto t-text-center t-py-3 t-text-sm md:t-text-base lg:t-text-2xl t-text-black t-font-bold">
		Number of Participants for Different Training Categories
	</p>
</main>
