document.addEventListener("DOMContentLoaded", function (event) {
	const wrapper = document.querySelector('.wrapper');
	arrow.setWidth();

	wrapper.addEventListener('input', function(e){
		if(e.target.id == 'a') input_1.chekNumber(e.target);
		if(e.target.id == 'b') input_2.chekNumber(e.target);
		if(e.target.id == 'c') input_3.chekNumber(e.target);
	})
	wrapper.onkeypress = function(e){
		return noString(e); 
	}
});

function noString(e){
	return !(/[А-Яа-яA-Za-z ]/.test(String.fromCharCode(e.charCode)));
}

const RandomNumbers = (function(){
	const summand_1 = Math.floor(6 + Math.random() * 4);
	const amount = Math.floor(11 + Math.random() * 4);
	const summand_2 = amount - summand_1;
	const nums = [summand_1, summand_2, amount];
	function RandomNumbersConstructor(){
		RandomNumbers.prototype.getNum = function (num) {
			return nums[num];
		}
	}
	return RandomNumbersConstructor;
})();
const randomNumbers = new RandomNumbers();

const Arrow  = (function(){
	const arrowContainer1 = document.querySelector('.period1');
	const arrowContainer2 = document.querySelector('.period2');

	const activeArrow = function(){
		arrowContainer1.lastElementChild.setAttribute('src', `images/section_${randomNumbers.getNum(0)}.svg`);
		arrowContainer2.lastElementChild.setAttribute('src', `images/section_${randomNumbers.getNum(1)}.svg`);
	}

	function ArrowConstructor(){
		ArrowConstructor.prototype.setWidth = function(){
			arrowContainer1.style.width = 4.89 * randomNumbers.getNum(0) +'%';
			arrowContainer2.style.width = 4.91 * randomNumbers.getNum(1) +'%';
			activeArrow();
		}

		ArrowConstructor.prototype.enable = function(){
			return arrowContainer2;
		}
	}
	return ArrowConstructor;
})();
const arrow = new Arrow();

const TaskСontainer = (function () {
	const boxSummand_1 = document.querySelector('.box_a');
	const boxSummand_2 = document.querySelector('.box_b');

	function TaskСontainerConstructor() {
		TaskСontainer.prototype.insert = function () {
			boxSummand_1.innerHTML = randomNumbers.getNum(0);
			boxSummand_2.innerHTML = randomNumbers.getNum(1);
		}
		TaskСontainer.prototype.getBox = function (boxLock) {
			const box = document.querySelector(boxLock);
			return box;
		}
	}

	return TaskСontainerConstructor;

})();
const taskСontainer = new TaskСontainer();
taskСontainer.insert();

function Input(number, idInput, placeNumber, boxNumber, ident) {
	this.idInput = document.querySelector(idInput);
	this.ident = document.querySelector(ident);
	this.boxNumber = boxNumber;
	this.placeNumber = placeNumber;
	this.number = number;
}

 Input.prototype.chekNumber = function (data) {
	if (randomNumbers.getNum(this.number) == data.value) {
		this.changeColor(data, 'black');
		this.highlightError(false);
		this.removeInput(data);
		this.activateNextInput();
	} else {
		this.changeColor(data, 'red');
		this.highlightError(true);
	}
}

 Input.prototype.changeColor = function (data, color) {
	data.style.color = color;
};
 Input.prototype.highlightError = function(bool){
	if(bool) taskСontainer.getBox(	this.boxNumber).classList.add('wrong_number');
	else taskСontainer.getBox(	this.boxNumber).classList.remove('wrong_number');
}
 Input.prototype.removeInput = function(data){
	const area = document.querySelector(this.placeNumber)
	data.value = '';
	area.innerHTML = randomNumbers.getNum(this.number);
}

const input_1 = new Input(0, '#b', '.wrapper_a','.box_a','#a');
const input_2 = new Input(1, '#c', '.wrapper_b', '.box_b', '#b');
const input_3 = new Input(2, '#c', '.box_c', null, '.box_c');

input_1.activateNextInput = function(){
	arrow.enable ().style.display = 'flex';
	this.idInput.focus();
}

input_2.activateNextInput = function () {
	const inputeC = document.createElement('input')
	inputeC.setAttribute('type', 'text');
	inputeC.setAttribute('maxlength', 2);
	inputeC.setAttribute('id', 'c');
	inputeC.className = 'answer';
	taskСontainer.getBox('.box_c').innerHTML = '';
	taskСontainer.getBox('.box_c').appendChild(inputeC);
	inputeC.focus();
}	
input_3.chekNumber = function (data) {
	if (randomNumbers.getNum(this.number) == data.value) {
		this.changeColor(data, 'black');
		this.removeInput(data);
	} else {
		this.changeColor(data, 'red');
	}
};
