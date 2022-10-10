<script>
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		HeaderUtilities,
		HeaderGlobalAction,
		HeaderAction,
		SideNav,
		SideNavItems,
		Dropdown,
		SideNavMenu,
		HeaderPanelLinks,
		HeaderPanelLink,
		HeaderPanelDivider,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
		Content
	} from 'carbon-components-svelte';
	import { isAuthincated, setAccessToken, logout } from '$lib/store/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { setupAuthHeader } from '$lib/service/auth';
	$: {
		if (!$isAuthincated) {
			if (browser) {
				goto('/login');
			}
		} else {
			setupAuthHeader();
		}
	}

	onMount(() => {
		// setAccessToken();
	});


	let isSideNavOpen = false;
</script>

{#if $isAuthincated}
	<Header company="IBM" platformName="Carbon Svelte" bind:isSideNavOpen>
		<svelte:fragment slot="skip-to-content">
			<SkipToContent />
		</svelte:fragment>
		<HeaderUtilities>
			<div class="t-text-white t-cursor-pointer t-flex t-items-center t-mr-5" on:click={logout}>
				LogOut
			</div>
		</HeaderUtilities>
	</Header>

	<SideNav bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<SideNavLink>
				<a href="/admin">DashBoard</a>
			</SideNavLink>
			<SideNavLink>
				<a href="/admin/trainers">Traininers</a>
			</SideNavLink>
			<SideNavLink>
				<a href="/admin/courses">Courses</a>
			</SideNavLink>
			<SideNavLink>
				<a href="/admin/training-calendar">Training Calender</a>
			</SideNavLink>
			<SideNavLink>
				<a href="menu2">Menu 2</a>
			</SideNavLink>
			<SideNavMenu text="Menu 3">
				<SideNavLink>
					<a href="submenu1">Submenu 1</a>
				</SideNavLink>
				<SideNavLink>
					<a href="submenu2">Submenu 2</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
		</SideNavItems>
	</SideNav>

	<Content>
		<slot />
	</Content>
{/if}
