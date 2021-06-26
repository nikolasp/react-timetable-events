import typescript from "@rollup/plugin-typescript";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  format: 'iife',
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    external(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    postcss({
      modules: true,
    }),
    
  ],
};
