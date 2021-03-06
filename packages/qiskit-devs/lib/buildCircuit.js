/**
 * @license
 *
 * Copyright (c) 2017, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const utils = require('./utils');
const { version } = require('../package');

const dbg = utils.dbg(__filename);

module.exports = (neededQubits = 4) => {
  let circuit =
    `// Cirtuit generated by Qiskit.js, version: ${version}\n\n` +
    // Includes.
    'include "qelib1.inc";\n\n' +
    // Register declarations.
    `qreg q[${neededQubits}];\n` +
    `creg c[${neededQubits}];\n\n`;

  let i = 0;
  utils.times(neededQubits, () => {
    circuit += `h q[${i}];\n`;
    i += 1;
  });

  circuit += '\n';

  i = 0;
  utils.times(neededQubits, () => {
    circuit += `measure q[${i}] -> c[${i}];\n`;
    i += 1;
  });

  dbg('Built circuit:', { circuit });
  return circuit;
};
