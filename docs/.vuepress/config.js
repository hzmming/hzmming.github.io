module.exports = {
  title: "Lazy man",
  description: "",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "Home",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "TimeLine",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "About",
        link: "/about/",
        icon: "reco-account",
      },
      {
        text: "Contact",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/hzmming",
            icon: "reco-github",
          },
        ],
      },
    ],
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "Category",
      },
      tag: {
        location: 3,
        text: "Tag",
      },
    },
    // sideBar,
    // sidebar: "auto",
    // sidebarDepth: 6,
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "LoryHuang",
    authorAvatar: "/avatar.png",
    record: "xxxx",
    startYear: "2017",
  },
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h1", "h2", "h3", "h4", "h5", "h6"],
  },
  plugins: {
    "vuepress-plugin-auto-sidebar": {},
  },
};
