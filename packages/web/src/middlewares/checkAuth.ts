import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import store from '@/store';
import { GETTERS } from '@/store/names';

export default function checkAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const isAuthenticated = store.getters[GETTERS.IS_AUTHENTICATED];

  if (isAuthenticated) {
    if (to.meta.isAuth) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    // If user is authenticated and wants to log out
    // user is redirected to welcome page, however when we do that
    // infinite redirect happen and crash is inevitable
    // so to prevent it, we must check if user is not redirected to
    // welcome page from for example header
    // then we can redirect to welcome page
    if (!to.meta.isAuth) {
      next({ name: 'WelcomeDefault' });
    }
    next();
  }
}
