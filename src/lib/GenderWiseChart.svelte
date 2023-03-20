<script lang="ts">
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
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

	let satisfactionData2021 = [
		{ status: 'Female', score: 75 },
		{ status: 'Male', score: 96 },
	];
	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: satisfactionData2021.map(({ status }) => status),
		datasets: [
			{
				label: '',
				data: satisfactionData2021.map(({ score }) => score),
				backgroundColor: [
                    '#FACECE', 
                    '#EFFCEF', 
                ]
			}
		]
	};
	onMount(() => {
		if (browser) {
			new Chart(barChartElement, {
				type: 'pie',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: true,
							position: 'bottom',
							labels : {
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
	<section class="t-bg-white t-h-[50vh] t-flex t-justify-center t-items-center">
		<canvas class="" bind:this={barChartElement} />
	</section>
    <p class="t-mx-auto t-text-center t-py-3 t-text-2xl t-text-black t-font-bold">
        Gender Wise Training 
    </p>
</main>
