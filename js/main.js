const   $container = document.createElement('div'),
        $header = document.createElement('header'),               //шапка с поиском
        $logo = document.createElement('a'),
        $imgLogo = document.createElement('img'),
        $inputSearch = document.createElement('input'),
        $main = document.createElement('main'),
        $title = document.createElement('h1'),
        $tableClients = document.createElement('table'),        //Таблица
        $tableHead = document.createElement('thead'),
        $tableBody = document.createElement('tbody'),        
        $idHead = document.createElement('th'),
        $fioHead = document.createElement('th'),
        $letters = document.createElement('span'),
        $createHead = document.createElement('th'),
        $changeHead = document.createElement('th'),
        $contactsHead = document.createElement('th'),
        $actionHead = document.createElement('th'),
        $imgArFio = document.createElement('img'),
        $imgArId = document.createElement('img'),
        $imgArCr = document.createElement('img'),
        $imgArCh = document.createElement('img'),
        $btnAdd = document.createElement('button'),        
        $imgBtn = document.createElement('img'),                 
        $modalAll = document.createElement('div'),              //Модальное окно
        $modalBody = document.createElement('div'),
        $modalContent = document.createElement('form'),
        $modalTitle = document.createElement('div'),            //блок названия
        $titleText = document.createElement('h3'),
        $titleId = document.createElement('span'),
        $modalClose = document.createElement('button'),
        $imgClose = document.createElement('img'),
        $modalDescr = document.createElement('div'),            //блок ФИО
        $modalInputName = document.createElement('input'),
        $modalInputSurName = document.createElement('input'),
        $modalInputLastName = document.createElement('input'),
        $modalContacts = document.createElement('div'),         //блок контакты
        $contactsAll = document.createElement('div'), 
        $inputBox = document.createElement('div'),   
        $btnAddContacts =  document.createElement('button'),
        $imgBtnCon =  document.createElement('img'),
        $modalBtns = document.createElement('div'),             //блок кнопок
        $modalErrorVal = document.createElement('div'),
        $modalError = document.createElement('div'),
        $btnSave =  document.createElement('button'),
        $btnCancel =  document.createElement('button'),
        $btnDeleteClient =  document.createElement('button'),
        $modalDeletClient = document.createElement('div'),      //окно удалить
        $btnDelet =  document.createElement('button');         
        
let column = 'id',
    columnDir = true, 
    arrServer = [],
    textSerch;

const contactsIconArr = [
    {type: 'Телефон', value: './img/phone.png'}, 
    {type: 'Email', value: './img/mail.png', name: 'Email:'}, 
    {type: 'Facebook', value: './img/fb.png'}, 
    {type: 'VK', value: './img/vk.png'}, 
    {type: 'Другое', value: './img/more.png'}];

const clientsArr = [
        {createdAt: '2022-03-15T13:07', updatedAt: '2022-09-16T09:10', name: 'Иван', surname: 'Иванов', lastName: 'Иванович', contacts: [ {type: 'Телефон', value: '+7123536314'}, {type: 'Email', value: 'ivanov@gmail.com'}, {type: 'Другое', value: 'twitter'}]},
        {createdAt: '2022-06-15T10:07', updatedAt: '2022-11-06T15:10', name: 'Олег', surname: 'Лещенко', lastName: 'Петрович', contacts: [ {type: 'Телефон', value: '+75896425334'}, {type: 'Facebook', value: 'https://facebook.com/oleg-lechenko'}, {type:'Email', value: 'lesch@mail.ru'}]}
    ];

