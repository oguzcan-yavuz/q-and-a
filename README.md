# Q and A

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Git Workflow

We are using [git-flow](https://github.com/nvie/gitflow/wiki/Command-Line-Arguments) for managing branches and [commitizen](https://github.com/commitizen/cz-cli) for commit messages.

### Contributing

1. Create a feature branch.

   ```sh
   git flow feature start new-feature
   ```

2. Add your changes.
3. Commit with `npm run cz`.
4. Squash and merge your branch with rebasing.
   ```sh
   git flow feature finish -r -S
   ```

## Releases

- Setup [semantic-release](https://github.com/semantic-release/semantic-release) after setting up a CI/CD pipeline.
