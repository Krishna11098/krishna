// app/lib/configStore.js

// This is an in-memory store for your config (resets on server restart)
let store = {
  accessKey: "",
  secretKey: "",
  couriers: {
    sameday: false,
    nextday: false,
    regular: true,
    cargo: false,
  },
};

// Function to save/update config
export function saveConfig(newConfig) {
  store = { ...store, ...newConfig };
}

// Function to get current config
export function getConfig() {
  return store;
}
