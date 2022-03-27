import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: "io.ionic.demo.pg.cap.ng",
  appName: "Surgician",
  bundledWebRuntime: false,
  npmClient: "npm",
  webDir: "www",
  server: {
    cleartext: true
  }
};

export default config;
