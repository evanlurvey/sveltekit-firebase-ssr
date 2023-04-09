<script lang="ts">
	import { currentUser, logOut } from '$lib/firebase';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$currentUser = data.user ?? null;
</script>

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

<slot />
