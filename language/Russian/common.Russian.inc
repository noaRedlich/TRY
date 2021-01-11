<?php
//added to DB
$charset = 'utf-8';
$strCopyright = "Все права зарезервированы &copy; MlaiTech Ltd. 2009";

$lang_modules['scheduler'] = "Дневник";
$lang_modules['filesystem'] = 'Мои документы';
$lang_modules['email'] = 'Электронная почта';
$lang_modules['projects'] = 'Проекты';
$lang_modules['realty'] = 'Программа для маклеров';
$lang_modules['catalog_admin'] = 'Бизнес-каталог (админ)';
$lang_modules['catalog'] = 'Бизнес-каталог';
$lang_modules['stock'] = 'iRetail';
$lang_modules['stock_admin'] = 'iRetail (админ)';
$lang_modules['stock_reports'] = 'iRetail (отчеты)';
$lang_modules['account'] = 'Ваш профиль';
$lang_modules['shaon'] = 'Учет рабочих часов';
$lang_modules['credit'] = 'Продажа в кредит - кассы';
$lang_modules['credit2'] = 'Продажа в кредит';
$lang_modules['stocktaking']='Ежедневный переучет';
$lang_modules['stock_clients'] = 'Клиенты';
$lang_modules['stock_pro'] = 'iRetail-Про';  
$current_language="ru";

//main language menu file register login and other non logged in pages
//common
$cmdLogin = "Войти";
$cmdSave = "Сохранить";
$cmdBack = "Вернуться";
$cmdCancel = "Отменить";
$cmdClose = "Закрыть";
$cmdOk = "Ок";
$cmdDelete = "Удалить";
$cmdNext = "Следующий";
$cmdPrevious = "Предидущий";
$cmdContinue = "Продолжить";
$cmdUpdate = "Синхронизировать";
$cmdApply = "Применить";
$cmdYes = "Да";
$cmdJoin = "Регистрация для новых пользователей";
$cmdNo = "Нет";
$cmdAdd = 'Добавить';
$cmdEdit = 'Редактировать';
$cmdInvertSelection = 'Ивертировать выделенное';

$strFrom = "От";
$strEdit = "Редактировать";
$strThis = 'Это';
$strItems = 'Объекты';

$strName = "Имя";
$strUser = "Пользователь";
$strBusinessNum = "Теудат-зеут/Номер бизнеса";
$strUsername = "Имя пользователя";
$strPassword = "Пароль";
$strAuthcode = "Код предоставления допуска";
$strCountry = "Страна";
$strState = "Штат";
$strCity = "Город";
$strZip = "Почтовый индекс";
$strAddress = "Улица";
$strEmail = "E-mail";
$strPhone = "Телефон";
$strWorkphone = "Рабочий телефон";
$strCellular = "Мобильный";
$strCompany = "Компания";
$strDepartment = "Отдел";
$strFunction = "Должность";
$strQuestion = "Секретный вопрос";
$strAnswer = "Ответ";
$strFax = "Факс";
$strWorkFax = "Рабочий факс";
$strHomepage = "Домашняя страница";
$strWorkAddress = "Адрес работы";
$strWorkZip = "Почтовый индекс работы";
$strWorkCountry = "Страна где вы работаете";
$strWorkState = "Штат места работы";
$strWorkCity = "Город места работы";
$strPhoto = "Фотография";
$strComments = "Коментарии";

$strProperties = 'Свойства';

$strDeleteItem = "Удалить";

$strDate = "Дата";

$strSaveSuccess = "Данные сохранены";
$strSaveError = "При сохранении данных произошла ошибка. Просьба попытаться еще раз.";
$strDataError = "При считывании данных произошла ошибка. Просьба попытаться перезагрузить страницу.";
$strDeleteError = "Невозможно удалить данные.";
$strAclError = "Ошибка при осуществлении контроля за доступом";
$strDateError = "Введена неверная дата";



$strAccessDenied = "В доступе отказано";
$AccessDenied_text = "Вы не можете просмотреть эту часть сайта или выполнить это действие.<br />Другой пользователь ограничил доступ к информации, которую Вы запросили.";

$invalid_chars = "Следующие символы запрещены :";

$strGroups = "Группы";
$strOwner = "Владелец";

$strDeletePrefix = "Уверены ли Вы, что хотите удалить ";
$strDeleteSuffix = "?";

//menu
$menu_minimize = "Минимизировать";
$menu_logout = "Выход из офиса";
$menu_applications = "Программы";
$menu_help = "Помощь";
$menu_about = "Информация о программе";
$menu_documentation = "Документация";
$menu_configuration = "Конфигурация";
$menu_groups = "Группы пользователей";
$menu_accounts = "Ваш аккаунт";
$menu_preferences = "Настройки";
$menu_bookmarks = "Закладки";
$menu_bookmarks_manage = "Изменить закладки";
$menu_add_bookmark = "Добавить в закладки";
$menu_add_current = "Добавить текущую страницу";
$menu_contacts = "Адресная книга";
$menu_invite = "Пригласить пользователей";
$menu_search = "Поиск";
$menu_search_discussions = "Обсуждения";
$menu_search_files = "Файлы и папки";
$menu_search_web = "web";
$menu_scheduler = "Дневник";
$menu_filetypes = "Типы файлов";
$menu_discussions = "Форум";

