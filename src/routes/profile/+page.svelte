<script lang="ts">
	import { currentUserCtx } from '$lib/firebase';

	const currentUser = currentUserCtx();
	let email = $currentUser?.email;

	let name = $currentUser?.name;
	async function update() {}
</script>

<div class="flex">
	<form class="flex flex-col gap-2 p-1" on:submit|preventDefault={update}>
		<label class="flex flex-col">
			<span>Display Name:</span>
			<input class="border" type="text" bind:value={name} />
		</label>
		<button class="py-1 px-2 text-white bg-blue-600 rounded shadow" type="submit">Update</button>
	</form>
</div>
