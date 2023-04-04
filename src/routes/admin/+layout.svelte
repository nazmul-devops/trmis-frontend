<script>
	import {
		Button,
		Header,
		HeaderUtilities,
		HeaderAction,
		SideNav,
		SideNavItems,
		SideNavMenu,
		HeaderPanelLinks,
		HeaderPanelLink,
		HeaderPanelDivider,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
		Content,
		Modal
	} from 'carbon-components-svelte';
	import Grid from 'carbon-icons-svelte/lib/Grid.svelte';
	import Calender from 'carbon-icons-svelte/lib/Calendar.svelte'
	import Events from 'carbon-icons-svelte/lib/Events.svelte';
	import Event from 'carbon-icons-svelte/lib/Event.svelte';
	import ReportData from 'carbon-icons-svelte/lib/ReportData.svelte';
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import UserSettings from 'carbon-icons-svelte/lib/UserSettings.svelte';

	import Location from 'carbon-icons-svelte/lib/Location.svelte';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
	import { isAuthincated, setAccessToken, logout } from '$lib/store/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { setupAuthHeader } from '$lib/service/auth';
	import ChangePassModal from '$lib/ChangePassModal.svelte';
	import EditDetailsModal from '$lib/EditDetailsModal.svelte';
	import { permissionsByGroups } from '$lib/store/permission';
	import { emitter } from '$lib/service/event-bus';

	let open = false;
	let isOpen = false;
	let changePassModal = false;
	let changeUserDetailsModal = false;

	$: {
		if (!$isAuthincated) {
			if (browser) {
				goto('/login');
			}
		} else {
			setupAuthHeader();
		}
	}
	function openUserDetailsModal() {
		changeUserDetailsModal = true;
	}
	function openPassModal() {
		changePassModal = true;
	}

	function accessForbiddenHandler() {
		open = true;
	}

	onMount(() => {
		setAccessToken();
		permissionsByGroups.getPermissionsByUser();
		emitter.on('http_403:access_forbidden', accessForbiddenHandler);
	});

	onDestroy(() => {
		emitter.off('http_403:access_forbidden', accessForbiddenHandler);
	});

	let isSideNavOpen = false;
	let isActive = false;
</script>

{#if $isAuthincated}
	<Header
		class="t-hidden md:t-block t-text-transparent t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-font-bold t-text-base t-border-b-0"
		company="TB Training Management Information System"
		platformName=""
		bind:isSideNavOpen
	>
		<svelte:fragment slot="skip-to-content">
			<SkipToContent />
		</svelte:fragment>
		<HeaderUtilities>
			<div class="avatar">
				<HeaderAction
					class=" t-flex t-justify-center t-items-center"
					bind:isOpen
					icon={UserAvatarFilledAlt}
					closeIcon={UserAvatarFilledAlt}
				>
					<HeaderPanelLinks class=" t-h-[30vh]">
						<!-- <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider> -->
						<HeaderPanelLink
							on:click={openUserDetailsModal}
							class="t-px-4 t-text-[#2D2D2D] hover:t-text-white t-font-medium"
						>
							Edit Details
						</HeaderPanelLink>
						<HeaderPanelLink
							on:click={openPassModal}
							class="t-px-4 t-text-[#2D2D2D] hover:t-text-white t-font-medium"
						>
							Change Password
						</HeaderPanelLink>
						<HeaderPanelLink class="t-text-[#2D2D2D] hover:t-text-white t-font-medium">
							<div on:click={logout} on:keypress={logout} class="t-w-full">Log Out</div>
						</HeaderPanelLink>
					</HeaderPanelLinks>
				</HeaderAction>
			</div>
		</HeaderUtilities>
	</Header>

	<SideNav bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<SideNavLink icon={Grid}>
				<a href="/admin" class="t-text-[#808083] t-font-medium">Dashboard</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavMenu icon={Events} text="Training">
				<SideNavLink class="t-mt-3">
					<a href="/admin/training/training-courses">Training Courses</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training/trainee">Participants</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training/trainee-request">Participants Approval List</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training/trainer">Resource Person</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training/training-center">Training Venue</a>
				</SideNavLink>
				<SideNavDivider />
				<!-- <SideNavLink>
				<a href="/admin/training-course/1/course-prerequisite">Course Prerequisite</a>
			</SideNavLink> -->
				<SideNavLink>
					<a href="/admin/training/training-courses/1/training-schedule">Training Schedule</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training/batch">Batch</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu icon={Event} text="Event">
				<!-- {#if $permissionsByGroups.filter((item) => item.permission_code == 'add_eventschedule').length > 0} -->
				<SideNavLink class="t-mt-3">
					<a href="/admin/event/schedule-events">Event Schedule</a>
				</SideNavLink>
				<!-- {/if} -->
				<SideNavDivider />
				<!-- {#if $permissionsByGroups.filter((item) => item.permission_code == 'add_event').length > 0} -->
				<SideNavLink>
					<a href="/admin/event/event-list">Event List</a>
				</SideNavLink>
				<!-- {/if} -->
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu icon={ReportData} text="Reports">
				<SideNavLink class="t-mt-3">
					<a href="/admin/reports/organization-wise-trainee">Organization Wise Participants</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/designation-wise-trainee">Designation wise Participants</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/course-wise-trainee">Training wise Participants</a>
				</SideNavLink>
				<!-- <SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/trainee-attendence">Trainee Attendance</a>
				</SideNavLink> -->
				<SideNavDivider />
				<!-- <SideNavLink>
					<a href="/admin/reports/training-course-curriculum">Training Curriculum</a>
				</SideNavLink>
				<SideNavDivider /> -->
				<SideNavLink>
					<a href="/admin/reports/training-schedule">Training Schedule</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/training-name-list">Participants Name List</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/trainer-report">Resource Person Report</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/exam-test-evaluation">Exam Test Evaluation</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/cost-center">Cost Center</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu icon={Settings} text="Settings">
				<!-- <SideNavLink>
				<a href="/admin/settings/collaborations">Collaborations</a>
			</SideNavLink> -->
				<SideNavLink class="t-mt-3">
					<a href="/admin/settings/designations">Designations</a>
				</SideNavLink>
				<SideNavDivider />
				<!-- <SideNavLink>
				<a href="/admin/settings/grades">Grades</a>
			</SideNavLink> -->
				<SideNavLink>
					<a href="/admin/settings/organizations">Organization</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/settings/source-of-funds">Source Of Fund</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/settings/training-coordinators">Training Coordinator</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/settings/training-category">Training Category</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/settings/planned-batch/">Planned Batch</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/settings/notice">Notice</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/settings/gallery">Gallery</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />

			<SideNavMenu icon={UserSettings} text="MIS Settings">
				<SideNavLink class="t-mt-3">
					<a href="/admin/mis-settings/users">Users</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/mis-settings/group">Groups</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavLink icon={Calender}>
				<a href="/admin/training-calendar">Training Calendar</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavLink icon={Location}>
				<a href="/admin/map" class="t-text-[#808083]">Map</a>
			</SideNavLink>
			<SideNavDivider />
		</SideNavItems>
	</SideNav>

	<Content>
		<slot />
	</Content>
{/if}

<EditDetailsModal bind:open={changeUserDetailsModal} />
<ChangePassModal bind:open={changePassModal} />

<Modal passiveModal bind:open modalHeading="UnAuthorized" on:open on:close>
	<p>You are not permitted for this action.</p>
</Modal>
