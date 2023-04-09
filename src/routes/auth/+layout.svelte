<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/firebase';

	$: if ($currentUser) {
		goto('/chat');
	}
</script>

<div class="flex flex-col items-center grow p-4">
	<div
		class="flex flex-col gap-4 p-8 mt-10 w-full max-w-xl bg-white rounded-xl border shadow-xl"
	>
		<slot />
	</div>
</div>
