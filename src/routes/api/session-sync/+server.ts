import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { adminAuth } from '$lib/server/firebase';
import { dev } from '$app/environment';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { id_token } = await request.json();
	try {
		const cookieValue = await adminAuth().verifyIdToken(id_token, true);
		const now = new Date().getTime() / 1000;
		const maxAge = cookieValue.exp - now;
		cookies.set('id_token', id_token, { maxAge, httpOnly: true, secure: !dev, path: '/' });
		console.log('token sync, new expire ', new Date(cookieValue.exp * 1000).toLocaleString());
	} catch (error) {
		// We cheat and use this to catch logouts as well
		cookies.delete('id_token', { path: '/' });
	}

	return json({ message: 'session synced' });
};
