# PhantomJS

## Зачем?

Пакет `phantomjs-prebuilt` тянет внешнюю зависимость из github, а в банковской системе доступ из под сборочных агентов во внешний мир нет. Поэтому мы переопределяем путь скачивания phantomjs в библиотеке `phantomjs-prebuilt` из нашего репозитория, с помощью переменной среды *PHANTOMJS_CDNURL*.
Читай - [Donwload from custom url in phantomjs-prebuilt](https://www.npmjs.com/package/phantomjs-prebuilt#downloading-from-a-custom-url)



## Инструкции по деплою нового архива Phantomjs
#### Договоренности
1. Версия @rbo/phantomjs соответствует версии PhantomJS.
2. Архив должен располагаться в папке `dist`(она находится в gitignore)
3. В `dist` должна лежать версия как для linux, так и для windows

