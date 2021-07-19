# FSD_Task4
<p>FSD_Задание 4: Плагин слайдера</p>
<a href="https://Ramil192.github.io/jquerySlider"><p>Github Pages</p></a>

# Загрузка
```
$ git clone https://github.com/Ramil192/jquerySlider
```

# Установка
```
$ npm install
```

# Сборка
```
$ npm run dev
$ npm run build
```

# Запуск
```
$ npm start
```

# Запуск тестов
```
$ npm run test
```

# Как использовать
1) Подключить jQuery и сам плагин:
```
import "./slider.js";
import $ from "jquery";
```
2) С помощью jQuery выбрать нужный элемент-контейнер и вызвать на нем функцию rangeSlider:
```
const slider = $(".js-some-container").pluginRange(settingsObj);
```
где settingsObj объекты с нужными настройками(см. Настройки)


# Найстроки
1) Первый объект(settingsObj)

| Свойство   | Тип      | Значение по умолчанию | Описание |
| ---------  |----------|-----------------------|----------|
| min        | number   | 0                     | Минимальное значение
| max        | number   | 100                   | Максимальное значение 
| step       | number   | 1                     | Шаг
| valueLeft  | number   | 25                    | Значение левого инпута 
| valueRight | number   | 75                    | Значение левого инпута
| isVertical | boolean  | false                 | Вертикальное положение 
| isLabel    | boolean  | true                  | Текст над инпутом
| isScale    | boolean  | true                  | Шкала диапазона
| isDouble   | boolean  | true                  | Двойной слайдер
# Методы


| Методы               | Тип                        | Описание                                |
| ---------------------|----------------------------|-----------------------------------------|
| setSettings          | (newSettings:INewSettings) |принимает новые данные и отрисовывает их |
| synchronizationLeft  | (inputLeft:JQuery)         |принимает принимает внешний инпут        |
| synchronizationRight | (inputRight:JQuery)        |принимает принимает внешний инпут        |


# Архитектура

Плагин реализован по схеме MVP, с пассивным view. Обмен данными между view и model.
model не знает о view и controller 
view не знает о model и controller 
controller знает о model и view
 

# UML
https://ibb.co/jf4XDSG
(./uml/uml.png)
