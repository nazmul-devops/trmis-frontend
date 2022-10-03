<script>
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
		Content
	} from 'carbon-components-svelte';

	let isSideNavOpen = false;
</script>

<Header company="TrMIS" platformName="Admin Panel" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
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
