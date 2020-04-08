const { preserveShebangs } = require("rollup-plugin-preserve-shebangs");

import external from "rollup-plugin-peer-deps-external";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

module.exports = {
	input: "cli.js",
	output: {
		file: "dist/cli.js",
		format: "cjs"
	},
	plugins: [
		preserveShebangs(),
		external(),
		url(),
		svgr(),
		json(),
		resolve({ preferBuiltins: true }),
		commonjs(),
		terser()
	]
};
