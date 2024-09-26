import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { fetchLogin, fetchOffSpringId, fetchUserInfo } from '@/service/api/login';
import { localStg } from '@/utils/storage';
import { $t } from '@/locales';
import { useLoginTypeStoreWithOut } from '@/store/modules/login';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { clearAuthStorage, getOffSpriingId, getToken, getUserInfoPreisit } from './shared';
const LoginTypeStoreWithOut = useLoginTypeStoreWithOut();
export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  // const route = useRoute();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();
  const { redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref(getToken());
  const offSpriingId = ref(getOffSpriingId());

  const userInfo: Api.Auth.offSpriingId = reactive(getUserInfoPreisit());

  const kidList: Api.Auth.offSpriingId[] | [] = reactive(localStg.get('kidList') || []);

  /** is super role in static route */
  // const isStaticSuper = computed(() => {
  //   const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

  //   return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  // });

  /** Is login */
  const isLogin = computed(() => Boolean(token.value) && Boolean(offSpriingId.value));

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore();

    clearAuthStorage();

    token.value = '';

    offSpriingId.value = '';

    Object.assign(userInfo, {
      avatar: '',
      birthday: 0,
      create_time: null,
      delete_time: null,
      update_time: null,
      description: '',
      id: 0,
      name: '',
      sex: 0,
      status: 0,
      user_id: 0
    });

    authStore.$reset();

    await redirectFromLogin();

    tabStore.cacheTabs();
    routeStore.resetStore();
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(mobile: string, code: string) {
    startLoading();

    const { data: loginToken, error } = await fetchLogin(mobile, code);

    if (!error) {
      localStg.set('token', loginToken);
      token.value = loginToken;
      const { data: offSpriingid, error: err } = await fetchOffSpringId();
      if (!err) {
        Object.assign(kidList, offSpriingid);
        localStg.set('kidList', kidList);
      }
    } else {
      resetStore();
    }

    endLoading();
  }

  async function getUserInfo(chooseIndex: number) {
    const osid = kidList[chooseIndex].id;
    const { data: info, error } = await fetchUserInfo(osid);
    console.log('🚀 ~ getUserInfo ~ info:', info);

    if (!error) {
      localStg.set('Offspriingid', String(kidList[chooseIndex].id));
      localStg.set('UserInfo', info);
      offSpriingId.value = String(kidList[chooseIndex].id);

      // update store
      Object.assign(userInfo, info);

      await routeStore.initAuthRoute();

      setTimeout(async () => {
        await redirectFromLogin(true);

        if (routeStore.isInitAuthRoute) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            content: $t('page.login.common.welcomeBack', { userName: userInfo.name }),
            duration: 4500
          });
          LoginTypeStoreWithOut.close();
        }
      }, 500);
    }
    console.log('🚀 ~ getUserInfo ~ info:', info);

    return false;
  }

  async function initUserInfo() {
    const hasToken = getToken();
    const hasOffSpriingId = getOffSpriingId();

    if (hasToken && hasOffSpriingId) {
      const { data: info, error } = await fetchUserInfo(getOffSpriingId());
      if (!error) {
        Object.assign(userInfo, info);
      }
    } else {
      resetStore();
    }
  }

  return {
    token,
    kidList,
    offSpriingId,
    userInfo,
    getUserInfo,
    // isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    initUserInfo
  };
});
