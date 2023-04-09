import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const mode = url.searchParams.get('mode');
	const oobCode = url.searchParams.get('oobCode');
	if (mode == 'resetPassword') {
		throw redirect(303, '/auth/recover-password?code=' + oobCode);
	} else if (mode === 'verifyEmail') {
		throw redirect(303, '/auth/verify-email?code=' + oobCode);
	}
};
