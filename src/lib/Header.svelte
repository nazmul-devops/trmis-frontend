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
			link: '/training'
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
	<div class="t-bg-white ">
		<div
			class="lg:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24  t-grid lg:t-grid-cols-4 xl:t-grid-cols-3 sm:t-relative "
		>
			<div class="lg:t-col-span-1 xl:t-col-span-1 lg:t-ml-0 sm:t-ml-[10px]">
				<a href="/"
					><div
						class=" t-flex
				 t-items-center  "
					>
						<img src="/assets/logo2.jpg" alt="" class=" t-py-4" />
					</div>
				</a>
			</div>
			<div class=" lg:t-col-span-3 xl:t-col-span-2">
				<nav>
					<ul
						class={` lg:t-flex lg:t-flex-row lg:t-relative t-top-0 t-right-0 lg:t-justify-between lg:t-min-h-fit lg:t-bg-transparent  lg:t-pt-4 sm:t-pt-12  t-text-xl  t-items-center sm:t-items-end sm:t-flex-col sm:t-absolute  sm:t-bg-[#44835C]  sm:t-min-h-screen ${
							showHamBurgerMenu ? ' t-block ' : 't-hidden'
						}`}
					>
						{#each menu as item}
							<li
								class=" t-rounded-md sm:t-py-2 sm:t-px-11 lg:t-px-1"
								on:click={() => (showHamBurgerMenu = false)}
								on:keypress={() => (showHamBurgerMenu = false)}
								class:active={$page.url.pathname == item.link}
							>
								<a
									class="t-rounded-lg lg:t-px-2 xl:t-px-5 sm:t-text-white lg:t-text-[#2a5132] lg:t-font-semibold "
									href={item.link}
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
				<div
					class=" t-absolute t-right-[18px] t-top-5 t-m-auto sm:t-block lg:t-hidden "
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
	.active a {
		color: rgb(13, 145, 30) !important;
	}
	li a:hover {
		color: rgb(13, 145, 30) !important;
	}
</style>
