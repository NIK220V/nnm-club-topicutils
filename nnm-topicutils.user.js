// ==UserScript==
// @name         NNM Topic Utils
// @namespace    NNMTopicUtils
// @version      0.08
// @description  Полезные функции для модерирования в топиках. Подробнее в README.MD
// @author       NIK220V
// @match        *://*.nnmclub.to/forum/viewtopic.php?*
// @match        *://*.nnm-club.me/forum/viewtopic.php?*
// @match        *://*.nnm-club.i2p.onion/forum/viewtopic.php?*
// @match        *://*.nnmclub5toro7u65.onion/forum/viewtopic.php?*
// @homepage     https://github.com/NIK220V/nnm-club-topicutils
// @updateURL    https://github.com/NIK220V/nnm-club-topicutils/raw/master/nnm-topicutils.meta.js
// @downloadURL  https://github.com/NIK220V/nnm-club-topicutils/raw/master/nnm-topicutils.user.js
// @grant        none
// ==/UserScript==

if (document.querySelector('.menutable').innerText.indexOf('Вход') >= 0 || document.body.innerText.indexOf('Вы можете модерировать этот форум') < 0) return;

if (localStorage.getItem("NNMModGarbage.ButtonsEnabled") === null) localStorage.setItem("NNMModGarbage.ButtonsEnabled", false);
if (localStorage.getItem("NNMModGarbage.BoxesEnabled") === null) localStorage.setItem("NNMModGarbage.BoxesEnabled", false);
if (localStorage.getItem("NNMModGarbage.AskForSure") === null) localStorage.setItem("NNMModGarbage.AskForSure", true);
if (localStorage.getItem("NNMTopicUtils.FastEdit") === null) localStorage.setItem("NNMTopicUtils.FastEdit", false);
if (localStorage.getItem("NNMTopicUtils.RemoveReports") === null) localStorage.setItem("NNMTopicUtils.RemoveReports", true);
if (localStorage.getItem("NNMTopicUtils.RemoveDeletes") === null) localStorage.setItem("NNMTopicUtils.RemoveDeletes", false);

var DMap = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 66: 66, 67: 67, 68: 68, 69: 69, 70: 70, 71: 71, 72: 72, 73: 73, 74: 74, 75: 75, 76: 76, 77: 77, 78: 78, 79: 79, 80: 80, 81: 81, 82: 82, 83: 83, 84: 84, 85: 85, 86: 86, 87: 87, 88: 88, 89: 89, 90: 90, 91: 91, 92: 92, 93: 93, 94: 94, 95: 95, 96: 96, 97: 97, 98: 98, 99: 99, 100: 100, 101: 101, 102: 102, 103: 103, 104: 104, 105: 105, 106: 106, 107: 107, 108: 108, 109: 109, 110: 110, 111: 111, 112: 112, 113: 113, 114: 114, 115: 115, 116: 116, 117: 117, 118: 118, 119: 119, 120: 120, 121: 121, 122: 122, 123: 123, 124: 124, 125: 125, 126: 126, 127: 127, 1027: 129, 8225: 135, 1046: 198, 8222: 132, 1047: 199, 1168: 165, 1048: 200, 1113: 154, 1049: 201, 1045: 197, 1050: 202, 1028: 170, 160: 160, 1040: 192, 1051: 203, 164: 164, 166: 166, 167: 167, 169: 169, 171: 171, 172: 172, 173: 173, 174: 174, 1053: 205, 176: 176, 177: 177, 1114: 156, 181: 181, 182: 182, 183: 183, 8221: 148, 187: 187, 1029: 189, 1056: 208, 1057: 209, 1058: 210, 8364: 136, 1112: 188, 1115: 158, 1059: 211, 1060: 212, 1030: 178, 1061: 213, 1062: 214, 1063: 215, 1116: 157, 1064: 216, 1065: 217, 1031: 175, 1066: 218, 1067: 219, 1068: 220, 1069: 221, 1070: 222, 1032: 163, 8226: 149, 1071: 223, 1072: 224, 8482: 153, 1073: 225, 8240: 137, 1118: 162, 1074: 226, 1110: 179, 8230: 133, 1075: 227, 1033: 138, 1076: 228, 1077: 229, 8211: 150, 1078: 230, 1119: 159, 1079: 231, 1042: 194, 1080: 232, 1034: 140, 1025: 168, 1081: 233, 1082: 234, 8212: 151, 1083: 235, 1169: 180, 1084: 236, 1052: 204, 1085: 237, 1035: 142, 1086: 238, 1087: 239, 1088: 240, 1089: 241, 1090: 242, 1036: 141, 1041: 193, 1091: 243, 1092: 244, 8224: 134, 1093: 245, 8470: 185, 1094: 246, 1054: 206, 1095: 247, 1096: 248, 8249: 139, 1097: 249, 1098: 250, 1044: 196, 1099: 251, 1111: 191, 1055: 207, 1100: 252, 1038: 161, 8220: 147, 1101: 253, 8250: 155, 1102: 254, 8216: 145, 1103: 255, 1043: 195, 1105: 184, 1039: 143, 1026: 128, 1106: 144, 8218: 130, 1107: 131, 8217: 146, 1108: 186, 1109: 190};

