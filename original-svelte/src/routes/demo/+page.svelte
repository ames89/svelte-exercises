<script>
	let count = $state(0);
	console.log('ANGEL--1');
</script>

<a href="/demo/paraglide">paraglide</a>

<button
	onclick={() => {
		console.log('ANGEL--2');
		count++;
	}}
>
	clicks: {count}
</button>
