module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [message => message.includes('WIP')],
  rules: {
    'header-max-length': [0, 'always', 200], // [!code focus]
  }
};
