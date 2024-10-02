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
    name: 'generate-pic',
    path: '/generate-pic',
    component: 'layout.blank$view.generate-pic',
    meta: {
      title: 'generate-pic',
      i18nKey: 'route.generate-pic',
      hideInMenu: true
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
    name: 'test-home',
    path: '/test-home',
    component: 'layout.base$view.test-home',
    meta: {
      title: 'test-home',
      i18nKey: 'route.test-home',
      hideInMenu: true,
      isBlank: true
    }
  },
  {
    name: 'test-subject',
    path: '/test-subject',
    component: 'layout.base$view.test-subject',
    meta: {
      title: 'test-subject',
      i18nKey: 'route.test-subject',
      hideInMenu: true,
      isBlank: true
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
  },
  {
    name: 'write-chat',
    path: '/write-chat',
    component: 'layout.blank$view.write-chat',
    meta: {
      title: 'write-chat',
      i18nKey: 'route.write-chat',
      hideInMenu: true
    }
  },
  {
    name: 'write-chat-home',
    path: '/write-chat-home',
    component: 'layout.blank$view.write-chat-home',
    meta: {
      title: 'write-chat-home',
      i18nKey: 'route.write-chat-home',
      hideInMenu: true
    }
  },
  {
    name: 'write-composition',
    path: '/write-composition',
    component: 'layout.blank$view.write-composition',
    meta: {
      title: 'write-composition',
      i18nKey: 'route.write-composition',
      hideInMenu: true
    }
  }
];