//Создоние DOM элементов
//Создание Header и шапки таблицы
function createdHeader() {      
    $imgLogo.src = './img/Logo.png';
    $logo.classList.add('logo');
    $inputSearch.placeholder = 'Введите запрос';
    $inputSearch.classList.add('search');
    $header.classList.add("header__container");
    
    $title.classList.add('title__table');
    $title.textContent = 'Клиенты';

    $logo.append($imgLogo);
    $header.append($logo);
    $header.append($inputSearch);
    $main.append($title);
    $main.append($tableClients);

    $tableClients.classList.add('table', 'table-hover',  'table__clients');
    $tableHead.classList.add('table__head');
    
    $imgArFio.src = './img/arrow_up.png';
    $imgArFio.classList.add('done')    
    $imgArId.src = './img/arrow_up.png';
    $imgArCr.src = './img/arrow_up.png';
    $imgArCh.src = './img/arrow_up.png';
    $idHead.textContent = 'ID';  
    $idHead.setAttribute('data-column', 'id') 
    $idHead.append($imgArId);    

    $fioHead.textContent = 'Фамилия Имя Отчество';    
    $fioHead.setAttribute('data-column', 'fio');
    $letters.textContent = 'А-Я';
    $letters.classList.add('letters')
    $fioHead.append($imgArFio, $letters);
    

    $createHead.textContent = 'Дата и время создания'; 
    $createHead.setAttribute('data-column', 'creatSort');   
    $createHead.append($imgArCr);

    $changeHead.textContent = 'Последние изменения';
    $changeHead.setAttribute('data-column', 'chengeSort');
    $changeHead.append($imgArCh);

    $contactsHead.textContent = 'Контакты';
    $actionHead.textContent = 'Действия',
    $actionHead.colSpan = 2;
    
    $imgBtn.src = './img/Vector.png';
    $btnAdd.append($imgBtn, '    Добавить клиента');
    $btnAdd.dataset.nameModal = 'new';
    $btnAdd.classList.add('btn__add', 'text', 'modal__link');    
    
    $tableHead.append($idHead, $fioHead, $createHead, $changeHead, $contactsHead, $actionHead);
    $tableClients.append($tableHead, $tableBody);
    $main.append($btnAdd);
    $container.classList.add('container');
    $container.append($header, $main);

    document.body.append($container);
    
    return ($inputSearch, $btnAdd)
};

//Создание строки таблицы
function addRow(client) {
    let  $tableRow = document.createElement('tr'),    
        $IDTD = document.createElement('td'),
        $fioTD = document.createElement('td'),
        $createTD = document.createElement('td'),
        $dateCr = document.createElement('span'),
        $timeCr = document.createElement('span'),
        $updateTD = document.createElement('td'),
        $dateUp = document.createElement('span'),
        $timeUp = document.createElement('span'),
        $contactsTD = document.createElement('td'), 
        $iconBlok = document.createElement('div'),        
        $action = document.createElement('td'),
        $actionChenge = document.createElement('div'),
        $actionCancel = document.createElement('div'),    
        $imgChenge = document.createElement('img'),
        $imgCancel = document.createElement('img'),
        $btnChenge = document.createElement('button'),
        $btnCancel = document.createElement('button');

    $IDTD.textContent = client.id;
    $IDTD.classList.add('text-id');
    
    $fioTD.textContent = client.surname + ' ' + client.name + ' ' + client.lastName;
   
    $dateCr.textContent = `${changeDate(client.createdAt)}`;
    $dateCr.classList.add('date')
    $timeCr.textContent = `${changeTime(client.createdAt)}`;
    $timeCr.classList.add('time');
    $createTD.append($dateCr, $timeCr);

    $dateUp.textContent = `${changeDate(client.updatedAt)}`;
    $dateUp.classList.add('date');
    $timeUp.textContent = `${changeTime(client.updatedAt)}`;
    $timeUp.classList.add('time');
    $updateTD.append($dateUp, $timeUp);
    
    $imgChenge.src = './img/edit.svg';
    $imgCancel.src = './img/cancel.svg';
    $btnChenge.textContent = 'Изменить';
    $btnCancel.textContent = 'Удалить';
    $btnChenge.classList.add('btn__chenge', 'btn__resert', 'text');
    $btnCancel.classList.add('btn__delet', 'btn__resert', 'text');
    $btnChenge.id = client.id;
    $btnChenge.dataset.nameModal = 'chenge';
    $btnCancel.id = client.id;
    $btnCancel.dataset.nameModal = 'delete';
    $tableRow.classList.add('text-table');

    $actionChenge.append($imgChenge, $btnChenge);  
    $actionChenge.style.marginRight = '20px'  
    $actionCancel.append($imgCancel, $btnCancel);

    //Вставка иконки контакта
    for (const item of client.contacts) {       
        $iconBlok.append(icon(item));        
    };
    
    $iconBlok.classList.add('icon-blok');
    $contactsTD.append($iconBlok); 
    $action.classList.add('action');
    $action.append($actionChenge, $actionCancel);
    $tableRow.append($IDTD, $fioTD, $createTD, $updateTD, $contactsTD, $action);
        
    return $tableRow;
};

