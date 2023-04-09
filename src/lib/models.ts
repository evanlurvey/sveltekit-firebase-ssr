export type UserProfile = {
	id: string;
	display_name: string;
};

export type AppUser = {
	uid: string;
	email: string;
	emailVerified: boolean;
	name: string;
};

// export type NewUserProfile = Omit<UserProfile, 'id'>;
