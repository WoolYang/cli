#!/usr/bin/env node
const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs');
//import inquirer from 'inquirer';
//import {program } from 'commander';

const templates = require('./templates/index');
let prompList = [
  {
    type: 'list',
    name: 'template',
    message: 'which template do you want to choose?',
    choices: templates,
    default: templates[0],
  },
];

function strToArr(value, preValue) {
  return value.split(',');
}

program.version(require('./package').version, '-v, --version', 'cli version');

program
  .option('-d, --debug', 'try to debug')
  .option('-l, --list<value>', 'split string', strToArr)
  .action((options, command) => {
    if (options.debug) {
      console.log('debug success');
    }
    if (options.list !== undefined) {
      console.log(options.list);
    }
  })
  .command('create <filename>')
  .description('create a file')
  .action(async (filename) => {
    console.log(
      chalk.yellow(figlet.textSync('Wool', { horizontalLayout: 'full' }))
    );
    const res = await inquirer.prompt(prompList);
    if (res.template === 'reactClass') {
      templates.forEach((item) => {
        if (item.name === 'reactClass') {
          fs.writeFile(
            `./dist/${filename}.jsx`,
            item.src(filename),
            function (err) {
              if (err) {
                console.log('create fail:', err);
              } else {
                console.log(`create success! ${filename}.jsx`);
              }
            }
          );
        }
      });
    }

    if (res.template === 'vueTemplate') {
      templates.forEach((item) => {
        if (item.name === 'vueTemplate') {
          fs.writeFile(`./dist/${filename}.vue`, item.src(), function (err) {
            if (err) {
              console.log('create fail:', err);
            } else {
              console.log(`create success!${filename}`);
            }
          });
        }
      });
    }
  });

program.parse(process.argv);
