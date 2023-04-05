<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import { ComboBox } from 'carbon-components-svelte';
	import * as yup from 'yup';
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	import { dashboardData } from '$lib/store/dashboard';

	const BACKGROUND_COLOR = ['#FFEFE2', '#EFFCEF', '#E6F5F9', '#F9C7C7', '#D7C7F9'];

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	const schema = yup.object({
		distance: yup.string()
	});

	const { form, data } = createForm({
		extend: validator({ schema })
	});

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

	export let courseLabels = [];
	export let courseData = [];
	$:{
		// console.log(courseData)
	}
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

	$: courseList = $dashboardData.speceficCategories.map((item) => ({ ...item, text: item.title }));

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
		dashboardData.getSpeceficCategories();
	});
</script>

<main class={Class}>
	<section class="t-bg-white t-py-4">
		<div class="t-grid t-grid-cols-2 md:t-grid-cols-3 t-gap-4">
			<div class="t-col-start-2 md:t-col-start-3 t-px-2 md:t-px-10 t-mb-3">
				<form use:form>
					<ComboBox
						bind:selectedId={$data.distance}
						placeholder="Choose Specific Training Category"
						items={courseList}
						{shouldFilterItem}
					/>
				</form>
			</div>
		</div>
		<canvas class="t-w-full t-py-3" bind:this={barChartElement} />
	</section>
	<p
		class="t-mx-auto t-text-center t-py-3 t-text-sm md:t-text-base lg:t-text-2xl t-text-black t-font-bold"
	>
		Number of Participants for Different Training Categories
	</p>
</main>
