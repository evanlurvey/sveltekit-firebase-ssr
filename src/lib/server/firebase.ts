import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

export const adminApp = admin.initializeApp({
	credential: applicationDefault()
});

export const adminAuth = adminApp.auth;
