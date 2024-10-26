<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db } from '$lib/firebase';
	import { doc, getDoc } from 'firebase/firestore';

	let username = '';
	let loading = false;
	let isAvaliable = false;
	let debounceTimer: NodeJS.Timeout;

	async function checkAvailability() {
		isAvaliable = false;
		clearTimeout(debounceTimer);
		loading = true;

		debounceTimer = setTimeout(async () => {
			console.log('checking username availability of ', username);
			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());
			isAvaliable = !exists;
			loading = false;
		}, 500);
	}

	async function confirmUsername() {}
</script>

<AuthCheck>
	<h2>Username</h2>
	<form class="w-2/5" on:submit|preventDefault={confirmUsername}>
		<input
			type="text"
			placeholder="Username"
			bind:value={username}
			on:input={checkAvailability}
			class="input w-full"
		/>

		<p>isAvaliable: {isAvaliable}</p>

		<button class="btn btn-success" disabled={!isAvaliable}>Confirm username @{username}</button>
	</form>
</AuthCheck>
