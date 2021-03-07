<svelte:head>
	<title>Curation Email Helper</title>
	<html lang="en" />
</svelte:head>

<script>
	import Select from 'svelte-select';
	import Config from './config.json';

	// prop for url search params: ?select=opt1,opt2
	export let searchParams = [];

	// initial Config.items from searchParams
	let initialSelections = [];
	for(let v of searchParams){
		for (let i of Config.items){
			if (i.value == v){
				initialSelections = [...initialSelections,i]
			}
		}
	}

	// actual selection stored here
	let selections = {};
	setSelections(initialSelections);

	// link for this set of selections
	$: link = searchParams.join(",")

	function setSelections(items){
		for(let g of Config.groups){
			selections[g.name] = [];
			searchParams = [];
		}
		if(!items){
			return;
		}
		for (let select of items){
			for(let g of Config.groups){
				if (select.group == g.name) {
					selections[g.name] = [...selections[g.name], select];
					searchParams = [...searchParams, select.value]
				}
			}
		}
	}
	function handleSelect(event) {
		setSelections(event.detail)
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
		<Select items={Config.items} selectedValue={initialSelections} on:select={handleSelect} isMulti={true} {groupBy}></Select>
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
	<div class="tools">
		<a href="?select={ link }">link</a>
	</div>


</div>