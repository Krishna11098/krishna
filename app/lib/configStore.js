let config = {
  accessKey: "",
  secretKey: "",
  couriers: {
    sameday: false,
    nextday: false,
    regular: false,
    cargo: false,
  },
};

export function saveConfig(newConfig) {
  config = newConfig;
}

export function getConfig() {
  return config;
}
