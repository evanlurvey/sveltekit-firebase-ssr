<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/firebase';

	$: if (!$currentUser && browser) {
		goto('/auth/login');
	}
</script>

<slot />
