<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { firebaseCtx } from '$lib/firebase';
	import { confirmPasswordReset } from 'firebase/auth';

	const auth = firebaseCtx().getAuth();

	let code = $page.url.searchParams.get('code');
	if (!code && browser) {
		goto('/auth/forgot-password');
	}
	let password: string;
	let error: string | undefined;

	const invalidStyles = 'ring-red-500 ring';
</script>

<div class="flex flex-col gap-1">
	<h1 class="text-2xl font-bold">Set a new password</h1>
	<hr />
	<a href="create" class="text-xs text-gray-600 underline">Create account</a>
	<a href="login" class="text-xs text-gray-600 underline">Login</a>
</div>
<p>Please select a new password</p>
<form
	class="flex flex-col gap-2"
	on:submit|preventDefault={async () => {
		try {
			await confirmPasswordReset(auth, code ?? '', password);
			goto('/auth/login');
		} catch (err) {
			console.log(err);
			error = 'Unexpected error.';
		}
	}}
>
	<div class="flex flex-col gap-2">
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
