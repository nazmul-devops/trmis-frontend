<script lang="ts">
	// import Logo from '../assets/Logo.png';

	interface Menu {
		label: string;
		link?: string;
		children?: Array<Menu>;
	}

	let menu: Array<Menu> = [
		{
			label: 'Home',
			link: '/',
		},
		{
			label: 'Training',
			children: [
				{
					label: 'Menu 1',
					link: '#'
				},
				{
					label: 'Menu 2',
					children: [
						{
							label: 'sub 1',
							link: '#'
						},
						{
							label: 'sub 2',
							link: '#'
						}
					]
				}
			]
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
			link: '/about'
		},
		{
			label: 'Contact',
			link: '/contact'
		}
	];
</script>

<header>
	<div class="t-flex t-justify-center">
		<div>
			<div>
				<div class="t-h-52 t-w-52 t-m-auto">
					<!-- <img src={Logo} alt="" /> -->
				</div>
			</div>
			<div class="t-text-center t-mb-5 t-border-red-500">
				<h1 class="t-text-6xl">TrMIS</h1>
			</div>
			<nav>
				<ul class="t-flex t-space-x-12 t-text-xl">
					{#each menu as item}
						{#if item.children == null}
							<li class="t-bg-green-500 t-rounded-md ">
								<a class="t-rounded-lg t-px-5 t-text-white" href={item.link}>{item.label}</a>
							</li>
						{:else}
							<li class=" t-relative t-bg-green-500 t-rounded-md ">
								<span class="t-peer t-cursor-pointer t-px-5 t-text-white">{item.label}</span>
								<ul
									class="t-hidden t-bg-green-500 t-py-1  t-rounded-md t-absolute t--bottom-15 t-left-1 peer-hover:t-flex hover:t-flex t-flex-col"
								>
									{#each item.children as subMenu}
										{#if subMenu.children == null}
											<li>
												<a class=" t-bg-green-400 t-px-5 t-text-white" href={subMenu.link}>
													{subMenu.label}
												</a>
											</li>
										{:else}
											<li class="t-relative">
												<span class="t-peer t-cursor-pointer t-bg-green-400 t-px-5 t-text-white">
													{subMenu.label}
												</span>
												<ul
													class="t-absolute t-bg-green-500 t-py-1  t-rounded-md t--right-[90px] t-top-0 t-hidden peer-hover:t-flex hover:t-flex t-flex-col"
												>
													{#each subMenu.children as subSubMenu}
														<li>
															<a class="t-bg-green-400 t-px-5 t-text-white" href={subSubMenu.link}
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
						{/if}
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</header>
