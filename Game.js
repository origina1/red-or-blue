'use strict';

var step = Step();
var chosenElem;
var redPlayerSteps = [];
var bluePlayerSteps = [];
var currentPlayer;
var winCombinationArr = [
    ['A1', 'A2', 'A3'],
    ['B1', 'B2', 'B3'],
    ['C1', 'C2', 'C3'],
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
    ['A3', 'B3', 'C3'],
    ['A1', 'B2', 'C3'],
    ['A3', 'B2', 'C1']
];

//Функция проверяет заполнена ли ячейка (элемент) каким-либо цветом. Если нет - вызывает функцию step().
function checkField(elem) {
    chosenElem = elem;
    if (chosenElem.style.backgroundColor === "") {
        step();
    }
}

//С помощью замыкания в данной функции мы считаем количество совершенных ходов. При каждом вызове возвращённой функции step() в условии определяется кто ходит (красный или синий игрок) и происходят действия по заполнению ячейки цветом, добавлению id элемента(ячейки) в массив ходов игрока и т.д.
function Step() {
    var countSteps = 0;
    return function () {
        if (countSteps % 2 === 0) {
            chosenElem.style.backgroundColor = "#FF0000"; // красный
            redPlayerSteps.push(chosenElem.id);
            currentPlayer = 'RED';
            countSteps++;
            isWinner(countSteps, redPlayerSteps);
        } else {
            chosenElem.style.backgroundColor = "#1E90FF"; // синий
            bluePlayerSteps.push(chosenElem.id);
            currentPlayer = 'BLUE';
            countSteps++;
            isWinner(countSteps, bluePlayerSteps);
        }

    };
}

//Начиная с 5 шага функция начинает проверять массив шагов текущего игрока на наличие выйгрышной комбинации. Если выйгрышная комбинация найдена, вызывается функция highlightWinFields() и появляется уведомление с указанием победителя. setTimeout необходим, так как alert блокирует все действия и элементы не успевают прорисоваться.
function isWinner(countSteps, playerStepsArr) {
    if (countSteps >= 5) {
        winCombinationArr.forEach(function (combinationArr) {
            var sameElem = 0;
            combinationArr.forEach(function (id, i, combinationArr) {
                if (playerStepsArr.indexOf(id) >= 0) {
                    sameElem++;
                }
                if (sameElem === 3) {
                    highlightWinFields(combinationArr);
                    setTimeout(function () {
                        alert(currentPlayer + ' player is a Winner!!!');
                        location.reload();
                    }, 1000);
                }
            });
        });
        if (countSteps === 9) {
            setTimeout(function () {
                        alert('The winner is not revealed. Please try again!');
                        location.reload();
                    }, 1000);
        }
    }
}

//Функция оставляет на игровом поле только выйгрышную комбинацию, заполняя остальные внутренние ячейки цветом фона, тем самым после победы одного из игроков, игровое поле перестаёт реагировать на onClick.
function highlightWinFields(combinationArr) {
    let arr = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
    arr.forEach(function(field) {
                if (combinationArr.indexOf(field) < 0) {
                    document.getElementById(field).style.backgroundColor = '#212121';
        }
    });
}
