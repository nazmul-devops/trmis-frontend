<script lang="ts">

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
	<div class="t-container t-mx-auto t-flex t-justify-between t-items-center">
		<div class="t-flex t-items-center">
			<div>
				<img src="/assets/bdgovt.png" alt="" class="t-w-12 t-h-fit t-py-4"/>
			</div>
			<div>
				<h1 class="t-text-3xl t-px-2 t-font-bold t-text-[#22c55e]">TrMIS</h1>
			</div>
		</div>
		<div>
			<nav>
				<ul class="t-flex">
					{#each menu as item}
						{#if item.children == null}
							<li class=" t-rounded-md">
								<a class="t-rounded-lg t-px-5 t-text-[#44403c] " href={item.link}>{item.label}</a>
							</li>
						{:else}
							<li class=" t-relative  t-rounded-md ">
								<span class="t-peer t-cursor-pointer t-px-5 ">{item.label}</span>
								<ul
									class="t-hidden  t-py-1 t-rounded-md t-absolute t--bottom-15 t-left-2 peer-hover:t-flex hover:t-flex t-flex-col"
								>
									{#each item.children as subMenu}
										{#if subMenu.children == null}
											<li class=" t-bg-green-400 t-px-3 t-py-3">
												<a  href={subMenu.link}>
													{subMenu.label}
												</a>
											</li>
										{:else}
											<li class=" t-bg-green-400 t-relative t-px-3 t-py-3">
												<span class="t-peer t-cursor-pointer t-text-white ">
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
</div>
	
</header>
