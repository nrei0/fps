module.exports = {
    '**/*.ts?(x)': (filenames) => ['yarn ts-check', `yarn lint:ts:fix ${filenames.join(' ')}`],
    '**/*.scss': () => 'yarn lint:scss:fix'
}