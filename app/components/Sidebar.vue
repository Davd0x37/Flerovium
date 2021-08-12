<template>
  <div class="w-72 px-2 h-full">
    <div id="menu">
      <div v-for="item in paths()" :key="item.title" :to="item.path">
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

<script lang="ts">
import { defineComponent } from 'vue';
import {
  RouteRecordName,
  RouteRecordNormalized,
  RouteRecordRaw,
} from 'vue-router';

import SidebarLink from '@/components/SidebarLink.vue';
import { Service } from '@/types/service';
import { useServiceStore } from '@/store/service';
import { PlusAction, SidebarPath } from '@/types/sidebar';

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarLink,
  },

  setup() {
    const serviceStore = useServiceStore();

    return {
      serviceStore,
    };
  },

  methods: {
    getServices(): SidebarPath[] {
      return this.serviceStore.servicesList.map((service: Service) => ({
        title: service.name,
        icon: service.config.icon,
        color: service.config.color,
        path: {
          name: 'ServicesView',
          params: {
            name: service.name,
          },
        },
      }));
    },

    translatePath(name: string): string {
      return this.$t(`routes.${name}`);
    },

    normalizePath(route: RouteRecordNormalized | RouteRecordRaw): SidebarPath {
      const { name, children: nodes, meta } = route;
      // Always add name to path as it will be used for translation
      const title = this.translatePath(name!.toString());
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
        children = nodes!.map(node => this.normalizePath(node));
      } else if (listServices) {
        children = this.getServices();
      }

      return {
        title,
        icon,
        path,
        children,
        ...(actions ? { actions } : {}),
      };
    },

    paths() {
      const routes = this.$router
        .getRoutes()
        .filter(route => route.meta.inSidebar)
        .map(route => this.normalizePath(route));

      return routes;
    },
  },
});
</script>

<style lang="postcss"></style>
