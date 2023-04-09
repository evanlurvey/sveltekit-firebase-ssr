import { adminAuth } from '$lib/server/firebase';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// No user found
	if (!locals.uid) {
		return {};
	}
	// User found
	const userRecord = await adminAuth().getUser(locals.uid);
	if (!userRecord.email) {
		throw error(500, {
			message: 'any account on this site must have an email'
		});
	}
	const user = {
		uid: userRecord.uid,
		email: userRecord.email,
		emailVerified: userRecord.emailVerified,
		name: userRecord.displayName ?? userRecord.email
	};
	return { user };
};
