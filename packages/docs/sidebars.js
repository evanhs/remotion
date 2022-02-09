module.exports = {
  playerSidebar: [
    {
      type: "link",
      label: "← Back to main docs",
      href: "/docs",
    },
    "player/player",
    "player/installation",
    "player/examples",
    "player/api",
    "player/scaling",
    "player/integration",
    "player/autoplay",
    "player/preloading",
  ],
  someSidebar: [
    {
      collapsed: false,
      type: "category",
      label: "Getting started",
      items: [
        "getting-started",
        "the-fundamentals",
        "animating-properties",
        "reusability",
        "timeline",
        "render",
      ],
    },
    {
      type: "category",
      label: "Techniques",
      collapsed: false,
      items: [
        "assets",
        "using-audio",
        "fonts",
        "using-randomness",
        "audio-visualization",
        "use-img-and-iframe",
        "javascript",
        "data-fetching",
        "encoding",
        "transparent-videos",
        "parametrized-rendering",
        "dynamic-metadata",
        "ssr",
        "webpack",
        "legacy-babel",
        "env-variables",
        "third-party",
        "stills",
        "scaling",
      ],
    },
    "cli",
    "config",
    {
      type: "category",
      label: "API - Core",
      collapsed: false,
      items: [
        "continue-render",
        "delay-render",
        "interpolate",
        "interpolate-colors",
        "get-input-props",
        "measure-spring",
        "random",
        "register-root",
        "spring",
        "staticfile",
        "use-current-frame",
        "use-video-config",
        "audio",
        "composition",
        "sequence",
        "loop",
        "video",
        "absolute-fill",
        "img",
        "iframe",
        "freeze",
        "still",
        "series",
        "easing",
      ],
    },
    {
      type: "category",
      label: "API - @remotion/bundler",
      items: ["bundle"],
    },
    "gif",
    {
      type: "category",
      label: "API - @remotion/media-utils",
      items: [
        "audio-buffer-to-data-url",
        "get-audio-data",
        "get-audio-duration",
        "get-video-metadata",
        "get-waveform-portion",
        "use-audio-data",
        "visualize-audio",
      ],
    },
    {
      type: "link",
      href: "/docs/player",
      label: "API - @remotion/player",
    },
    {
      type: "category",
      label: "API - @remotion/three",
      items: ["three", "three-canvas", "use-video-texture"],
    },
    {
      type: "category",
      label: "API - @remotion/renderer",
      items: [
        "get-compositions",
        "render-frames",
        "stitch-frames-to-video",
        "render-still",
      ],
    },
    {
      type: "category",
      label: "Troubleshooting",
      collapsed: false,
      items: [
        "timeout",
        "target-closed",
        "media-playback-error",
        "performance",
        "webpack-dynamic-imports",
        "non-seekable-media",
        "flickering",
        "enametoolong",
      ],
    },
    {
      type: "category",
      label: "Miscellaneous",
      collapsed: false,
      items: ["chromium-flags", "prereleases", "gpu"],
    },
    "2-0-migration",
    "license",
  ],
};
