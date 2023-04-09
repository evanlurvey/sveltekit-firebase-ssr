<script lang="ts">
	import { auth } from '$lib/firebase';
	import { sendPasswordResetEmail } from 'firebase/auth';

	let email: string;
	let error: string | undefined;
	let sent = false;

	const invalidStyles = 'ring-red-500 ring';
</script>

<div class="flex flex-col gap-1">
	<h1 class="text-2xl font-bold">Forgot password</h1>
	<hr />
	<a href="create" class="text-xs text-gray-600 underline">Create account</a>
	<a href="login" class="text-xs text-gray-600 underline">Login</a>
</div>

{#if !sent}
	<form
		class="flex flex-col gap-2"
		on:submit|preventDefault={async () => {
			try {
				await sendPasswordResetEmail(auth, email);
				sent = true;
			} catch (err) {
				console.log(err);
				error = 'Unexpected error.';
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
			Send Email
		</button>
	</form>
{:else}
	<p>
		An email has been sent to {email}. Please check your inbox and spam folders a link to recover
		your password
	</p>
{/if}
