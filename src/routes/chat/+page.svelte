<script lang="ts">
	import { queryReadableStore, typedCollection } from '$lib/firebase';
	import {
		addDoc,
		orderBy,
		query,
		Timestamp,
	} from 'firebase/firestore';

	type Chat = { id?: string; msg: string; from: string; timestamp: Timestamp };

	const chats = typedCollection<Chat>('chats')

	const q = query(
		chats,
		orderBy('timestamp', 'desc')
	);

	const chatsStore = queryReadableStore(q);
	let message = '';
	let from = '';
</script>

<div class="flex flex-col gap-4 py-2 px-4 min-h-screen bg-gray-200">
	<div class="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-lg">
		<label>
			Message
			<input class="rounded border" type="text" bind:value={message} />
		</label>
		<label class="flex gap-2">
			From
			<input class="rounded border" type="text" bind:value={from} />
		</label>
		<button
			class="py-2 px-4 text-white bg-blue-500 rounded-md"
			on:click={() => {
				addDoc(chats, {
					msg: message,
					from: from,
					timestamp: Timestamp.now()
				});
				message = '';
			}}
		>
			Send
		</button>
	</div>
	<div class="flex flex-col gap-1">
		{#if $chatsStore}
			{#each $chatsStore as chat}
				<div class="flex gap-2">
					<div
						style="line-height:1"
						class="grid place-items-center p-1 text-lg font-bold bg-green-200 rounded-full"
					>
						{chat.from.slice(0, 1).toUpperCase()}
					</div>
                    {chat.id}

					{chat.msg}
				</div>
			{/each}
		{/if}
	</div>
</div>
