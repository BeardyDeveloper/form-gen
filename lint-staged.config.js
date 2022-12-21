module.exports = {
  '*.{md,json}': ['prettier --write'],
  '*.ts(x)?': ['eslint --fix'],
};
