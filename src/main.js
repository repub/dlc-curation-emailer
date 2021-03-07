import App from './App.svelte';

let selected = []
const params = new URLSearchParams(window.location.search);
const param = params.get("select")
if(param != null){
	selected = param.split(',')
}

var app = new App({
	target: document.body,
	props:{
		searchParams: selected
	}
});

export default app;