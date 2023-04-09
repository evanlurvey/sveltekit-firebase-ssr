
<script lang="ts">
	import { auth } from '$lib/firebase';
	import { updateProfile } from 'firebase/auth';
</script>

<div class="flex">
	<form
		class="flex flex-col gap-2 p-1"
		on:submit|preventDefault={async (e) => {
			console.log('submitting');
			const form = e.currentTarget;
			const data = new FormData(form);
			const name = data.get('new_name');
			const user = auth.currentUser;
			if (!user || !name) {
				alert('how did you get here?');
				return;
			}
			try {
				await updateProfile(user, { displayName: name });
                await user.getIdToken(true); // this triggers the callback and updates name everywhere
			} catch (e) {
				console.log(e);
			}
		}}
	>
		<label class="flex flex-col">
			<span>Display Name:</span>
			<input class="border" type="text" name="new_name" />
		</label>
		<button class="py-1 px-2 text-white bg-blue-600 rounded shadow" type="submit">Update</button>
	</form>
</div>
