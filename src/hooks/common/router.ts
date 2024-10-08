import { useRouter } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';
import type { RouteKey, RouteMap } from '@elegant-router/types';
import { router as globalRouter } from '@/router';

/**
 * Router push
 *
 * Jump to the specified route, it can replace function router.push
 *
 * @param inSetup Whether is in vue script setup
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter;
  const route = globalRouter.currentRoute;

  const routerPush = router.push;

  const routerBack = router.back;

  interface RouterPushOptions {
    query?: Record<string, string>;
    params?: Record<string, string>;
  }

  async function routerPushByKey(key: RouteKey, options?: RouterPushOptions) {
    const { query, params } = options || {};

    const routeLocation: RouteLocationRaw = {
      name: key
    };

    if (Object.keys(query || {}).length) {
      routeLocation.query = query;
    }

    if (Object.keys(params || {}).length) {
      routeLocation.params = params;
    }

    return routerPush(routeLocation);
  }

  async function routerPushByPath(path: RouteMap[RouteKey], options?: RouterPushOptions) {
    const { query } = options || {};

    const routeLocation: RouteLocationRaw = {
      path
    };

    if (Object.keys(query || {}).length) {
      routeLocation.query = query;
    }

    return routerPush(routeLocation);
  }

  function routerPushByKeyWithMetaQuery(key: RouteKey) {
    const allRoutes = router.getRoutes();
    const meta = allRoutes.find(item => item.name === key)?.meta || null;

    const query: Record<string, string> = {};

    meta?.query?.forEach(item => {
      query[item.key] = item.value;
    });

    return routerPushByKey(key, { query });
  }

  async function toHome() {
    return routerPushByKey('root');
  }

  /**
   * Redirect from login
   *
   * @param [needRedirect=true] Whether to redirect after login. Default is `true`
   */
  async function redirectFromLogin(needRedirect = true) {
    const redirect = route.value.query?.redirect as string;

    if (needRedirect && redirect) {
      routerPush(redirect);
    } else {
      toHome();
    }
  }

  return {
    routerPush,
    routerBack,
    routerPushByKey,
    routerPushByKeyWithMetaQuery,
    routerPushByPath,
    redirectFromLogin
  };
}
