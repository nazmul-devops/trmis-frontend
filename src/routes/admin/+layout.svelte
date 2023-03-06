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
				<a href="/admin/trainee">Participants</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/trainer">Resources Persons</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/batch">Batch</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/training-center">Training Venue</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/training-calendar">Training Calendar</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavMenu text="Training Courses">
				<SideNavLink>
					<a href="/admin/training-course">Training Course</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/training-course/1/course-category">Training Category</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/training-course/1/course-material">Training Material</a>
				</SideNavLink>
				<!-- <SideNavLink>
					<a href="/admin/training-course/1/course-prerequisite">Course Prerequisite</a>
				</SideNavLink> -->
				<SideNavLink>
					<a href="/admin/training-course/1/course-topic">Course Topic</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/training-course/1/training-schedule">Training Schedule</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu text="Settings">
				<!-- <SideNavLink>
					<a href="/admin/settings/collaborations">Collaborations</a>
				</SideNavLink> -->
				<SideNavLink>
					<a href="/admin/settings/designations">Designations</a>
				</SideNavLink>
				<!-- <SideNavLink>
					<a href="/admin/settings/grades">Grades</a>
				</SideNavLink> -->
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
			<SideNavLink>
				<a href="/admin/event">Event</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/schedule-events">Event Schedule</a>
			</SideNavLink>
			<SideNavDivider />
			<!-- <SideNavLink>
				<a href="/admin/event-types">Event Type</a>
			</SideNavLink>
			<SideNavDivider /> -->
			<SideNavLink>
				<a href="/admin/notice">Notice</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink>
				<a href="/admin/gallery">Gallery</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavMenu text="Reports">
				<SideNavLink>
					<a href="/admin/reports/organization-wise-trainee">Organization Wise Trainee</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/designation-wise-trainee">Designation wise Trainee</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/course-wise-trainee">Course wise Trainee</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/trainee-attendence">Trainee Attendance</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/training-course-curriculum">Training Course Curriculum</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/training-schedule">Training Schedule</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/training-name-list">Trainee Name List</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/trainer-report">Trainer Report</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/exam-test-evaluation">Exam Test Evaluation</a>
				</SideNavLink>
				<SideNavLink>
					<a href="/admin/reports/cost-center">Cost Center</a>
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
