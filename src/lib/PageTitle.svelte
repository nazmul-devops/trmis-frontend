<script>
   export let Title;
   export let desc;
</script>

<div class="t-py-12 t-text-center t-bg-[#b6f3c9]">
    <div class="t-container t-text-left">
        <h2 class={`t-text-6xl t-text-gray-900 t-mb-4 ${$$props.class} `}>{Title}</h2>
    <p class="t-text-slate-700 t-break-normal t-w-[62%]">{desc}</p>
    </div>
</div>