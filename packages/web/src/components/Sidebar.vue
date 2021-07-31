<template>
  <div class="w-72 px-2 h-full">
    <div id="menu">
      <div v-for="item in paths()" :key="item.title" :to="item.path">
        <div class="flex items-end flex-row">
          <sidebar-link
            :href="item.path"
            :icon="item.icon"
            size="la-2x"
            :class="item.plusAction ? 'pr-2' : ''"
            >{{ item.title }}</sidebar-link
          >

          <sidebar-link
            v-if="item.plusAction"
            :href="item.plusAction.path"
            :icon="item.plusAction.icon"
            iconOnly
            size="la-2x"
            class="w-12"
          />
        </div>
        <div class="flex flex-col items-end" v-if="item.children">
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

import SidebarLink from '@/components/SidebarLink.vue';
import { Service } from '@/store/modules/services/types';
import { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import { GETTERS } from '@/store/names';

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarLink,
  },

  methods: {
    getServices() {
      return this.$store.getters[GETTERS.SERVICES_LIST]().map(
        (service: Service) => ({
          title: service.name,
          icon: service.config.icon,
          color: service.config.color,
          path: {
            name: 'ServicesView',
            params: {
              name: service.name,
            },
          },
        }),
      );
    },

    translatePath(name: string): string {
      return this.$t(`routes.${name}`);
    },

    // @FIXME: Create type for normalized path, dont' use any
    normalizePath(route: RouteRecordNormalized | RouteRecordRaw): any {
      const { name, children: nodes, meta } = route;

      // Always add name to path as it will be used for translation
      const translated = this.translatePath(name!.toString());

      const icon = meta?.icon;
      const plusAction: any = meta?.plusAction && {
        // @FIXME: don't use 'as any', fix it
        icon: (meta.plusAction as any).icon,
        path: {
          name: (meta.plusAction as any).pathName,
        },
      };
      // const listServices = meta?.listServices && this.getServices();

      // 1. Check for non-script paths and return as array
      // 2. Check if scripts path should list services
      const children = meta?.includeChildren
        ? nodes?.map(node => this.normalizePath(node))
        : meta?.listServices
        ? this.getServices()
        : null;

      return {
        title: translated,
        path: {
          name,
        },
        children,
        icon,

        ...(plusAction ? { plusAction } : {}),
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
