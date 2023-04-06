<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let showHamBurgerMenu = false;
	const handleMobileIconClick = () => (showHamBurgerMenu = !showHamBurgerMenu);

	const mediaQueryHandler = (e) => {
		if (!e.matches) {
			showHamBurgerMenu = false;
		}
	};

	onMount(() => {
		const mediaListener = window.matchMedia('(max-width: 767px)');

		mediaListener.addListener(mediaQueryHandler);
	});
	interface Menu {
		label: string;
		link?: string;
		children?: Array<Menu>;
	}

	let menu: Array<Menu> = [
		{
			label: 'Home',
			link: '/'
		},
		{
			label: 'Training',
			link: '/training-category'
		},
		{
			label: 'Event',
			link: '/event'
		},
		{
			label: 'Downloads',
			link: '/downloads'
		},
		{
			label: 'Map',
			link: '/map'
		},
		{
			label: 'Gallery',
			link: '/gallery'
		},
		{
			label: 'Notice',
			link: '/notice'
		},
		// {
		// 	label: 'About',
		// 	link: '/about-us'
		// },
		{
			label: 'Contact',
			link: '/contact'
		}
	];
</script>

<header class="t-sticky t-top-0 t-z-50">
	<div class="t-bg-white">
		<div
			class="sm:t-px-4 md:t-px-6 xl:t-px-10 2xl:t-px-24  t-flex t-justify-between t-items-center sm:t-relative t-py-4"
		>
			<div class="lg:t-ml-0 sm:t-ml-[10px] t-mr-4 xl:t-mr-12  ">
				<a href="/"
					><div
						class=""
					>
						<div class="md:t-hidden">
							<img src="/assets/LogoSM.png" alt="" class="t-ml-1 t-mr-2" />
						</div>
						<div class="t-hidden md:t-block">
							<img src="/assets/LogoXL.png" alt="" class="t-mr-2" />
						</div>
					</div>
				</a>
			</div>
			<div class="">
				<nav>
					<ul
						class={` lg:t-flex lg:t-flex-row lg:t-relative t-top-0 t-right-0 lg:t-justify-between lg:t-min-h-fit lg:t-bg-transparent lg:t-pt-0 sm:t-pt-12  t-text-xl  t-items-center sm:t-items-end sm:t-flex-col sm:t-absolute  sm:t-bg-[#44835C]  sm:t-min-h-screen ${
							showHamBurgerMenu ? ' t-block ' : 't-hidden'
						}`}
					>
						{#each menu as item}
							<li
								class={` sm:t-py-3 sm:t-px-11 lg:t-px-4 sm:first-of-type:t-mt-5   lg:first-of-type:t-mt-0`}
								on:click={() => (showHamBurgerMenu = false)}
								on:keypress={() => (showHamBurgerMenu = false)}
								class:active={$page.url.pathname == item.link}
							>
								<a
									class="t-rounded-lg  2xl:t-px-3 sm:t-text-white lg:t-text-[#2a5132] lg:t-font-semibold"
									href={item.link}
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
				<div
					class=" t-absolute t-right-[18px] t-top-5 t-m-auto sm:t-block lg:t-hidden"
					on:click={handleMobileIconClick}
					on:keypress={handleMobileIconClick}
				>
					<button>
						<i
							class={`t-text-transparent t-bg-clip-text t-text-4xl t-font-bold ${
								showHamBurgerMenu
									? ' las la-times t-bg-white'
									: 'las la-bars t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] '
							}`}
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</header>

<style>
	
	.active {
		background: white !important;
	}
	.active a {
		color: rgb(13, 145, 30) !important;
	}
	li:hover{
		background: white !important;
		
	}
	
	li:hover a{
		color: rgb(13, 145, 30) !important;
	}
	

</style>