$menu_users = "Пользователи";
$start = "Пуск";
$menu_start = "Рабочий стол";
$menu_reboot = "перезагрузить сервер";
$menu_halt = "выключить сервер";
$menu_reboot_text = "ВНИМАНИЕ! Все услуги NetCity-Office временно недоступны. Уверены ли Вы, что хотите продолжить";
$menu_halt_text = "ВНИМАНИЕ! Действие всех услуг NetCity-Office прекращено. Уверены ли Вы, что хотите продолжить";
$menu_new = "Новое";
$menu_message = "Сообщение";
$menu_contact = "Контакт";
$menu_event = "Мероприятие";
$menu_bookmark = "Закладки";
$menu_topics = "Темы";
$menu_support = "Поддержка";
$menu_projects = "Проекты";
$menu_sysinfo = "Системная информация";
$menu_admin = 'Администрирование';
$menu_modules = 'Модули';
$menu_manual = 'Инструкция';

//class validate
$error_required = "Вы не заполнили одно из нижеуказанных полей, обязательных к заполнению.";
$error_match_auth = "Коды разрешения доступа не совпали.";
$error_match_pass = "Пароли не совпали.";
$error_min_length = "Минимальное количество знаков в нижеуказанном поле:";
$error_max_length = "Максимальное количество знаков в нижеуказанном поле:";
$error_email = "Указанный Вами адрес электронной почты недействителен.";
$error_email_exists = "Введенный Вами Вами адрес электронной почты уже существует.";
$error_username_exists = "Извините, введенное Вами имя пользователя уже существует. Просьба выбрать другое.";
$errors_in_form = "При заполнении бланка были допущены ошибки. Просьба исправить их и попытаться еще раз.";
$error_missing_field = "Вы не заполнили все обязательные поля.";

//acl control
$acl_control_auth_groups = "Группы с правом доступа";
$acl_control_auth_users = "Пользователи с правом доступа";
$acl_control_no_contacts = "В Вашей контактной группе нет пользователей для выбора. .<br /> Воспользуйтесь адресной книгой, чтобы добавить пользователей в Вашу контактную группу.";

$strShowProfile = "Обзор параметров";
$strShowGroup = "Обзор участников группы";
$strProcessingTime = "Время обработки данной страницы ";
$strLoggedInAs = "Вы вошли в систему как ";
$strAt = " в ";
$strEmailTo = "Послать электронное сообщение : ";
$strProtectedUser = "Защищенный пользователь";

$http_not_found = "Документ не найден";
$http_not_found_text = "Требуемый документ не найден. Возможно, Вы неправильно набрали путь.";
$http_error = "Внутренняя ошибка сервера";
$http_bad_request = "Неправильный запрос";
$strAddContact = "Добавить в контакты";

$strReadRights = "Права для чтения";
$strWriteRights = "Права для записи";
$strPermissions = 'Права доступа';

$editor_bold = "Жирный";
$editor_italic = "Курсив";
$editor_underline = "Подчеркивание";
$editor_left = "Выравнивание по левому краю";
$editor_right = "Выравнивание по правому краю";
$editor_center = "Центрирование";
$editor_ord_list = "Упорядоченный список";
$editor_bul_list = "Маркированный список";
$editor_txt_color = "Цвет шрифта";
$editor_back_color = "Цвет фона";
$editor_hyperlink = "Гипертекстовая ссылка";
$editor_image = "Картинка";
$editor_rule = "Горизонтальная линейка";

$editor_very_small = "Очень маленький";
$editor_small = "Маленький";
$editor_medium = "Средний";
$editor_large = "Большой";
$editor_larger = "Увеличенный";
$editor_very_large = "Очень большой";

$editor_strikethrough = "Перечеркивание";
$editor_outdent = "Выступ";
$editor_indent = "Отступ";

$editor_superscript = "Надстрочный знак";
$editor_subscript = "Подстрочный знак";
$editor_undo = "Отменить действие";
$editor_redo = "Выполнить действие заново";
$editor_copy = "Скопировать";
$editor_paste = "Вставить";
$editor_cut = "Вырезать";

$editor_font = "Шрифт";
$editor_size = "Размер";
$editor_heading = "Заголовок";
$editor_select = "Выбрать";

$editor_mode = "Включить / выключить режим редактирования";

$days[0]="Вс.";
$days[1]="Пн.";
$days[2]="Вт.";
$days[3]="Ср.";
$days[4]="Чт.";
$days[5]="Пт.";
$days[6]="Сб.";

$months[0]="Январь";
$months[1]="Февраль";
$months[2]="Март";
$months[3]="Апрель";
$months[4]="Май";
$months[5]="Июнь";
$months[6]="Июль";
$months[7]="Август";
$months[8]="Сентябрь";
$months[9]="Октябрь";
$months[10]="Ноябрь";
$months[11]="Декабрь";

$full_days[0] = "Воскресенье";
$full_days[1] = "Понедельник";
$full_days[2] = "Вторник";
$full_days[3] = "Среда";
$full_days[4] = "Четверг";
$full_days[5]= "Пятница";
$full_days[6] = "Суббота";


$register = "Регистрация нового пользователя.";
$forgot_password = "Забыли пароль?"
?>