//Создание тултипа при наведении на иконку контакта
function addTultip(contact) {
    tippy(contact, {
            content: contact.id,
            theme: 'mytheme'
        });
};

//Создание иконки контакта
function icon(client) {
    const $contactsIcon = document.createElement('img');  

        $contactsIcon.style.marginRight = '7px';
        $contactsIcon.style.marginBottom = '7px';
        $contactsIcon.classList.add('marker');             
        $contactsIcon.id = `${client.type}: ${client.value}`;   

        switch (client.type)   {
            case 'Телефон':
                $contactsIcon.src = './img/phone.png';
                break
            case 'Email':
                $contactsIcon.src = './img/mail.png';
                break
            case 'Facebook':
                $contactsIcon.src = './img/fb.png';
                break
            case 'VK':
                $contactsIcon.src = './img/vk.png';
                break
            default: 
                $contactsIcon.src = './img/more.png'
                $contactsIcon.id = `${'Другое'}: ${client.value}`
                break
        }; 
    //Добавление тултипа     
    addTultip($contactsIcon);
       
    return $contactsIcon
};

//Модальные окна
//Создание модального окна
function createdModal(nameModal, id, object) {
    $modalAll.innerHTML = ''  
    $modalContent.innerHTML = '';
   // $modalError.remove()
    $modalContent.append(createdModalHeader(nameModal, id), 
    createdModalDescr(object), 
    createdModalCont(object, nameModal, id),
    createdModalBtn(nameModal, id)); 
    
    $modalContent.classList.add('modal__content');
    $modalBody.append($modalContent);
    $modalBody.classList.add('modal__body');
    $modalAll.append($modalBody);
    $modalAll.classList.add('modal__all');

    return $modalAll
};

//Создание шапки модального окна
function createdModalHeader(prop, id) {  
    $modalTitle.innerHTML = '';
    $modalTitle.classList.add('modal__title', 'left');
switch (prop) {
    case 'new':
        $titleText.textContent = 'Новый клиент';
        $titleId.textContent = '';
        break
    case 'chenge':
        $titleText.textContent = 'Изменить данные';
        $titleId.textContent = `ID  ${id}`;
        break
    case 'delete':
        $titleText.textContent = 'Удалить';
        $titleId.textContent = '';
        $modalTitle.classList.remove('left');
}
    $titleId.classList.add('text');   
    $titleText.classList.add('title-text');
    $imgClose.src = '/img/close.png';
    $imgClose.classList.add('btn-close')
    $modalClose.append($imgClose);
    $modalClose.classList.add('btn__resert', 'close');
    $modalTitle.append($titleText, $titleId, $modalClose);
             
    return $modalTitle
};

