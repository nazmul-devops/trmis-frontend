<script>
	export let  desc;
	export let materialTitle;
	export let fileType;
	let icon;

	$: {
		if(fileType == 'ppt'){
			icon = 'las la-file-powerpoint'
		}
		else if(fileType == 'jpg' || fileType == "png" || fileType=="jpeg" || fileType=="svg"  ) {
			icon = "las la-file-image"
		} 
		else if(fileType== 'mp4' || fileType== 'mov' || fileType=="mpeg"){
			icon = "las la-file-video"
		}else if(fileType== 'pdf'){
			icon = "las la-file-pdf"
		}else if(fileType== 'mp3'){
			icon = "las la-file-audio"
		}
		else {
			icon = "las la-file-alt"
		}
	} 
</script>
<div class="t-mb-3">
	<div
		class="t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] t-h-24 t-rounded-md t-pt-1 t-shadow-lg"
	>
		<div class=" t-flex t-rounded-md t-h-full  t-justify-between t-items-center t-bg-white t-px-4 ">
			<div class="t-flex t-items-center t-gap-2">
				<div>
					<i class="{icon} t-text-4xl t-font-semibold t-text-transparent  t-bg-clip-text t-bg-gradient-to-r t-from-[#44835C] t-to-[#F94646] "></i>
				</div>
				<div>
					<h6>{materialTitle}</h6>
					<p>{desc}</p>
				</div>
			</div>
			<div
				class="t-rounded-full  t-h-20 t-w-20 t-text-gray-900  t-justify-center t-items-center t-flex"
			>
				<p
					class="t-text-align-center t-font-semibold t-text-transparent t-text-xl t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] "
				>
				<i class="las la-download t-text-4xl t-font-semibold t-cursor-pointer"></i>
				</p>
			</div>
		</div>
	</div>
</div>
