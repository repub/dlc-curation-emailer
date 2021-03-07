<svelte:head>
	<title>Curation Email Helper</title>
	<html lang="en" />
</svelte:head>

<script>
	import Select from 'svelte-select';
	import Config from './config.json';
	let selections = {};
	for(let g of Config.groups){
		selections[g.name] = [];
	}
	function handleSelect(event) {
		for(let g of Config.groups){
			selections[g.name] = [];
		}
		if(!event.detail){
			return;
		}
		for (let select of event.detail){
			for(let g of Config.groups){
				if (select.group == g.name) {
					selections[g.name] = [...selections[g.name], select];
				}
			}
		}
	}
	const groupBy = (item) => item.group;
</script>

<style>
.app-container {
	width: 750px;
	margin: 0 auto;
}
.email-text{
	border: 1px solid #d8dbdf;
    border-radius: 3px;
    padding: 20px;
    margin: 10px auto;
}

.email-select {
	--height: 40px;
	--multiItemBorderRadius: 2px;
	--multiClearHeight: 10px;
	--multiClearWidth: 10px;
	--multiClearTop: 11px;
	--multiClearRadius: 50%;
}
.email-text  p {
	margin: 0px;
}
</style>

<div class="app-container">
	<div class="email-select">
		<Select items={Config.items} on:select={handleSelect} isMulti={true} {groupBy}></Select>
	</div>
	<div class="email-text">
		{@html Config.preamble}
		{#each Config.groups as group}
			{#if selections[group.name].length > 0 }
				<p>{@html group.preamble}</p>
				<ul>
					{#each selections[group.name] as i}
						<li><b>{i.label}</b>: {@html i.value}</li>
					{/each}
				</ul>
			{/if}
		{/each}
		{@html Config.postscript}
	</div>

</div>