//Создание поля ввода ФИО модального окна
function createdModalDescr(object = {name: '', surname: '', lastName: '', contacts: []}) {
    $modalInputName.placeholder = 'Имя*';
    $modalInputSurName.placeholder = 'Фамилия*';
    $modalInputLastName.placeholder = 'Отчество';

    $modalInputName.classList.add('modal__input');
    $modalInputSurName.classList.add('modal__input');
    $modalInputLastName.classList.add('modal__input');

    $modalInputName.value = object.name;
    $modalInputSurName.value = object.surname;
    $modalInputLastName.value = object.lastName;
      
    $modalDescr.append($modalInputSurName, $modalInputName, $modalInputLastName);
    $modalDescr.classList.add('modal__descr');

    return $modalDescr
};

//Создание поля добавления контакта
function createdModalCont(object = {name: '', surname: '', lastName: '', contacts: []}, prop, id) {
    $inputBox.innerHTML = '';
    $btnAddContacts.innerHTML = '';
    
    for (const i of object.contacts) {        
        $inputBox.append(addRowContact(i.type, i.value));
    };

    $inputBox.classList.add('input__box');
    $contactsAll.classList.add('contacts__all');
    $imgBtnCon.src = '/img/add_circle_outline.png';
    $imgBtnCon.classList.add('img-add');
    $btnAddContacts.append($imgBtnCon, 'Добавить контакт');
    $btnAddContacts.classList.add('btn__contacts', 'btn__resert');
    $contactsAll.append($inputBox, $btnAddContacts);
    $modalContacts.append($contactsAll);
    $modalContacts.classList.add('modal__contacts');

    return $modalContacts;
}; 
 
//Отрисовка строки контакта
function addRowContact(type = "Телефон", value = '') { 
    const $modalAddContact = document.createElement('div'),
        $selectContacts =  document.createElement('select'),      
        $contactInput = document.createElement('input'),
        $btnContactClose = document.createElement('buttun'),
        $conImg = document.createElement('img');

    $selectContacts.classList.add('text', 'contacts');
    $contactInput.classList.add('text', 'contact__input');
    $contactInput.placeholder = 'Введите данные контакта';
    $contactInput.value = value;    
    
    $btnContactClose.classList.add('btn__resert', 'contact__close');
    $conImg.src = '/img/cancel_contact.png';
    $btnContactClose.append($conImg);   
    $selectContacts.removeAttribute('hidden');

   
    $modalAddContact.innerHTML = ''   
    $modalAddContact.append($selectContacts, $contactInput, $btnContactClose); 
    $modalAddContact.classList.add('add__contact');
       
    //удаление поля контакта
    $btnContactClose.addEventListener('click', () =>{
        $modalAddContact.remove($selectContacts, $contactInput, $btnContactClose); 
    });

    //Кастомный селект
    const element = $selectContacts;   
    const choices = new Choices(element, {
        allowHTML: false,
        searchEnabled: false,        
        choices: [
          { value: 'Другое',
            label: 'Другое',
            selected: false,            
          },
          { value: 'Email',
            label: 'Email',
            selected: false,            
          },
          { value: 'VK',
            label: 'VK',
            selected: false,            
          },
          { value: 'Facebook',
            label: 'Facebook',
            selected: false,            
          }
        ],
        itemSelectText: ''
    });
    choices.setValue([type]);
    
    return $modalAddContact;
};

//Добавления поля контакта и скрытие кнопки, если контактов 10
$btnAddContacts.addEventListener('click', () => {
    $inputBox.append(addRowContact());
    $inputBox.classList.add('add');
    $contactsAll.classList.add('add');

    let numberContact = $inputBox.children.length;
    if (numberContact == 10)
    $btnAddContacts.style.display = 'none';
});

