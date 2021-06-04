<template>
  <div v-cloak>
    <div class="no-horizontal-scroll">
      <div class="main theme-container" :class="containerClass">
        <HeaderMain @toggle-sidebar="toggleSidebar" />
        <div v-if="frontmatter.home">
          <HomePage />
          <div class="sidebar-mask" @click="toggleSidebar(false)" />
          <div
            style="
              position: fixed;
              top: 80px;
              height: 100vh;
              z-index: 1000;
              background-color: #fff;
            "
          >
            <Sidebar class="docs-sidebar docs-sidebar-on-homepage" style="padding-top: 10px"></Sidebar>
          </div>
        </div>
        <div class="body" v-else>
          <div class="content" style="max-width: 100vw; margin-top: 10px">
            <Transition
              name="fade-slide-y"
              mode="out-in"
              @before-enter="onBeforeEnter"
              @before-leave="onBeforeLeave"
            >
              <PageMain :key="page.path"></PageMain>
            </Transition>
            <HorizontalDivider style="margin-top: 60px" />
            <div class="docs-footer">
              <div>
                <p
                  style="
                    font-size: 14px;
                    font-weight: 550;
                    color: #4f4f4f;
                    line-height: 1.0;
                    margin-bottom: 10px;
                  "
                >
                  © Copyright · 2020 - 2021 · Lingxi Li
                </p>
                Supported by Taci® with ❤️.
              </div>
            </div>
          </div>
          <div class="sidebar-mask" @click="toggleSidebar(false)" />
          <div
            style="
              position: fixed;
              top: 80px;
              height: 100vh;
              z-index: 1000;
              background-color: #fff;
            "
          >
            <Sidebar class="docs-sidebar" style="padding-top: 10px"></Sidebar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HorizontalDivider from "../components/elements/HorizontalDivider.vue";
import HeaderMain from "../components/HeaderMain.vue";
import PageMain from "../components/PageMain.vue";

import HomePage from "./HomePage.vue";

import Sidebar from "@vuepress/theme-default/lib/client/components/Sidebar.vue";

import { useScrollPromise } from "@vuepress/theme-default/lib/client/composables";

import { usePageData, usePageFrontmatter } from "@vuepress/client";
import type { DefaultThemePageFrontmatter } from "@vuepress/theme-default/lib/shared";

import { computed, ref, Transition } from "vue";

export default {
  components: {
    HorizontalDivider,
    HeaderMain,
    PageMain,
    HomePage,
    Sidebar,
    Transition
  },
  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();

    const containerClass = computed(() => [
      {
        "sidebar-open": isSidebarOpen.value,
      },
      frontmatter.value.pageClass,
    ]);

    // sidebar
    const isSidebarOpen = ref(false);
    const toggleSidebar = (to?: boolean): void => {
      isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
    };

    // handle scrollBehavior with transition
    const scrollPromise = useScrollPromise()
    const onBeforeEnter = scrollPromise.resolve
    const onBeforeLeave = scrollPromise.pending

    return {
      page,
      frontmatter,
      containerClass,
      toggleSidebar,
      onBeforeEnter,
      onBeforeLeave
    };
  },
};
</script>