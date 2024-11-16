#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const now = new Date();
let isSuccess = false;

function calculateDate(date, d = 0, m = 0, y = 0, mode = 'add') {
  try {
    const day = date.getDate() + (mode === 'add' ? d : -d) + 1;
    const month = date.getMonth() + (mode === 'add' ? m : -m);
    const year = date.getFullYear() + (mode === 'add' ? y : -y);
    return new Date(year, month, day).toISOString();
  } catch (error) {
    //
  }
}

yargs(hideBin(process.argv))
  .command(
    'current',
    'Текущая дата и время в формате ISO',
    (yargsInner) => getOptions(yargsInner, 'boolean', 'Текущий'),
    (argv) => {
      getCurrentDate(argv);
      isSuccess = true;
    },
  )
  .command(
    'add',
    'Будущая дата и время в формате ISO',
    (yargsInner) => getOptions(yargsInner, 'number', 'Будущий'),
    (argv) => {
      setDate(argv, 'add');
      isSuccess = true;
    },
  )
  .command(
    'sub',
    'Прошедшая дата и время в формате ISO',
    (yargsInner) => getOptions(yargsInner, 'number', 'Прошлый'),
    (argv) => {
      setDate(argv, 'sub');
      isSuccess = true;
    },
  )
  .argv;

if (!isSuccess) {
  console.log('Такой команды не существует! Воспользуйтесь --help дя поучения дополнительной информации');
}

function getOptions(yargsInner, type, descriptionKey) {
  return yargsInner
    .option('y', {
      'alias': 'year',
      description: `${descriptionKey} год`,
      type,
    })
    .option('m', {
      'alias': 'month',
      description: `${descriptionKey} месяц`,
      type,
    })
    .option('d', {
      'alias': 'date',
      description: `${descriptionKey} день`,
      type,
    });
}

function getCurrentDate(argv = {}) {
  const {date, month, year} = argv;

  if (!date && !month && !year) console.log(now.toISOString());
  if (date) console.log(now.getDate());
  if (month) console.log(now.getMonth() + 1);
  if (year) console.log(now.getFullYear());
}

function setDate(argv = {}, mode) {
  const {date, month, year} = argv;

  if (!date && !month && !year) {
    console.log('Отсутствует параметр. Введите --help для получения документации');
    return;
  }

  console.log(calculateDate(now, date, month, year, mode));
}