//Создание блока кнопок в модальном окне
function createdModalBtn(prop, id) {
    $modalBtns.innerHTML = '';
    $btnCancel.textContent = 'Отмена';
    $btnCancel.classList.add('btn__resert', 'btn__cancell');
    $btnSave.textContent = 'Сохранить';
    $btnSave.id = id;
    $btnSave.classList.add('btn-save', 'btn__resert', 'btn__firm');
    $btnSave.type = 'submit'
    $modalErrorVal.classList.add('error');
    $modalError.classList.add('error');
    switch (prop) {
        case 'new':            
            $modalBtns.append($modalErrorVal, $modalError, $btnSave, $btnCancel); 
            break
        case 'chenge':
            $btnDeleteClient.textContent = 'Удалить клиента';
            $btnDeleteClient.style.borderBottom = '1px solid #C8C5D1';
            $btnDeleteClient.classList.add('btn__delet', 'btn__del-client', 'btn__resert');
            $btnDeleteClient.id = id;
            $btnDeleteClient.dataset.nameModal = 'delete'
            $modalBtns.append($modalErrorVal, $modalError, $btnSave, $btnDeleteClient); 
            break
        case 'delete':
            $btnDelet.textContent = 'Удалить';
            $btnDelet.id = id;
            $btnDelet.classList.add('btn__resert', 'btn__firm', 'delet-client');
            $modalBtns.append($btnDelet, $btnCancel);
    };    
    
    $modalBtns.classList.add('modal__btns');

    return $modalBtns;
};

//Вызов модального окна добавления нового клиента 
$btnAdd.onclick = function(e) {       
    createdModal(e.target.dataset.nameModal, e.target.id); 
    $contactsAll.classList.remove('add');
    $modalAll.classList.add('hide');
    document.body.append($modalAll);
    setTimeout(() => {
        $modalAll.classList.add('open');  
        $modalAll.classList.remove('hide');
    }, 500);
};

//Вызов модального окна изменения и удаления клиента
window.addEventListener('click', (e) =>{
    const copyArr = arrServer;
    let client = {};        

    //Вызов модального окна изменения клиента
    if (e.target.dataset.nameModal == 'chenge'){

        for (const item of copyArr) {            
            if (item.id == e.target.id) {
                client.name = item.name;
                client.surname = item.surname;
                client.lastName = item.lastName;
                client.contacts = item.contacts;
            };
        };        
        createdModal(e.target.dataset.nameModal, e.target.id, client);
        $inputBox.classList.add('add');
        $contactsAll.classList.add('add');    
        $modalAll.classList.add('hide');
        document.body.append($modalAll);

        setTimeout(() => {
            $modalAll.classList.add('open');  
            $modalAll.classList.remove('hide');
        }, 500);
    };
    //Вызов модального окна удаления клиента   
    if (e.target.dataset.nameModal == 'delete') {
        const $modalDescrDel = document.createElement('div'),
              $delText = document.createElement('p');

        $modalContent.innerHTML = '';
        $delText.textContent = 'Вы действительно хотите удалить данного клиента?';
        $delText.classList.add('text', 'del-text');
        $modalDescrDel.classList.add('modal__descr-del');
        $modalDescrDel.append($delText);
        $modalContent.append(createdModalHeader(e.target.dataset.nameModal, e.target.id),  $modalDescrDel, createdModalBtn(e.target.dataset.nameModal, e.target.id));
        
        $modalContent.classList.add('modal__content');
        $modalBody.append($modalContent);
        $modalBody.classList.add('modal__body');
        $modalAll.append($modalBody);
        $modalAll.classList.add('modal__all');

        $modalAll.classList.add('hide');
        document.body.append($modalAll);

        setTimeout(() => {
            $modalAll.classList.add('open');  
            $modalAll.classList.remove('hide');
        }, 500);
    }
});

//Удаление модального окна
function modalClose() {
    $modalAll.classList.remove('open');
    $modalAll.classList.add('hide'); 

    setTimeout(() => {
        $modalAll.classList.remove('hide');
        $modalAll.remove();
    }, 500);   
    $modalError.innerHTML = '';
    $modalErrorVal.innerHTML = ''; 
    document.querySelectorAll('.modal__input').forEach(e => {
        e.style.outline = 'none';
    });
};

