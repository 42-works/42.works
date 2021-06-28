import pkg from "./package";
import projects from "./projects-config/config";

const faviconPath =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? "/42.branding/favicon.ico"
    : "/favicon.ico";

const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: "/42.branding/"
        }
      }
    : {};

export default {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: faviconPath }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["./assets/main.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~plugins/vee-validate.js", ssr: true },
    { src: "@/plugins/vue-awesome-swiper", mode: "client" }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/style-resources",
    [
      "@nuxtjs/yandex-metrika",
      {
        id: "57494424",
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true
      }
    ]
  ],

  styleResources: {
    scss: ["./assets/variables.scss"]
  },

  /*
   ** Build configuration
   */
  build: {
    extend: config => {
      const svgRule = config.module.rules.find(rule => rule.test.test(".svg"));

      svgRule.test = /\.(png|jpe?g|gif|webp)$/;

      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            loader: "vue-svg-loader"
          },
          {
            loader: "file-loader",
            query: {
              name: "assets/[name].[hash:8].[ext]"
            }
          }
        ]
      });
    },

    vendor: ["normalize.css", "vee-validate"]
  },

  ...routerBase,
  generate: {
    routes: projects.map(project => `/project/${project.id}`)
  }
};
