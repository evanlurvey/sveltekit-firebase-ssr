<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentUserCtx, firebaseCtx } from '$lib/firebase';
	import { applyActionCode } from 'firebase/auth';
	import { onMount } from 'svelte';

	const auth = firebaseCtx().getAuth();
	const currentUser = currentUserCtx();

	let code = $page.url.searchParams.get('code');
	if (!code && browser) {
		goto('/auth/forgot-password');
	}
	let error = '';
	onMount(async () => {
		try {
			await applyActionCode(auth, code ?? '');
			if (auth.currentUser) {
				const id_token = await auth.currentUser.getIdToken(true);
				await fetch('/api/session-sync', {
					method: 'post',
					body: JSON.stringify({ id_token })
				});
				currentUser.update((user) => {
					if (user) {
						user.emailVerified = true;
					}
					return user;
				});
			}
			goto('/auth/login');
		} catch (err) {
			error = err;
		}
	});
</script>

{#if error}
	<p>{error}</p>
{:else}
	<p>Verifying code...</p>
{/if}
