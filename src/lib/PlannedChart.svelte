<script lang="ts">
	import { browser } from '$app/environment';
	import { Chart, registerables } from 'chart.js';
	import { onMount } from 'svelte';
	
    
    export let Class = '';
    const plugin = {
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color || '#fff';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        };

    let labels = ['01', '02', '03','04','05', '06']
	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: labels.map(label => label),
		datasets: [
				{
                    label: 'Planned Schedule',
                    data: [1, 4, 6, 7, 6, 8, 9],
                    borderColor:[
                        '#64D9F9'
                    ],
                },
                {
                    label: 'Planned Schedule',
                    data: [1, 2, 3, 4, 5, 6],
                    borderColor:[
                        '#F89A9A'
                    ],
                }
		]
	};
	onMount(() => {
		if (browser) {
			new Chart(barChartElement, {
				type: 'line',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: true,
                            position: 'bottom',
							labels : {
								usePointStyle: false,
      							boxWidth: 50,
								padding: 25
							}
						},
					},
					scales: {
						x: {
                            display: true,
							grid: {
								color: '#fff',
								// tickColor: 'red'
							},
							// ticks: { color: 'hsl(43 100% 52% )' }
                            title: {
                                display: true,
                                text: 'Completed Batch',
								color: '#808083',
								font: { size: 16, }

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
								text: 'Planned Schedule',
								// color: '#808083',
								font: { size: 16, }
							}
						}
					}
				},
                plugins:[plugin]
			});
		}
	});
</script>

<main class={Class}>
	<section class="t-bg-white t-h-[50vh] t-flex t-justify-center t-items-center">
		<canvas class="t-w-full " bind:this={barChartElement} />
	</section>
    <p class="t-mx-auto t-text-center t-py-3 t-text-2xl t-text-black t-font-bold">
        Planned Vs Completed Batch
    </p>
</main>