function encodeString(s) {
    var L = [];
    for (var i=0; i<s.length; i++) {
        var ord = s.charCodeAt(i);
        if (!(ord in DMap))
            throw "Character "+s.charAt(i)+" isn't supported by win1251!";
        L.push('%'+DMap[ord].toString(16));
    }
    return L.join('').toUpperCase();
}

var sendval = 'subject=%topictitle%&new_forum_id=%forumto%&after_split_to_new=%msgids%&confirm=1&split_type_all=%splittype%&sid=%sid%&f=%forumfrom%&t=%topicid%&mode=split';

var warnval = '<form action="warnings.php" name="post" method="post"><table><tbody><tr> <th class="thHead" colspan="2" height="25">Выдать пользователю предупреждение</th></tr><tr> <td width="48%" class="row1"><span class="genmed"><b>Что</b></span></td><td class="row2"><span class="genmed"><input type="radio" name="warning_type" value="1" checked="checked"> Предупреждение <input type="radio" name="warning_type" value="2"> Бан <input type="radio" name="warning_type" value="3"> <s>Только чтение</s></span></td></tr><tr> <td class="row1"><span class="genmed"><b>Продолжительность</b></span></td><td class="row2"><span class="genmed"><select name="warning_time"><option value="86400">1 день</option><option value="259200">3 дня</option><option value="432000">5 дней</option><option value="604800">7 дней</option></select></span> | <select class="post" style="max-width:345px" title="Наиболее частые нарушения для быстрой вставки" onchange="document.getElementById(\'tx\').value +=options[selectedIndex].text + \'\'; options[0].selected=true;"> <option value="0">Выбрать п.п из выпадающего списка</option><option value="1">2.1. Оскорбление пользователей.</option><option value="2">2.2. Нецензурная брань.</option><option value="3">2.3. Флейм, флуд, троллинг.</option><option value="4">2.8. Реклама и спам любого характера.</option><option value="5">2.9. Ссылки на другие ресурсы сети в любом виде.</option><option value="6">2.11. Проявление расовой, национальной или религиозной неприязни и ненависти.</option><option value="7">2.15. Публичное обсуждение действий или бездействий Модераторов.</option><option value="8">5.3. Если Вы не намерены подключаться к раздаче - не комментируйте ее.</option><option value="9">5.8. Неаргументированные высказывания о содержании вредоносных программ.</option></select></td></tr><tr> <td class="row1"><span class="genmed"><b>Текст<br><br><span style="color:red">1. Обязательно указывайте пункт нарушенных <a target="blank" href="viewtopic.php?t=867">Правил</a>.<br>2. Комментарий должен быть кратким, допустимо цитирование п.п или его часть.<br>3. Не применяйте теги или ссылки, здесь они не работают.</span></b></span></td><td class="row2"><span class="genmed"><textarea id="tx" name="warning_text" rows="15" cols="35" wrap="virtual" style="width:450px" class="post"></textarea></span></td></tr><tr> <td class="catBottom" colspan="2" align="center" height="28"> <input type="hidden" name="sid" value="%sid%"><input type="hidden" name="p" value="%pid%"><input type="hidden" name="mode" value="add_warning"><input type="submit" name="add_warning" class="mainoption" value="Выдать пользователю предупреждение">&nbsp;<input type="submit" name="cancel" class="mainoption" value="Отменить"></td></tr></tbody></table></form>';

