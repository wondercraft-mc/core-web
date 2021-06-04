const { path } = require('@vuepress/utils')

module.exports = {
  title: 'Wondercraft',
  description: 'An interesting Minecraft Server.',
  theme: path.resolve(__dirname, 'theme/defined-docs'),
  themeConfig: {
    navbar: [
      // NavbarItem
      {
        text: '首页',
        link: '/',
      },
      {
        text: '帮助中心',
        children: [
          {
            text: 'Proximity Voice',
            icon: '',
            link: '/java-server/proximity/'
          },
          {
            text: 'Map',
            icon: '',
            link: '/java-server/map/'
          },
          {
            text: 'Minigames',
            icon: '',
            link: '/java-server/minigames/'
          }
        ],
      },
    ],
    sidebar: 'auto',
    lastUpdated: 'Last updated',
  },
}