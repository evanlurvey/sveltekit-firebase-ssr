<script lang="ts">
	import { setContext } from 'svelte';
	import { firebaseKey, initFirebase, initUserStore, currentUserKey } from './firebase';
	import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
	import { getFirestore } from 'firebase/firestore';
	import type { AppUser } from './models';

	export let user: AppUser | null;

	console.log('firebase ctx constructor', user);

	const app = initFirebase();
	const auth = initializeAuth(app, {
		persistence: indexedDBLocalPersistence
	});
	const db = getFirestore(app);

	const getFirebase = () => app;
	const getAuth = () => auth;
	const getDB = () => db;
	setContext(firebaseKey, {
		getFirebase,
		getAuth,
		getDB
	});

	const currentUser = initUserStore(auth, user);
	$: console.log('firebase ctx', $currentUser);
	setContext(currentUserKey, currentUser);
</script>

<slot currentUser={$currentUser} {getAuth} />
