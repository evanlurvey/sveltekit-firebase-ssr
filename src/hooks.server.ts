import { adminAuth } from '$lib/server/firebase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let uid: typeof event.locals.uid;
	const cookieValue = event.cookies.get('id_token');
	if (cookieValue) {
		try {
			const token = await adminAuth().verifyIdToken(cookieValue, true);
			console.log('token expires at', new Date(token.exp * 1000).toLocaleString());
			uid = token.uid;
		} catch (e) {
			console.log('error in auth hook', e);
			event.cookies.delete('id_token', { path: '/' });
		}
	}
	event.locals.uid = uid;

	const response = await resolve(event);

	return response;
};
