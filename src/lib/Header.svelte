<script lang="ts">
	import { onMount } from 'svelte';
	let showHamBurgerMenu = false;
	const handleMobileIconClick = () => (showHamBurgerMenu = !showHamBurgerMenu);

	const mediaQueryHandler = (e: any) => {
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
			// 	children: [
			// 		{
			// 			label: 'Menu 1',
			// 			link: '#'
			// 		},
			// 		{
			// 			label: 'Menu 2',
			// 			children: [
			// 				{
			// 					label: 'sub 1',
			// 					link: '#'
			// 				},
			// 				{
			// 					label: 'sub 2',
			// 					link: '#'
			// 				}
			// 			]
			// 		}
			// 	]
		},
		{
			label: 'Downloads',
			link: '/downloads'
		},
		{
			label: 'Gallery',
			link: '/gallery'
		},
		{
			label: 'Notice',
			link: '/notice'
		},
		{
			label: 'About',
			link: '/about-us'
		},
		{
			label: 'Contact',
			link: '/contact'
		}
	];
</script>

<header>
	<div class="t-shadow-md t-shadow-[#d1fae5] t-bg-white">
		<div class="lg:t-container  t-flex t-justify-between t-items-center sm:t-relative">
			<div class="t-flex t-items-center sm:t-ml-[10px]">
				<div>
					<img src="/assets/bdgovt.png" alt="" class="t-w-12 t-h-fit t-py-4" />
				</div>
				<div>
					<h1 class="t-text-3xl t-px-2 t-font-bold t-text-[#22c55e]">TrMIS</h1>
				</div>
			</div>
			<div>
				<nav>
					<ul
						class={` lg:t-flex t-text-xl sm:t-flex-col lg:t-flex-row lg:t-justify-between t-items-center sm:t-items-end sm:t-absolute t-top-0 t-right-0 sm:t-bg-[#44835C]  sm:t-min-h-screen lg:t-min-h-fit lg:t-bg-white  lg:t-pt-4 sm:t-pt-12 sm:t-w-1/5  lg:t-w-fit ${showHamBurgerMenu ? ' t-block ' : 't-hidden'}`}>
						{#each menu as item}
							<li class=" t-rounded-md sm:t-py-2 sm:t-px-2">
								
								<a class="t-rounded-lg t-px-5 sm:t-text-white lg:t-text-black " href={item.link}>{item.label} </a>
							</li>
							<!-- {#if item.children == null}
								<li class=" t-rounded-md">
									<a class="t-rounded-lg t-px-5 t-text-black " href={item.link}>{item.label}</a>
								</li>
							{:else}
								<li class=" t-relative  t-rounded-md ">
									<span class="t-peer t-cursor-pointer t-px-5 ">{item.label}</span>
									<ul
										class=" t-rounded-lg t-shadow-[0px_5px_10px_#b6f3c9] t-z-10 t-bg-white t-absolute t--bottom-15 t-left-2 peer-hover:t-flex hover:t-flex t-flex-col t-w-32"
									>
										{#each item.children as subMenu}
											{#if subMenu.children == null}
												<li class=" t-bg-white t-px-3 t-py-3">
													<a href={subMenu.link}>
														{subMenu.label}
													</a>
												</li>
											{:else}
												<li
													class=" t-peer t-text-black    t-rounded-lg t-cursor-pointer t-relative t-px-3 t-py-3"
												>
													<span class=" t-peer  t-text-black ">
														{subMenu.label}
													</span>
													<ul
														class="t-absolute t-rounded-lg t-shadow-[0px_5px_10px_#b6f3c9] t-z-10 t-bg-white t--right-[130px] t-top-0  peer-hover:t-flex hover:t-flex t-flex-col t-w-32"
													>
														{#each subMenu.children as subSubMenu}
															<li class="t-py-3 t-px-2">
																<a class="t-text-black" href={subSubMenu.link}
																	>{subSubMenu.label}
																</a>
															</li>
														{/each}
													</ul>
												</li>
											{/if}
										{/each}
									</ul>
								</li>
							{/if} -->
						{/each}
					</ul>
				</nav>
			</div>
			<div
				class=" t-absolute t-right-[10px] t-top-5 t-m-auto sm:t-block lg:t-hidden "
				on:click={handleMobileIconClick}
			>
				<button>
					<i
						class={`t-text-transparent t-bg-clip-text t-text-4xl t-font-bold ${
							showHamBurgerMenu ? ' las la-times t-bg-white' : 'las la-bars t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] '
						}`}
					/>
				</button>
			</div>
		</div>
	</div>
</header>