var busy = false;

window.CheckedMessages = [];

// ID Форума в который будет переносить сообщение. Сейчас у Мусорки ID 670.
var garbageid = 670;

var temp = document.querySelector('a[href*="newtopic"]').href;
var fromid = temp.substring(temp.indexOf('&f=')+3);

if (garbageid == fromid) return;

var sid = document.querySelectorAll('.mainmenu')[12].href.substring(document.querySelectorAll('.mainmenu')[12].href.indexOf('&sid=')+5);

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    while (target.indexOf(search) > 0)
        target = target.replace(search, replacement);
    return target;
};
Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

var css = document.createElement('style');
css.id = 'nnmdeletecss';
css.innerText = "a.nnmgarbage{display:inline-block;width:72px;height:18px;vertical-align:middle;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAASEAYAAACoaESVAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAAEHUlEQVR42uxaX0xTVxj/tSlDWbMQwwhBTDpStTG4OeaWDvtgCDxooiM+McPIgkFIRFwqxheflj0sGwPUGJ1E40NFHzbSOOYyxxjRumnXORfZaLIO7kYlxrhaEUmd95zjAx5vvb1np7eQjej9vXz3O9+f833f/e4599xcG2OMMQb8fEVRkknGFOXmzXvTsGDBEC5XcfHzTuDVSpersNBmc/DGiUQUJZUCxv+8k8xfZBXKgjFu3ZqZSaVmr5NJxhx8xRkbv53Ie25WQKlVKAvGGBu/nbDbgaKigoJ704CDCxgoJapVIAvmoDUQpVQ1aKDXLi6ry6/MfYKf1k0E71+xCv00wm5PayBCCSUGWxf1sSpaBdR/+Gak5Ez2zk9Nft82OQKQbuIj/7Ildn5cX+9yieUde06fVhTrZi34BqJUVY1WIPYrCZAAcGpjKHp9Cnj7rM+z9AW5cxalQdoPUKp61a1yff/uQCAWyxzv+qShwe0Wyy38f8hzAHb9Fqan4ZVj4buTAFNoKakG+ladn/prbRbeG0hQDYv96rfMXOV6yhvOrNysHeeztZPpi/TmO95c6ya6L2lbmPEKxHGpNvbZ1Alg7566uuVuef/QzXSQDgGEqsVqFi/n3d2NjR5P5nj7ruPHR0bMPx2yfERymR2PUx/Xgf1NTRUV2rie10MkN6uvj1c2b651EW5j2hNO1NkOe5Kuqi1ZmzcAeL5x3vi7EFhatmRJ/iLgejyRuJ8C+pzfeWNVBo6DrFxtEvvllGPnzt6jV69mUl4QmR+9P70d50X5iubjPJfL7PVxyOKcqz6PTx9nrvmZrbNdewci9ME/mZT10wJyDnjrXE2rt0gzHNj6QzDWCDBQ5cEB4KTz25LRSFqi06ydvCv2y6lsfpmc04MHm7evWQPs2HHkyI/hTDsOLuf6svlk/Hzllas+z0eW11zzEfmxp79EE5pJMUwHiEMz4CsPPU8/oG4g9M7ovjsqQKfJDdYOBLZ83XfNr/Eiv4/9y+aXyEV6Zvm52h061Nr6+hu55zVf+vM9r8xP+jHecO+zlbOoOmNwyiqnLvI+QGqJql4CLrSM9iQ+AvDiI4UW9GDLo+ss9tTDh9vavN7M8e0t+3tCITPvPrN5cLujn+56z+cT+9HnLbPTy0VxivRkeZmtw1zjN1vfjP7o//zy5fgEY2e/CoV+NzgmV254qdS5Im3J6reV2Vo1PrJ4LHzX//QdUXt7/f7164Hm5q6u4WFrPj02bvD5lruf+A5k/CU68uUf8eRvaQP5iKM9/biV3Qqz0HHsWEdHTY3Gb9vW2Tk4+N/HIboPCzW/xyvQmS+GhnI5Llt4NrF5U3V1RQXg4P93vLx65YrSUuCXa9HoRNwqkAVjvLLa41lWpv0XZLN+KLNgBvofyh4OAG9FYmisHJDPAAAAAElFTkSuQmCC');}";
document.head.appendChild(css);