//Закрытие модального окна по клику вне окна или крестик
$modalBody.onclick = function (e) {
    let target = e.target;   
      
    if ($modalAll || $modalDeletClient)          
        if (target.matches('.modal__body') || target.matches('.btn__cancell') || target.matches('.btn-close')) {              
            modalClose($modalBody.parentNode);                   
        }; 
};

//Основные функции
//Отрисовка строки таблицы
function render(arr) {
    let copyArr = [...arr];
    copyArr = getSortClientsArr(copyArr, column, columnDir);
    $tableBody.innerHTML = '';
    for (const client of copyArr ) {
        $tableBody.append(addRow(client));   
    };
    return $tableBody;
};

// Стартовое поле с Header, шапкой таблицы и отрисовкой строк таблицы
async function start() {
    createdHeader();
    preLoader();
    arrServer = await getData(); 
    preLoader(false);

    if (arrServer.length == 0) {
        for (const client of clientsArr) {                       
            addClientServer(client);   
        };         
        render(clientsArr);
    }
    else {render(arrServer)};   
};

start();

//Работа с сервером
//Обращение к серверу за данными
async function getData() {    
    let res = await fetch('http://localhost:3000/api/clients');
    let data = await res.json();    
    
    return data
 };  

//Расшифровка ответа от сервера
function answerServer(prop) {
    let error = '';    
    switch (prop.status) {
        case 200, 201:            
            error = 'ok';
            modalClose()
            break           
        case 404:
            error = 'Ошибка: не найдено';
            break
        case 422:
            error = 'Ошибка: необрабатываемый экземпляр';
            break
        default:
           error = prop.statusText;
    };
    
    return error
};

 //Внесение данных на сервер
async function addClientServer(client) {       
    let res = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({         
        name: client.name,
        surname: client.surname,
        lastName: client.lastName,
        contacts: client.contacts
      })
    }
  );
  let data = res.json();

  //Проверка ответа от сервера и сохранение после успешной валидации
  await saveData(res);
};

//Изменение данных на сервере
async function chengeClientServer(client, id) {    
    let res = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: client.name,
        surname: client.surname,
        lastName: client.lastName,
        contacts: client.contacts
      })
    }
  );
  let data = res.json();
 
  //Проверка ответа от сервера и сохранение после успешной валидации
  await saveData(res);
};

//Сохранение данных 
async function saveData(prop) {
    //Валидация ФИО
  if (answerServer(prop) == 'OK' & validation($modalInputName) & validation($modalInputSurName)) {     
        modalClose();                                           //закрытие модального окна
        arrServer = await getData();                            //получение данных от сервера
        render(arrServer);                                      //отрисовка таблицы
        return
    }
    else {$modalError.textContent = answerServer(prop);
        $modalError.classList.add('add')};

    //Валидация контактов 
    document.querySelectorAll('.contact__input').forEach(async (el) =>{
        if (validation(el) & answerServer(prop) == 'OK') {     
                modalClose();
                arrServer = await getData();                            
                render(arrServer); 
                return
            }
        else {$modalError.textContent = answerServer(prop);
            $modalError.classList.add('add')}
    });
};

//Запрет обновлять страницу при сохранении формы
$modalContent.addEventListener('submit', async function(event) {
    event.preventDefault();
});

//Внесение или измененние данных в таблице и на сервере по кнопке "Сохранить"
$btnSave.addEventListener('click', async () => {
    const newContact = [];
    
    document.querySelectorAll('.add__contact').forEach(el =>{        
       let obj = {};
        el.querySelectorAll('.contacts').forEach(e => {
          obj.type = e.value;          
        });          
        el.querySelectorAll('.contact__input').forEach(e => {
            obj.value = e.value;
        });
            
        newContact.push(obj);      
    });

    let client = {
        name: $modalInputName.value.trim(),
        surname: $modalInputSurName.value.trim(),
        lastName: $modalInputLastName.value.trim(),
        contacts: newContact
        }; 
    
    if ($btnSave.id) chengeClientServer(client, $btnSave.id)    
    else {addClientServer(client)};                               
});

