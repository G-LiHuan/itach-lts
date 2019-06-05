#!/usr/bin/env node

const pkg = require('../package.json');

const { query, update } = require('../index');

function printResult(v) {
  update(v)
    .then(dists => {
      const results = query(dists, v);
      console.log(results);
      process.exit();
    })
}

function printVersion() {
  console.log(`lstn ${ pkg.version }`);
  process.exit();
}

function printHelp(code) {
  const lines = [
    '',
    '  Usage:',
    '    ltsn [8]',
    '',
    '  Options:',
    '    -v, --version             print the version of vc',
    '    -h, --help                display this message',
    '',
    '  Examples:',
    '    $ ltsn 8',
    ''
  ];

  console.log(lines.join('\n'))
  process.exit(code || 0)
}

function main(argv) {
  if (!argv) {
    printHelp(1);
  }

  const getArg = function() {
    let args = argv.shift();

    args = args.split('=');
    if (args.length > 1) {
      argv.unshift(args.slice(1).join('='));
    }
    return args[0];
  }

  let arg;

  while (argv.length) {
    arg = getArg();
    switch(arg) {
      case '-v':
      case '-V':
      case '--version':
        printVersion();
        break;
      case '-h':
      case '-H':
      case '-help':
        printHelp();
        break;
      default:
        printResult(arg);
        break;
    }
  }
}

main(process.argv.slice(2));

module.exports = main;