var btn = document.createElement('div');
btn.style.zIndex = 500;
btn.style.position = 'fixed';
btn.style.cursor = 'pointer';
btn.style.right = '50px';
btn.style.bottom = '20px';
btn.style.backgroundColor = '#aec9e4';
btn.innerHTML = '<a class="nnmgarbage">';
btn.href = 'javascript;';
btn.style.border = '1px solid #2b4157';
btn.style.outline = 'none';
btn.style.padding = '3px';
btn.style.userSelect = 'none';
btn.style.display = 'none';
btn.title = 'Отправить все выделенные сообщения в мусорку.\nПодтверждение не спрашивается.';
btn.id = 'nnmgarbagesend';
btn.onclick = function(){transferMessage(CheckedMessages);};
document.body.appendChild(btn);

var click = document.createElement('li');
click.innerHTML = '<a href="javascript:;" title="Показать меню настроек скрипта">NNM Topic Utils</a>';
click.onclick = function(){settingsDiv();};
document.querySelectorAll('.menu')[1].style.width = '100%';
document.querySelectorAll('.menu')[1].appendChild(click);

function settingsDiv(){
    var settings = document.createElement('div');
    settings.style.zIndex = 500;
    settings.style.position = 'fixed';
    settings.style.right = '50%';
    settings.style.top = '20%';
    settings.style.marginRight = '-177px';
    settings.style.width = '300px';
    settings.style.backgroundColor = '#aec9e4';
    settings.innerHTML = 'Настройки скрипта NNM Topic Utils'+
        '<div><input type="checkbox" id="nnmgarbagebutton" onchange="localStorage.setItem(\'NNMModGarbage.ButtonsEnabled\', this.checked);" '+((localStorage.getItem("NNMModGarbage.ButtonsEnabled") == 'true') ? 'checked' : '')+'>Добавлять кнопки? (перенос в мусорку)</div>'+
        '<div><input type="checkbox" id="nnmgarbagebox" onchange="localStorage.setItem(\'NNMModGarbage.BoxesEnabled\', this.checked);" '+((localStorage.getItem("NNMModGarbage.BoxesEnabled") == 'true') ? 'checked' : '')+'>Добавлять чекбоксы? (перенос в мусорку)</div>'+
        '<div><input type="checkbox" id="nnmgarbagebox" onchange="localStorage.setItem(\'NNMModGarbage.AskForSure\', this.checked);" '+((localStorage.getItem("NNMModGarbage.AskForSure") == 'true') ? 'checked' : '')+'>Подтверждать одиночное удаление?</div>'+
        '<div><input type="checkbox" id="nnmgarbagebox" onchange="localStorage.setItem(\'NNMTopicUtils.FastEdit\', this.checked);" '+((localStorage.getItem("NNMTopicUtils.FastEdit") == 'true') ? 'checked' : '')+'>Быстрое редактирование вместо полного?</div>'+
        '<div><input type="checkbox" id="nnmgarbagebox" onchange="localStorage.setItem(\'NNMTopicUtils.RemoveReports\', this.checked);" '+((localStorage.getItem("NNMTopicUtils.RemoveReports") == 'true') ? 'checked' : '')+'>Убирать кнопку репорта?</div>'+
        '<div><input type="checkbox" id="nnmgarbagebox" onchange="localStorage.setItem(\'NNMTopicUtils.RemoveDeletes\', this.checked);" '+((localStorage.getItem("NNMTopicUtils.RemoveDeletes") == 'true') ? 'checked' : '')+'>Убирать кнопку удалить?</div>'+
        '<br><div align="center"><font color="green" onclick="location.reload();"><b  style="cursor:pointer;">Применить</b></font>   <font color="cornflowerblue" onclick="document.getElementById(\'nnmtopicutilssettings\').remove();"><b  style="cursor:pointer;">Закрыть</b></font></div>';
    settings.style.border = '2px solid #2b4157';
    settings.style.borderRadius = '50px';
    settings.style.outline = 'none';
    settings.style.padding = '25px';
    settings.style.userSelect = 'none';
    settings.id = 'nnmtopicutilssettings';
    if (document.getElementById('nnmtopicutilssettings')) document.getElementById('nnmtopicutilssettings').remove();
    document.body.appendChild(settings);
}

