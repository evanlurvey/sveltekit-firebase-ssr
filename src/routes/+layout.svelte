<script lang="ts">
	import { currentUser, logOut } from '$lib/firebase';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	currentUser.update((user) => {
		if (user) {
			return user;
		}
		return data.user ?? null;
	});
	$: console.log($currentUser);
</script>

<div class="flex flex-col">
	<header class="flex justify-between items-center py-1 px-2 text-white bg-indigo-700 shadow-lg">
		<p class="text-lg font-black">Firebase + SvelteKit</p>
		{#if $currentUser}
			<div class="flex gap-1">
				<span>
					Welcome,
					<a href="/profile" class="font-bold underline">{$currentUser.name}</a>
				</span>
				<form on:submit|preventDefault={logOut}>
					<button class="py-1 px-2 text-xs rounded border">Logout</button>
				</form>
			</div>
		{:else}
			<a href="/auth/login" class="py-1 px-2 text-xs rounded border">Login</a>
		{/if}
	</header>

	{#if $currentUser && !$currentUser.emailVerified}
		<div class="px-2 m-2 text-sm text-red-900 bg-red-300 rounded border border-red-500 shadow">
			Hey {$currentUser.name}, we sent an email to
			<span class="underline">{$currentUser.email}</span> to verify your account. Please check your inbox
			and click the link to verify your account.
		</div>
	{/if}

	<slot />
</div>
