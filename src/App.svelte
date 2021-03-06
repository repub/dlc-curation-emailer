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
</script>

<style>
</style>


<Select items={Config.items} on:select={handleSelect} isMulti=true></Select>
<div>
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