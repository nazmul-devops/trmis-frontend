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

    let labels = ['NTP', 'BRAC', 'Icddrb','IDDS','GFATN']
	Chart.register(...registerables);
	let barChartElement: HTMLCanvasElement;
	const chartData = {
		labels: labels.map(label => label),
		datasets: [
				{
                    label: '',
                    data: [795, 650, 550, 450, 350, 300],
                    backgroundColor:[
                        '#FFEFE2',
                        '#EFFCEF',
                        '#E6F5F9',
                        '#F9C7C7',
                        '#D7C7F9'
                    ],
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
							display: false
						},
					},
					scales: {
						x: {
							grid: {
								color: '#fff',
								// tickColor: 'red'
							},
							// ticks: { color: 'hsl(43 100% 52% )' }
                            title: {
                                display: true,
                                text: 'Organization Name',
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
								text: 'No of participants',
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
		<canvas class="t-w-full" bind:this={barChartElement} />
	</section>
    <p class="t-mx-auto t-text-center t-py-3 t-text-2xl t-text-black t-font-bold">
        Participants From Several Organization
    </p>
</main>
