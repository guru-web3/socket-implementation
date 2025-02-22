import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#262636",
          900: "#212121",
        },
        purple: {
          100: 'rgb(var(--socket-purple-100) / <alpha-value>)',
          70: 'rgb(var(--socket-purple-70) / <alpha-value>)',
          60: 'rgb(var(--socket-purple-60) / <alpha-value>)',
          50: 'rgb(var(--socket-purple-50) / <alpha-value>)',
          30: 'rgb(var(--socket-purple-30) / <alpha-value>)',
          20: 'rgb(var(--socket-purple-20) / <alpha-value>)',
          10: 'rgb(var(--socket-purple-10) / <alpha-value>)',
          0: 'rgb(var(--socket-purple-0) / <alpha-value>)'
        },
        blue: {
          70: 'rgb(var(--socket-blue-70) / <alpha-value>)',
          50: 'rgb(var(--socket-blue-50) / <alpha-value>)',
          30: 'rgb(var(--socket-blue-30) / <alpha-value>)',
          20: 'rgb(var(--socket-blue-20) / <alpha-value>)',
          10: 'rgb(var(--socket-blue-10) / <alpha-value>)',
          0: 'rgb(var(--socket-blue-0) / <alpha-value>)'
        },
        green: {
          80: 'rgb(var(--socket-green-80) / <alpha-value>)',
          70: 'rgb(var(--socket-green-70) / <alpha-value>)',
          50: 'rgb(var(--socket-green-50) / <alpha-value>)',
          30: 'rgb(var(--socket-green-30) / <alpha-value>)',
          10: 'rgb(var(--socket-green-10) / <alpha-value>)',
          0: 'rgb(var(--socket-green-0) / <alpha-value>)'
        },
        yellow: {
          80: 'rgb(var(--socket-yellow-80) / <alpha-value>)',
          50: 'rgb(var(--socket-yellow-50) / <alpha-value>)',
          30: 'rgb(var(--socket-yellow-30) / <alpha-value>)',
          0: 'rgb(var(--socket-yellow-0) / <alpha-value>)'
        },
        rose: {
          70: 'rgb(var(--socket-rose-70) / <alpha-value>)',
          60: 'rgb(var(--socket-rose-60) / <alpha-value>)',
          50: 'rgb(var(--socket-rose-50) / <alpha-value>)',
          30: 'rgb(var(--socket-rose-30) / <alpha-value>)',
          0: 'rgb(var(--socket-rose-0) / <alpha-value>)'
        },
        app: {
          onPrimary: "var(--app-on-primary)",
          primary: {
            900: "#4c1d95",
            800: "#5b21b6",
            700: "#6d28d9",
            600: "#7c3aed",
            500: "#8b5cf6",
            400: "#a78bfa",
            300: "#c4b5fd",
            200: "#ddd6fe",
            100: "#ede9fe",
            50: "#f5f3ff",
          },
          gray: {
            50: "#98a2b3",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
          },
          blue: {
            900: "var(--app-blue-900)",
            800: "var(--app-blue-800)",
            700: "var(--app-blue-700)",
            600: "var(--app-blue-600)",
            500: "var(--app-blue-500)",
            400: "var(--app-blue-400)",
            300: "var(--app-blue-300)",
            200: "var(--app-blue-200)",
            100: "var(--app-blue-100)",
            50: "var(--app-blue-50)",
          },
          light: {
            "surface-main": "var(--app-gray-100)",
            surface1: "var(--app-white)",
            surface2: "var(--app-gray-50)",
            surface3: "var(--app-gray-100)",
            surface4: "var(--app-gray-200)",
          },
          dark: {
            "surface-main": "var(--app-gray-900)",
            surface1: "var(--app-black)",
            surface2: "#1c1c28",
            surface3: "#171721",
            surface4: "#252534",
            surface5: "bg-app-dark-surface4",
          },
          success: "var(--app-success)",
          warning: "var(--app-warning)",
          error: "var(--app-error)",
          info: "var(--app-info)",
          white: "var(--app-white)",
          black: "var(--app-black)",
          alertDark: "var(--app-alertDark)",
          blueBorder: "var(--app-blueBorder)",
        },
        dark: 'rgb(var(--bg-dark) / <alpha-value>)'
      },
      variables: {
        DEFAULT: {
          app: {
            "on-primary": "#ffffff",
            primary: {
              900: "#4c1d95",
              800: "#5b21b6",
              700: "#6d28d9",
              600: "#7c3aed",
              500: "#8b5cf6",
              400: "#a78bfa",
              300: "#c4b5fd",
              200: "#ddd6fe",
              100: "#ede9fe",
              50: "#f5f3ff",
            },
            gray: {
              900: "#111928",
              800: "#1f2a37",
              700: "#374151",
              600: "#4b5563",
              500: "#6b7280",
              400: "#9ca3af",
              300: "#d1d5db",
              200: "#e5e7eb",
              100: "#f3f4f6",
              50: "#f9fafb",
            },
            blue: {
              900: "#233876",
              800: "#1e429f",
              700: "#1a56db",
              600: "#0346ff",
              500: "#3f83f8",
              400: "#76a9fa",
              300: "#a4cafe",
              200: "#c3ddfd",
              100: "#e1effe",
              50: "#ebf5ff",
            },
            success: "#30cca4",
            warning: "#fbc94a",
            error: "#fb4a61",
            info: "#d4d4d4",
            white: "#ffffff",
            black: "#000000",
            alertDark: "#041E42",
            blueBorder: "#15285D",
          },
        },
      },
      // Update existing color references to match Socket scheme
      backgroundColor: {
        card: 'rgb(var(--socket-gray-90) / <alpha-value>)',
        dark: 'rgb(var(--bg-dark) / <alpha-value>)',
      },
      textColor: {
        primary: 'rgb(var(--socket-primary-purple) / <alpha-value>)',
        gray: 'rgb(var(--socket-gray-50) / <alpha-value>)'
      },
      borderColor: {
        gray: 'rgb(var(--socket-gray-80) / <alpha-value>)'
      },
      boxShadow: {
        card: '0px 4px 12px rgba(var(--socket-gray-90), 0.25)'
      }
    },
  },
  plugins: [],
  darkMode: "class",

} satisfies Config;
