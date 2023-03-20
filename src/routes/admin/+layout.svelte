<script>
	import {
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
		Content
	} from 'carbon-components-svelte';
	import { expoIn } from 'svelte/easing';
	import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
	import { isAuthincated, setAccessToken, logout } from '$lib/store/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { setupAuthHeader } from '$lib/service/auth';
	import ChangePassModal from '$lib/ChangePassModal.svelte';
	import { permissions, permissionsByGroups } from '$lib/store/permission';

	let isOpen = false;
	let changePassModal = false;

	$: {
		if (!$isAuthincated) {
			if (browser) {
				goto('/login');
			}
		} else {
			setupAuthHeader();
		}
	}

	function openPassModal() {
		changePassModal = true;
	}

	onMount(() => {
		setAccessToken();
		permissionsByGroups.getPermissionsByUser();
	});

	let isSideNavOpen = false;
</script>

{#if $isAuthincated}
	<Header company="TrMIS" platformName="" bind:isSideNavOpen>
		<svelte:fragment slot="skip-to-content">
			<SkipToContent />
		</svelte:fragment>
		<HeaderUtilities>
			<HeaderAction
				class=" t-flex t-justify-center t-items-center "
				bind:isOpen
				icon={UserAvatarFilledAlt}
				closeIcon={UserAvatarFilledAlt}
			>
				<HeaderPanelLinks class=" t-h-[18vh] ">
					<HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
					<HeaderPanelLink>Edit Details</HeaderPanelLink>
					<HeaderPanelLink on:click={openPassModal}>Change Password</HeaderPanelLink>
					<HeaderPanelLink>
						<div
							class="t-text-white t-cursor-pointer t-flex t-items-center t-mr-5"
							on:click={logout}
							on:keypress={logout}
						>
							Log Out
						</div>
					</HeaderPanelLink>
				</HeaderPanelLinks>
			</HeaderAction>
		</HeaderUtilities>
	</Header>

	<SideNav bind:isOpen={isSideNavOpen}>
		<SideNavItems>
			<SideNavLink>
				<a href="/admin">DashBoard</a>
			</SideNavLink>
			<SideNavDivider />
			<SideNavMenu text="Training">
				<SideNavLink>
					<a href="/admin/training-course">Training Course</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training-course/1/course-topic">Training Topic</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training-course/1/course-material">Training Material</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training-course/1/course-category">Training Category</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/trainee">Participants</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/trainee-request">Participants Approval List</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/trainer">Resource Person</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training-center">Training Venue</a>
				</SideNavLink>
				<SideNavDivider />
				<!-- <SideNavLink>
					<a href="/admin/training-course/1/course-prerequisite">Course Prerequisite</a>
				</SideNavLink> -->
				<SideNavLink>
					<a href="/admin/training-course/1/training-schedule">Training Schedule</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/training-calendar">Training Calendar</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/batch">Batch</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu text="Event">
				<!-- {#if $permissionsByGroups.filter((item) => item.permission_code == 'add_eventschedule').length > 0} -->
					<SideNavLink>
						<a href="/admin/schedule-events">Event Schedule</a>
					</SideNavLink>
				<!-- {/if} -->
				<SideNavDivider />
				<!-- {#if $permissionsByGroups.filter((item) => item.permission_code == 'add_event').length > 0} -->
					<SideNavLink>
						<a href="/admin/event">Event List</a>
					</SideNavLink>
				<!-- {/if} -->
			</SideNavMenu>
			<SideNavDivider />
			<SideNavMenu text="Reports">
				<SideNavLink>
					<a href="/admin/reports/organization-wise-trainee">Organization Wise Trainee</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/designation-wise-trainee">Designation wise Trainee</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/course-wise-trainee">Course wise Trainee</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/trainee-attendence">Trainee Attendance</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/training-course-curriculum">Training Course Curriculum</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/training-schedule">Training Schedule</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/training-name-list">Trainee Name List</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/reports/trainer-report">Trainer Report</a>
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
			<SideNavMenu text="Settings">
				<!-- <SideNavLink>
					<a href="/admin/settings/collaborations">Collaborations</a>
				</SideNavLink> -->
				<SideNavLink>
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
					<a href="/admin/notice">Notice</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/gallery">Gallery</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />

			<SideNavMenu text="MIS Settings">
				<SideNavLink>
					<a href="/admin/users">Users</a>
				</SideNavLink>
				<SideNavDivider />
				<SideNavLink>
					<a href="/admin/group">Groups</a>
				</SideNavLink>
			</SideNavMenu>
			<SideNavDivider />

			<!-- <SideNavLink>
				<a href="/admin/event-types">Event Type</a>
			</SideNavLink>
			<SideNavDivider /> -->
		</SideNavItems>
	</SideNav>

	<Content>
		<slot />
	</Content>
{/if}

<ChangePassModal bind:open={changePassModal} />
