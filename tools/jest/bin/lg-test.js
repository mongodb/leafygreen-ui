#! /usr/bin/env node
const {spawn} = require("child_process");
const path = require("path");
const rootDir = process.cwd();
const configFile = path.dirname('../src/jest.config.js')

spawn('jest', [`--config ${configFile}`, `--rootDir ${rootDir}`], {stdio: "inherit"});