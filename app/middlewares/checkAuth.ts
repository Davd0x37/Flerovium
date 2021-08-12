import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useStore } from '@/store/main';

export default function checkAuth(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  // FIXME: move outside checkAuth?
  const store = useStore();

  if (store.isAuthenticated) {
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
