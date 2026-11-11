import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // 相对路径，适配 GitLab Pages 子路径发布
  base: "./",
  plugins: [react(), tailwindcss()],
});
