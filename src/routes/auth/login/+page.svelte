<script lang="ts">
	import { currentUserCtx, firebaseCtx, login } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	const currentUser = currentUserCtx();
	const firebase = firebaseCtx();

	// automatically redirect
	$: if ($currentUser && browser) {
		goto('/chat');
	}

	let email: string;
	let password: string;
	let error: string | undefined;

	const invalidStyles = 'ring-red-500 ring';
</script>

<div class="flex flex-col gap-1">
	<h1 class="text-2xl font-bold">Login</h1>
	<hr />
	<a href="create" class="text-xs text-gray-600 underline">Create account</a>
	<a href="forgot-password" class="text-xs text-gray-600 underline">Forgot a password?</a>
</div>
<form
	class="flex flex-col gap-2"
	on:submit|preventDefault={async () => {
		try {
			login(firebase.getAuth(), email, password);
		} catch (err) {
			console.log(err);
			error = 'Invalid email or password';
		}
	}}
>
	<div class="flex flex-col gap-2">
		<label class="flex flex-col font-medium">
			Email:
			<input
				class="p-1 rounded border focus:ring focus:ring-indigo-500 focus:outline-none"
				type="email"
				name="email"
				bind:value={email}
			/>
		</label>
		<label class="flex flex-col font-medium">
			Password:
			<input
				class="p-1 rounded border focus:ring focus:ring-indigo-500 focus:outline-none"
				type="password"
				name="password"
				bind:value={password}
			/>
		</label>
	</div>
	<p class="text-sm text-red-500">
		{#if error}
			{error}
		{/if}
		&nbsp;
	</p>
	<button
		class="self-start py-1 px-4 text-lg font-medium text-white bg-indigo-500 rounded border shadow active:bg-indigo-600 disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-wait"
		type="submit"
	>
		Login
	</button>
</form>
