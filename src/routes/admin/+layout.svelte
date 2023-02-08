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
		setAccessToken();
	});

	let isSideNavOpen = false;
</script>

{#if $isAuthincated}
	<Header company="TrMIS" platformName="" bind:isSideNavOpen>
		<svelte:fragment slot="skip-to-content">
			<SkipToContent />
		</svelte:fragment>
		<HeaderUtilities>
			<div class="t-text-white t-cursor-pointer t-flex t-items-center t-mr-5" on:click={logout}>
				Log Out
			</div>
		</HeaderUtilities>
	</Header>

	<SideNav bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<SideNavLink>
				<a href="/admin">DashBoard</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/trainee">Trainee</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/trainer">Trainer</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/training-center">Training Center</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/training-calendar">Training Calendar</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavMenu text="Training Courses">
				<SideNavLink>
					<a href="/admin/training-course">Courses</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/training-course/1/course-category">Course Category</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/training-course/1/course-material">Course Material</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/training-course/1/course-prerequisite">Course Prerequisite</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/training-course/1/course-topic">Course Topic</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/training-course/1/training-schedule">Training Schedule</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu text="Locations">
				<SideNavLink>
					<a href="/admin/locations/division">Division</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/locations/district">District</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/locations/sub-district">Sub District</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu text="Settings">
				<SideNavLink>
					<a href="/admin/settings/collaborations">Collaborations</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/settings/designations">Designations</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/settings/grades">Grades</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/settings/organizations">Organization</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/settings/source-of-funds">Source Of Fund</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/settings/training-coordinators">Training Coordinator</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
			<!-- <SideNavLink>
				<a href="/admin/users">Users</a>
			</SideNavLink>
			<SideNavDivider /> -->
		</SideNavItems>
	</SideNav>

	<Content>
		<slot />
	</Content>
{/if}
