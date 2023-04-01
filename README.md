#Курсовая работа
##Система управления контактными данными клиентов

Данная работа начало разработки CRM-системы работы с данными клиентов. Данные о клиентах хранятся на локальном сервере. 

На главном экране всегда отображается "шапка страницы" с логотипом и полем поиска данных и таблица клиентов. "Шапка таблицы" статична, тело таблицы отрисовывается заново при изменении каких-либо данных клиента. За отрисовку строки таблицы отвечает функция render(). 
    Форма добавления/изменения данных клиента отражается в модальном окне при нажатии соответствующей кнопки.


| Дополнительные функции                                    | Название               |  
|-----------------------------------------------------------|------------------------|
| Валидация значений в поле input на "пустоту"           | validation(elem)       |   
| Сортировка значений в таблице по возрастанию или убыванию | getSortClientsArr()    |   
| Модальное окно загрузки данных                            | preLoader(prop = true) |   
| Отображение даты в формате дд.мм.гггг                     | changeDate (value)     |
| Отображение времени в формате чч:мин                      | changeTime (value)     |
| Сохранение данных клиента на сервере после успешной валидации и при отсутствии ошибок в ответе от сервера| saveData(prop)|
| Расшифровка ответа сервера по коду | answerServer(prop)|
| Всплывающая подсказка с типом и значением контакта (при наведении на иконку контакта)| addTultip(contact)|
| Отрисовка иконки контакта в зависимости от типа контакта| icon(client)|
| Создание  модального окна | createdModal(nameModal, id, object)|



Наполнение модального окна зависит от значения кнопки вызова ("new", "chenge", "delete").

Ошибки при валидации или ответ сервера с кодом ошибки отражаются над кнопками в модальном окне.