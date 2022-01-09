<template>
  <div class="w-72 px-2 h-full">
    <div id="menu">
      <div v-for="item in paths" :key="item.title" :to="item.path">
        <div class="flex items-end flex-row">
          <sidebar-link
            :href="item.path"
            :icon="item.icon"
            size="la-2x"
            :class="item.actions ? 'pr-2' : ''"
            >{{ item.title }}</sidebar-link
          >

          <sidebar-link
            v-if="item.actions"
            :href="item.actions.path"
            :icon="item.actions.icon"
            icon-only
            size="la-2x"
            class="w-12"
          />
        </div>
        <div v-if="item.children" class="flex flex-col items-end">
          <div
            v-for="child in item.children"
            :key="child.title"
            :to="child.path"
            class="w-5/6"
          >
            <sidebar-link
              :href="child.path"
              :icon="child.icon"
              :color="child.color"
              size="la-2x"
              >{{ child.title }}</sidebar-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  RouteRecordName,
  RouteRecordNormalized,
  RouteRecordRaw,
  useRouter,
} from 'vue-router';

import SidebarLink from '@/components/SidebarLink.vue';
import { Service } from '@/types/service';
import { useServiceStore } from '@/store/service';
import { PlusAction, SidebarPath } from '@/types/sidebar';

import { $t } from '@/plugins/i18n';

const serviceStore = useServiceStore();
const $router = useRouter();

const servicesList = computed(() =>
  serviceStore.servicesList.map((service: Service) => ({
    title: service.name,
    icon: service.config.icon,
    color: service.config.color,
    path: {
      name: 'ServicesView',
      params: {
        name: service.name,
      },
    },
  })),
);

function translatePath(name: string): string {
  return $t(`routes.${name}`);
}

function normalizePath(
  route: RouteRecordNormalized | RouteRecordRaw,
): SidebarPath {
  const { name, children: nodes, meta } = route;
  // Always add name to path as it will be used for translation
  const title = translatePath((name as RouteRecordName).toString());
  const path = { name } as { name: RouteRecordName };

  const icon = meta?.icon as string;
  const metaActions = meta?.plusAction as PlusAction | undefined;
  const actions = metaActions
    ? {
        icon: metaActions.icon || '',
        path: {
          name: metaActions.pathName || '',
        },
      }
    : null;

  // 1. Check for non-script paths and return as array
  // 2. Check if scripts path should list services
  const included = meta?.includeChildren as boolean | undefined;
  const listServices = meta?.listServices as boolean | undefined;
  let children: SidebarPath[] = [];

  if (included) {
    children = (nodes as RouteRecordRaw[]).map(node => normalizePath(node));
  } else if (listServices) {
    children = servicesList.value;
  }

  return {
    title,
    icon,
    path,
    children,
    ...(actions ? { actions } : {}),
  };
}

const paths = computed(() =>
  $router
    .getRoutes()
    .filter(route => route.meta.inSidebar)
    .map(route => normalizePath(route)),
);
</script>
