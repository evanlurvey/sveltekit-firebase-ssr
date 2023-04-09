<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/firebase';

	$: if (!$currentUser) {
		goto('/auth/login');
	}
</script>

<slot />
