<script lang="ts">
	interface sponsorCard {
		name: string;
		links: string;
		icon: string;
	}

	let sponsorcards: Array<sponsorCard> = [
		{
			name: 'mohfw.gov.bd',
			links: 'http://mohfw.gov.bd',
			icon: 'assets/Vector.svg'
		},
		{
			name: 'dghs.gov.bd',
			links: 'https://dghs.gov.bd',
			icon: 'assets/Vector.svg'
		},
		{
			name: 'ntp.gov.bd',
			links: 'https://ntp.gov.bd',
			icon: 'assets/Vector.svg'
		},
		{
			name: 'ETB Manager',
			links: 'http://etbmanagerbd.org',
			icon: 'assets/Vector1.svg'
		},
		{
			name: 'eLMIS.gov.bd',
			links: 'http://103.247.238.133/',
			icon: 'assets/Vector.svg'
		}
	];
</script>

<div class="t-grid t-grid-cols-1 md:t-grid-cols-2 lg:t-grid-cols-5 t-place-content-center t-place-items-center">
	{#each sponsorcards as { name, links, icon }}
		<a href={links} target="_blank" rel="noreferrer">
			<button
				class="t-flex t-justify-between t-items-center t-bg-[#2A332F] t-rounded t-text-white t-px-3 t-py-4 lg:t-px-5 lg:t-py-6 t-mb-10 lg:t-mb-4 t-mr-4"
			>
				<div>
					<img class="t-w-6 t-h-6 t-mr-8" src={icon} alt="" />
				</div>
				<div>
					<p class="t-text-sm t-font-medium">{name}</p>
				</div>
			</button>
		</a>
	{/each}
</div>
