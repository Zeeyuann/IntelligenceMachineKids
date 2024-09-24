/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { GeneratedRoute } from '@elegant-router/types';

export const generatedRoutes: GeneratedRoute[] = [
  {
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '404',
    path: '/404',
    component: 'layout.blank$view.404',
    meta: {
      title: '404',
      i18nKey: 'route.404',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '500',
    path: '/500',
    component: 'layout.blank$view.500',
    meta: {
      title: '500',
      i18nKey: 'route.500',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'classroom',
    path: '/classroom',
    component: 'layout.base$view.classroom',
    meta: {
      title: 'classroom',
      i18nKey: 'route.classroom',
      constant: true,
      icon: '',
      order: 1
    }
  },
  {
    name: 'home',
    path: '/home',
    component: 'layout.base$view.home',
    meta: {
      title: 'home',
      constant: true,
      i18nKey: 'route.home',
      icon: '',
      order: 0
    }
  },
  {
    name: 'iframe-page',
    path: '/iframe-page/:url',
    component: 'layout.base$view.iframe-page',
    props: true,
    meta: {
      title: 'iframe-page',
      i18nKey: 'route.iframe-page',
      constant: true,
      hideInMenu: true,
      keepAlive: true
    }
  },
  {
    name: 'paint',
    path: '/paint',
    component: 'layout.base$view.paint',
    meta: {
      title: '智能绘图',
      constant: true,
      icon: '',
      order: 3,
      i18nKey: 'route.paint'
    }
  },
  {
    name: 'write',
    path: '/write',
    component: 'layout.base$view.write',
    meta: {
      title: '文本创作',
      constant: true,
      icon: '',
      order: 2,
      i18nKey: 'route.write'
    }
  }
];
