<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { currentUserCtx } from '$lib/firebase';

	const currentUser = currentUserCtx();

	$: if (!$currentUser && browser) {
		goto('/auth/login');
	}
</script>

<slot />
