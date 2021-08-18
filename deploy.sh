#!/usr/bin/env sh

# остановить публикацию при ошибках
set -eg

# сборка
npm run build

# переход в каталог сборки
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:Olanondel/kinoCmsDep.git master:gh-pages

cd -