var c1 = [].slice.call(document.querySelectorAll('tr[class="row1"]')), c2 = [].slice.call(document.querySelectorAll('tr[class="row2"]')), c0 = c1.concat(c2);
for (var i = 0; i < c0.length; i++){
    giveButtons(c0[i]);
}

function giveButtons(elem){
if (elem.querySelector('a[href*="p="]')){
    var tpid = elem.querySelector('a[href*="p="]').href;
    elem.pid = tpid.substring(tpid.indexOf('p=')+2, tpid.indexOf('#'));}
    if (localStorage.getItem("NNMTopicUtils.RemoveReports") == 'true' && elem.querySelector('a[href*="report.php?"]')){
        elem.querySelector('a[href*="report.php?"]').remove();
    }
    if (localStorage.getItem("NNMTopicUtils.RemoveDeletes") == 'true' && elem.querySelector('a[href*="mode=delete"]')){
        elem.querySelector('a[href*="mode=delete"]').remove();
    }
    if (!elem.id || elem.id.indexOf('_') > 0  || elem.id.indexOf('0') == 0) return;
    var button = document.createElement('a');
    var msgid = elem.children[0].children[0].name;
    button.href = 'javascript:;';
    button.className = 'nnmgarbage';
    button.msgid = msgid;
    button.onclick = function(){isSure(this);};
    button.title = 'Отправить сообщение в мусорку.\nОтправится только это сообщение.\nДа, оно не удалится, а перенесётся.';
    if (localStorage.getItem("NNMModGarbage.ButtonsEnabled") == 'true') elem.children[1].children[0].children[0].children[0].children[1].appendChild(button);
    var box = document.createElement('input');
    box.type = 'checkbox';
    box.title = 'Выделить это сообщение.\nИспользуется для массового переноса в мусорку.';
    box.style.verticalAlign = 'middle';
    box.msgid = msgid;
    box.onclick = function(){toggleRemovall(this.msgid);};
    if (localStorage.getItem("NNMModGarbage.BoxesEnabled") == 'true') elem.children[1].children[0].children[0].children[0].children[1].appendChild(box);
    if (localStorage.getItem("NNMTopicUtils.FastEdit") == 'true' && elem.querySelector('a[href*="mode=editpost"]')){
    var editpost = elem.querySelector('a[href*="mode=editpost"]');
    editpost.href = 'javascript:;';
    editpost.onmouseup = function(e){
        if (e.which == 2){
            e.preventDefault();
            window.open('//'+document.domain+'/forum/posting.php?mode=editpost&p='+this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.pid, '_blank');
        } else
        editMessage(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
    };
    editpost.oncontextmenu = function(ev){
        ev.preventDefault();
        window.location.href = '//'+document.domain+'/forum/posting.php?mode=editpost&p='+this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.pid;
        return false;
    };}
}

var warns = document.querySelectorAll('a[href*="warnings.php"]');
for (var i = warns.length; i--;){
    giveWarnBtn(warns[i]);
}

function giveWarnBtn(elem){
    elem.pid = elem.href.substring(elem.href.indexOf('p=')+2, elem.href.indexOf('&mode'));
    elem.href = 'javascript:;';
    elem.onclick = function(){giveWarn(this);};
}

function isSure(id){
    var parent = id.parentNode;
    var msgid = id.msgid;
    if (localStorage.getItem("NNMModGarbage.AskForSure") == 'false'){
        transferMessage(new Array(msgid));
        return;
    }
    parent.removeChild(id);
    var button = document.createElement('input');
    button.type = 'button';
    button.value = 'Уверены? (Да)';
    button.className = 'mainoption';
    button.style.fontSize = '11px';
    button.style.verticalAlign = 'middle';
    button.msgid = msgid;
    button.onclick = function(){transferMessage(new Array(this.msgid));};
    parent.appendChild(button);
}

function toggleRemovall(msgid){
    if (CheckedMessages.indexOf(msgid) >=0)
        CheckedMessages.remove(msgid);
    else
        CheckedMessages.push(msgid);
    if (CheckedMessages.length > 0)
        document.getElementById('nnmgarbagesend').style.display = '';
    else
        document.getElementById('nnmgarbagesend').style.display = 'none';
}

function transferMessage(msgids) {
    if (busy) return;
    busy = true;
    var topicid = document.querySelector('.maintitle').href.substring(document.querySelector('.maintitle').href.indexOf('=')+1);
    var menuItems = document.querySelectorAll('a.mainmenu');
    var user = menuItems[menuItems.length - 1].text.split(' ')[2];
    var msgreplacer = '';
    for (var i=msgids.length;i--;) msgreplacer+='&post_id_list[]=%msgid%'.replaceAll('%msgid%', msgids[i]);
    var data = sendval.replaceAll('%topictitle%', encodeString('Выделено '+user+' из темы '+document.querySelector('.maintitle').innerText)).replaceAll('%forumto%', garbageid).replaceAll('%forumfrom%', fromid).replaceAll('%msgids%', msgreplacer).replaceAll('%topicid%', topicid).replaceAll('%sid%', sid).replaceAll('%splittype%', encodeString('Отделить выбранные сообщения'));
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE){
            location.reload();
        }
    };
    xhr.open('POST', '//'+document.domain+'/forum/modcp.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}

window.giveWarn = function(elem){
    if (document.getElementById('nnmwarngiver')) document.getElementById('nnmwarngiver').remove();
    var pid = elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.pid;
    var iframe = document.createElement('iframe');
    iframe.name = 'nnmwarniframe';
    iframe.style.display = 'none';
    var loader = document.createElement('img');
    loader.src = 'https://i.giphy.com/11fxhMPSRtnbTa.gif';
    loader.style.display = 'none';
    loader.style.margin = 'auto';
    var warn = document.createElement('div');
    warn.style.display = 'none';
    warn.style.zIndex = 500;
    warn.style.position = 'fixed';
    warn.style.right = '50%';
    warn.style.top = '30%';
    warn.style.marginRight = '-550px';
    warn.style.width = '1100px';
    warn.style.backgroundColor = '#e8eff7';
    warn.innerHTML = warnval.replaceAll('%sid%', sid).replaceAll('%pid%', pid);
    warn.style.border = '2px solid #2b4157';
    warn.style.borderRadius = '10px';
    warn.style.outline = 'none';
    warn.style.padding = '5px';
    warn.style.userSelect = 'none';
    warn.id = 'nnmwarngiver';
    warn.querySelector('form').target = iframe.name;
    iframe.onload = function(){
        if (!this.firstload) { this.firstload = true; return; }
        warn.children[0].style.display = 'none';
        $("#nnmwarngiver").fadeOut(1000);
        reshowMessage(elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
        setTimeout(function(){
                warn.remove();
        }, 1100);
    };
    warn.appendChild(loader);
    warn.appendChild(iframe);
    var submits = warn.querySelectorAll('input[type="submit"]');
    for (var i = submits.length; i--;) {
    if (submits[i].value=='Отменить'){
        submits[i].type='button';
        submits[i].onclick = function(e){
            $("#nnmwarngiver").fadeOut(1000);
            setTimeout(function(){
                warn.remove();
            }, 1100);
        };
    } else {
        submits[i].onclick = function(e){
            warn.children[0].style.display = 'none';
            loader.style.display = 'block';
        };
    }
    }
    document.body.appendChild(warn);
    $("#nnmwarngiver").fadeIn(500);
};

window.reshowMessage = function(message){
    var pid = message.pid;
    var submessage = nextChild(message);
    var separator = nextChild(message);
    var xhr = new XMLHttpRequest();
    $(message).fadeOut(1000);
    $(submessage).fadeOut(1000);
    $(separator).fadeOut(1000);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE){
            var doc = document.createElement('div');
            doc.innerHTML = xhr.responseText;
            var msg = doc.querySelector('a[href*="p='+pid+'"]').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            message.innerHTML = msg.innerHTML;
            var posters = message.querySelectorAll('.posterAvatar');
            for (var i = posters.length; i--;){
                var posterp = posters[i].parentNode;
                var url = posters[i].title;
                var img = document.createElement('img');
                img.className = 'posterAvatar';
                img.src = url;
                posterp.insertBefore(img, posters[i]);
                posters[i].remove();
            }
            giveButtons(message);
            if (message.querySelector('a[href*="warnings.php"]')) giveWarnBtn(message.querySelector('a[href*="warnings.php"]'));
            $(message).fadeIn(1000);
            $(submessage).fadeIn(1000);
            $(separator).fadeIn(1000);
        }
    };
    xhr.open('GET', '//'+document.domain+'/forum/viewtopic.php?p='+pid, false);
    xhr.send();
};

