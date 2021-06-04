<template>
  <header class="docs-header">
    <div class="container">
      <div style="width: 100%; height: 100%; background: #fff">
        <div
          style="
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
          "
        >
          <el-button
            class="for-pad"
            icon="el-icon-minus"
            size="mini"
            @click="$emit('toggle-sidebar')"
            style="
              margin-left: 20px;
              color: #cfcfcf;
              font-size: 15px;
              padding: 7px;
              display: inline-block;
            "
            plain
          >
          </el-button>
          <div class="header-logo-div">
            <div class="header-logo-div-container">
              <img
                src="../images/header-logo.png"
                alt="Taci Docs"
              />
            </div>
          </div>
          <!-- 以下开始 NavBar 内容 -->
          <div v-if="navbarLinks.length" align="left" class="for-desktop navigation">
            <div v-for="item in navbarLinks" :key="item.link" style="height: 100%; display: inline-flex; vertical-align: middle">
              <div v-if="item.children">
                <el-dropdown style="height: 100%">
                  <span class="el-dropdown-link">
                    <el-link href="javascript:void(0)" class="navigation-link" type="primary">
                      {{ item.text }}<i class="el-icon-arrow-down el-icon--right" style="margin-right: -3px"></i>
                    </el-link>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-for="(child, index) in item.children"
                        :key="child.link || index"
                        @click="$router.push(child.link)"
                        :icon="child.icon === '' ? no_icon : child.icon"
                      >
                        {{ child.text }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
              <el-link v-else :href="item.link" class="navigation-link" type="primary">
                {{ item.text }}
              </el-link>
            </div>
          </div>
          <!-- 以上结束 NavBar 内容 -->
          <div class="for-desktop" style="position: absolute; right: 20px;">
            <el-button
              style="
                font-size: 15px;
                display: inline-block;
              "
              type="primary"
              plain
            >
              <b>进入世界</b>
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <HorizontalDivider
      style="position: fixed; margin-top: 79px; z-index: 2000"
    />
  </header>
</template>

<script lang="ts">
import HorizontalDivider from "./elements/HorizontalDivider.vue";
import VerticalDivider from "./elements/VerticalDivider.vue";

import { computed, defineComponent } from "@vue/runtime-core";
import type { ComputedRef } from "@vue/runtime-core";

import { useRouter } from 'vue-router';
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client';
import { isString } from '@vuepress/shared';

import type { NavbarItem, NavbarGroup, ResolvedNavbarItem } from "@vuepress/theme-default/lib/shared";
import { useNavLink, useThemeLocaleData } from '@vuepress/theme-default/lib/client/composables';
import { resolveRepoType } from '@vuepress/theme-default/lib/client/utils';

/**
 * Get navbar config of select language dropdown
 */
const useNavbarSelectLanguage = (): ComputedRef<ResolvedNavbarItem[]> => {
  const router = useRouter()
  const routeLocale = useRouteLocale()
  const siteLocale = useSiteLocaleData()
  const themeLocale = useThemeLocaleData()

  return computed<ResolvedNavbarItem[]>(() => {
    const localePaths = Object.keys(siteLocale.value.locales)
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return []
    }
    const currentPath = router.currentRoute.value.path
    const currentFullPath = router.currentRoute.value.fullPath

    const languageDropdown: ResolvedNavbarItem = {
      text: themeLocale.value.selectLanguageText ?? 'unkown language',
      ariaLabel: themeLocale.value.selectLanguageAriaLabel ?? 'unkown language',
      children: localePaths.map((targetLocalePath) => {
        // target locale config of this langauge link
        const targetSiteLocale =
          siteLocale.value.locales?.[targetLocalePath] ?? {}
        const targetThemeLocale =
          themeLocale.value.locales?.[targetLocalePath] ?? {}
        const targetLang = `${targetSiteLocale.lang}`

        const text = targetThemeLocale.selectLanguageName ?? targetLang
        let link

        if (targetLang === siteLocale.value.lang) {
          // if the target language is current language
          // stay at current link
          link = currentFullPath
        } else {
          // if the target language is not current language
          // try to link to the corresponding page of current page
          // or fallback to homepage
          const targetLocalePage = currentPath.replace(
            routeLocale.value,
            targetLocalePath
          )
          if (
            router.getRoutes().some((item) => item.path === targetLocalePage)
          ) {
            link = targetLocalePage
          } else {
            link = targetThemeLocale.home ?? targetLocalePath
          }
        }

        return {
          text,
          link,
        }
      }),
    }

    return [languageDropdown]
  })
}

/**
 * Get navbar config of repository link
 */
const useNavbarRepo = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocale = useThemeLocaleData()

  const repo = computed(() => themeLocale.value.repo)
  const repoType = computed(() =>
    repo.value ? resolveRepoType(repo.value) : null
  )

  const repoLink = computed(() => {
    if (repoType.value === 'GitHub') {
      return `https://github.com/${repo.value}`
    }
    return repo.value
  })

  const repoLabel = computed(() => {
    if (!repoLink.value) return null
    if (themeLocale.value.repoLabel) return themeLocale.value.repoLabel
    if (repoType.value === null) return 'Source'
    return repoType.value
  })

  return computed(() => {
    if (!repoLink.value || !repoLabel.value) {
      return []
    }

    return [
      {
        text: repoLabel.value,
        link: repoLink.value,
      },
    ]
  })
}

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) {
    return useNavLink(item)
  }
  if ((item as NavbarGroup).children) {
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    }
  }
  return item as ResolvedNavbarItem
}

const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocale = useThemeLocaleData()
  return computed(() => (themeLocale.value.navbar || []).map(resolveNavbarItem))
}

export default defineComponent({
  name: "HeaderMain",
  components: {
    HorizontalDivider,
    VerticalDivider,
  },
  emits: ["toggle-sidebar"],
  setup() {
    const navbarConfig = useNavbarConfig()
    const navbarSelectLanguage = useNavbarSelectLanguage()
    const navbarRepo = useNavbarRepo()

    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value,
    ])

    return {
      navbarLinks,
    }
  },
});
</script>
