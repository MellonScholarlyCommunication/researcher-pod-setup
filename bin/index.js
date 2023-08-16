#! /usr/bin/env node

const getProgram = require('../dist/index').default;

const program = getProgram();

program.parse(process.argv);