window.editMessage = function(message){
    var pid = message.pid;
    var xhr = new XMLHttpRequest();
    var iframe = document.createElement('iframe');
    iframe.name = 'nnmeditpostiframe';
    iframe.style.display = 'none';
    iframe.onload = function(){
        if (!this.firstload) { this.firstload = true; return; }
        message.children[1].children[0].remove();
        reshowMessage(message);
        iframe.remove();
    };
    $(message.children[1].children[0]).fadeOut(1000);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE){
            message.children[1].children[0].remove();
            var doc = document.createElement('div');
            doc.innerHTML = xhr.responseText;
            var table = doc.querySelectorAll('table')[7];
            var form = table.querySelector('form');
            form.children[0].remove();
            form.target = iframe.name;
            table.style.display = 'none';
            var handler = table.children[0].children[0].children[0];
            handler.children[4].remove();
            handler.children[3].remove();
            handler.children[1].remove();
            var prev = handler.querySelector('input[value="Предв. просмотр"]');
            prev.type = 'button';
            prev.value = 'Отмена';
            prev.name = 'cancel';
            prev.onclick = function(){
                table.remove();
                iframe.remove();
                reshowMessage(message);
            };
            handler.querySelector('input[value="Отправить"]').onclick = function(){
                $(table).fadeOut(1000);
            };
            var codes = form.querySelectorAll('[name*="code"]');
            for (var i = codes.length; i--;) codes[i].name = codes[i].name.replace('code', 'ecode');
            var bbedit = new BBCode(handler.querySelector('textarea[name="message"]'));
            var ctrl = "ctrl";
            bbedit.addTag("ecodeB", "b", null, "B", ctrl);
            bbedit.addTag("ecodeI", "i", null, "I", ctrl);
            bbedit.addTag("ecodeU", "u", null, "U", ctrl);
            bbedit.addTag("ecodeS", "s", null, "", ctrl);
            bbedit.addTag("ecodeHR", "hr", "", "8", ctrl);
            bbedit.addTag("ecodeQuote", "quote", null, "Q", ctrl);
            bbedit.addTag("ecodeCode", "code", null, "K", ctrl);
            bbedit.addTag("ecodeImg", "img", null, "R", ctrl);
            bbedit.addTag("ecodeUrl", "url=", "/url", "", ctrl);
            bbedit.addTag("ecodeHide", "hide=", "/hide", "", ctrl);
            bbedit.addTag("ecodeSpoiler", "spoiler=", "/spoiler", "s", ctrl);
            bbedit.addTag("ecodeTable", "table", null, "", ctrl);
            bbedit.addTag("ecodeYouTube", "yt", "/yt", "", ctrl);
            bbedit.addTag("fontFace", function(e) { var v=e.value; e.selectedIndex=0; return "font=\""+v+"\""; }, "/font");
            bbedit.addTag("ecodeSize", function(e) { var v=e.value; e.selectedIndex=0; return "size="+v; }, "/size");
            bbedit.addTag("ecodeAlign", function(e) { var v=e.value; e.selectedIndex=0; return "align="+v; }, "/align");
            bbedit.addTag("ecodeList", function(e) { var v=e.value; e.selectedIndex=0; return "list"+v+"\][*"; }, "/list");
            bbedit.addTag("ecodeColor", function(e) { var v=e.value; e.selectedIndex=0; return "color="+v; }, "/color");
            var menuItems = document.querySelectorAll('a.mainmenu');
            var user = menuItems[menuItems.length - 1].text.split(' ')[2];
            bbedit.addTag('ecodeMod', 'mod="'+user+'"', '/mod', 'm', ctrl);
            message.children[1].appendChild(table);
            message.children[1].appendChild(iframe);
            $(message.children[1].children[0]).fadeIn(1000);
        }
    };
    xhr.open('GET', '//'+document.domain+'/forum/posting.php?mode=editpost&p='+pid, false);
    xhr.send();
};

window.helpline = function(){};

function nextChild(node){
    var i=1;
    while(node.previousSibling){
        node = node.previousSibling;
        if(node.nodeType === 1){
            i++;
        }
    }
    return node.parentNode.children[i];
}
