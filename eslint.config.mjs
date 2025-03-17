import { defineConfig, globalIgnores } from "eslint/config";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
    globalIgnores(["node_modules", "dist"]),
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
]);