//Удаление данных с сервера
async function deletClientServer(id) {
    let res = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE'
    });    
};

//Удаление строки таблицы и данных клиента с сервера по клику на кнопку "Удалить клиента"
window.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delet-client'))
    deletClientServer(e.target.id);
    $btnDelet.addEventListener('click', () => {
        modalClose();
    });
    
    arrServer = await getData();                            
    render(arrServer);       
});

//Вспомогательные функции для обработки данных
//Преобразование даты
function changeDate (value) {
    let date = value.split('T')[0].split('-').reverse().join('.');  

    return date;
};

//Преобразование времени
function changeTime (value) {
    let time = value.split('T')[1].split(':').slice(0, 2).join(':');

    return time;
};

//Сортировка массива
function getSortClientsArr(arr, prop, dir) {
    const newArr = [...arr];
    
    for (const i of newArr) {
        i.fio = i.surname + ' ' + i.name + ' ' + i.lastName;
        i.creatSort = new Date(i.createdAt).getTime();       
        i.chengeSort = new Date(i.updatedAt).getTime();
    };
    
    return newArr.sort((clientsA, clientsB) => {       
      if ((!dir == false ? clientsA[prop] < clientsB[prop] : clientsA[prop] > clientsB[prop]))
      return -1;
    });
};
  
//Вызов сортировки при клике на шапку таблицы
document.querySelectorAll('.table th').forEach((element) => {           
    element.addEventListener('click', function() {    
        element.firstElementChild.classList.toggle('done');
        column = this.dataset.column;
        columnDir = !columnDir;

        if ($imgArFio.classList.contains('done'))
            $letters.textContent = 'А-Я';
        else {$letters.textContent = 'Я-А'} 

        render(arrServer);    
    });
});

//Получение запроса на поиск после задержки
$inputSearch.addEventListener('input', (e) => {
    textSerch = clearTimeout(textSerch);
    textSerch = setTimeout((e)=> {
        searchClient($inputSearch.value);         
    }, 300);    
});

//Поиск по запросу в массиве от сервера
async function searchClient(value) {
    let copyArr = await getData(),
    newArr = [];
    for (const client of copyArr) {        
        if (client.name.toLowerCase().includes(value.toLowerCase()) == true ||
            client.surname.toLowerCase().includes(value.toLowerCase()) == true ||
            client.lastName.toLowerCase().includes(value.toLowerCase()) == true)
        newArr.push(client);
    };
    render(newArr);
};

//Валидация формы
function validation(elem) {
    if (elem.value == '') {
        $modalErrorVal.textContent = 'Поле обязательно для заполнения';
        elem.style.outline = '2px solid red';
        $modalErrorVal.classList.add('add')
        }
    else {return true};
    elem.addEventListener('input', ()=> {
        $modalErrorVal.textContent = '';
        $modalError.textContent = '';
        elem.style.outline = 'none';
        elem.style.borderBottom = '1px solid #C8C5D1';
    });    
};

//Модальное окно загрузки
function preLoader(prop = true){
    $modalContent.innerHTML = '';
    $modalContent.classList.add('modal__content', 'loaded');
    $modalBody.append($modalContent);
    $modalBody.classList.add('modal__body');
    $modalAll.append($modalBody);
    $modalAll.classList.add('modal__all');
    $modalAll.classList.add('hide');
    document.body.append($modalAll);

    setTimeout(() => {
        $modalAll.classList.add('open');  
        $modalAll.classList.remove('hide');
    }, 500);

    if (!prop) {
        $modalAll.classList.remove('open');
        $modalAll.classList.add('hide'); 
        $modalContent.classList.remove('loaded');

        setTimeout(() => {
            $modalAll.classList.remove('hide');
            $modalAll.remove();
        }, 500);   
    };

    return $modalAll;
};