<script lang="ts">
	import { queryReadableStore, typedCollection } from '$lib/firebase';
	import { addDoc, orderBy, query, Timestamp } from 'firebase/firestore';

	type Chat = { id?: string; msg: string; from: typeof data.user; timestamp: Timestamp };

	const chats = typedCollection<Chat>('chats');

	const q = query(chats, orderBy('timestamp', 'desc'));

	const chatsStore = queryReadableStore(q);
	let message = '';
	export let data;
</script>

<div class="flex flex-col gap-4 p-2">
	<form
		on:submit|preventDefault={() => {
			addDoc(chats, {
				msg: message,
				from: data.user,
				timestamp: Timestamp.now()
			});
			message = '';
		}}
		class="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg"
	>
		<label class="flex flex-col font-medium">
			Message:
			<input
				class="p-1 rounded border focus:ring focus:ring-indigo-500 focus:outline-none"
				type="text"
				name="message"
				bind:value={message}
			/>
		</label>
		<button class="py-2 px-4 text-white bg-blue-500 rounded-md" type="submit"> Send </button>
	</form>
	<div class="flex flex-col gap-1">
		{#if $chatsStore}
			{#each $chatsStore as chat}
				<div class="flex gap-2">
					<div
						style="line-height:1"
						class="grid place-items-center py-1 px-2 text-lg font-bold bg-green-200 rounded-full"
					>
						{chat.from.name}
					</div>
					{chat.msg}
				</div>
			{/each}
		{/if}
	</div>
</div>
