import { NavigationGuardNext } from 'vue-router';

export default function checkAuth(
	next: NavigationGuardNext,
	isAuthenticated: boolean,
) {
	if (isAuthenticated) {
		next();
	} else {
		// @FIXME: add checking url because of infinite redirect
		next('/profile/data');
	}
}
