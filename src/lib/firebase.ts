import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
	collection,
	// DocumentReference,
	onSnapshot,
	Query,
	CollectionReference,
	type DocumentData,
	getFirestore,
	Firestore
} from 'firebase/firestore';
import {
	initializeAuth,
	signOut,
	indexedDBLocalPersistence,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
	type Auth
} from 'firebase/auth';
import {
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
	PUBLIC_FIREBASE_APP_ID
} from '$env/static/public';
import { writable, readable } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import type { AppUser } from './models';
import { getContext } from 'svelte';

export function initFirebase() {
	console.log('init firebase');
	return initializeApp({
		apiKey: PUBLIC_FIREBASE_API_KEY,
		authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
		appId: PUBLIC_FIREBASE_APP_ID,
		databaseURL: `https://${PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
	});
}

export const firebaseKey = Symbol();
export const firebaseCtx = () =>
	getContext<{
		getFirebase(): FirebaseApp;
		getAuth(): Auth;
		getDB(): Firestore;
	}>(firebaseKey);

export const currentUserKey = Symbol();
export const currentUserCtx = () => getContext<ReturnType<typeof initUserStore>>(currentUserKey);

export const initUserStore = (auth: Auth, user: AppUser | null) => {
	const currentUser = writable(user);
	if (browser) {
		//  we really never want to un subscribe from this
		auth.onIdTokenChanged(async (user) => {
			if (user) {
				const id_token = await user.getIdToken();
				console.log('starting session-sync');
				await fetch('/api/session-sync', {
					method: 'post',
					body: JSON.stringify({ id_token })
				});
				console.log('finished session-sync');
				// for typescript
				if (!user.email) {
					return;
				}
				currentUser.set({
					uid: user.uid,
					email: user.email,
					emailVerified: user.emailVerified,
					name: user.displayName ?? user.email
				});
			} else {
				console.log('firebase said no users');
				currentUser.set(null);
			}
		});
	}
	return currentUser;
};

export const logOut = (auth: Auth) => async () => {
	await signOut(auth);
	await fetch('/api/session-sync', {
		method: 'post',
		body: JSON.stringify({ id_token: null })
	});
	goto('/auth/login');
};

export const login = async (auth: Auth, email: string, password: string) => {
	const userCred = await signInWithEmailAndPassword(auth, email, password);
	const id_token = await userCred.user.getIdToken();
	await fetch('/api/session-sync', {
		method: 'post',
		body: JSON.stringify({ id_token })
	});
	goto('/chat');
};

export const createAccount = async (auth: Auth, name: string, email: string, password: string) => {
	const userCred = await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(userCred.user, { displayName: name });
	await sendEmailVerification(userCred.user);
	const id_token = await userCred.user.getIdToken(true);
	await fetch('/api/session-sync', {
		method: 'post',
		body: JSON.stringify({ id_token })
	});
	goto('/chat');
};

export const typedCollection = <T = DocumentData>(db: Firestore, collectionName: string) => {
	getContext(firebaseKey);
	return collection(db, collectionName) as CollectionReference<T>;
};

export function queryReadableStore<T>(q: Query<T>) {
	return readable<T[] | undefined>(undefined, (set) =>
		onSnapshot(q, (ss) => {
			const arr = [] as T[];
			ss.forEach((doc) => {
				arr.push({ id: doc.id, ...doc.data() });
			});
			set(arr);
		})
	);
}

// export function documentReadableStore<T>(ref: DocumentReference<T>) {
// 	return readable<(T & { id: string }) | undefined>(undefined, (set) =>
// 		onSnapshot(ref, (ss) => {
// 			const data = ss.data();
// 			if (data) {
// 				set({ id: ss.id, ...data });
// 			} else {
// 				set(undefined);
// 			}
// 		})
// 	);
// }
