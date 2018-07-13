document.addEventListener("DOMContentLoaded", function (event) {
	const wrapper = document.querySelector('.wrapper');
	arrow.setWidth();

	wrapper.addEventListener('input', function(e){
		if(e.target.id == 'a') inputChekNumber1.chekNumber(e.target);
		if(e.target.id == 'b') inputChekNumber2.chekNumber(e.target);
		if(e.target.id == 'c') inputChekNumber3.chekNumber(e.target);
	})
	wrapper.onkeypress = function(e){
		return noString(e); 
	}
});

function noString(e){
	return !(/[А-Яа-яA-Za-z ]/.test(String.fromCharCode(e.charCode)));
}

let RandomNumbers = (function(){
	let summand_1 = Math.floor(6 + Math.random() * 4);
	let amount = Math.floor(11 + Math.random() * 4);
	let summand_2 = amount - summand_1;
	let nums = [summand_1, summand_2, amount];

	function RandomNumbersConstructor(){
		RandomNumbers.prototype.getNum = function (num) {
			return nums[num];
		}
	}
	return RandomNumbersConstructor;
})();
let randomNumbers = new RandomNumbers();

let Arrow  = (function(){
	const arrowContainer1 = document.querySelector('.period1');
	const arrowContainer2 = document.querySelector('.period2');

	let activeArrow = function(){
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
let arrow = new Arrow();

let TaskСontainer = (function () {
	let boxSummand_1 = document.querySelector('.box_a');
	let boxSummand_2 = document.querySelector('.box_b');

	function TaskСontainerConstructor() {
		TaskСontainer.prototype.insert = function () {
			boxSummand_1.innerHTML = randomNumbers.getNum(0);
			boxSummand_2.innerHTML = randomNumbers.getNum(1);
		}
		TaskСontainer.prototype.getBox = function (boxLock) {
			let box = document.querySelector(boxLock);
			return box;
		}
	}

	return TaskСontainerConstructor;

})();
let taskСontainer = new TaskСontainer();
taskСontainer.insert();

function InputChekNumberMain(random0, litera, wrapper, box, ident) {
	this.lit = document.querySelector(litera);
	this.ident = document.querySelector(ident);
	this.box = box;
	this.wrapper = wrapper;
	this.random0 = random0;
	
}
 InputChekNumberMain.prototype.chekNumber = function (data) {
	if (randomNumbers.getNum(this.random0) == data.value) {
		this.changeColor(data, 'black');
		this.highlightError(false);
		this.inputOff(data);
		this.activedNextInput();
	} else {
		this.changeColor(data, 'red');
		this.highlightError(true);
	}
}

 InputChekNumberMain.prototype.changeColor = function (data, color) {
	data.style.color = color;
};
 InputChekNumberMain.prototype.highlightError = function(bool){
	if(bool) taskСontainer.getBox(	this.box).classList.add('wrong_number');
	else taskСontainer.getBox(	this.box).classList.remove('wrong_number');
}
 InputChekNumberMain.prototype.inputOff = function(data){
	let area = document.querySelector(this.wrapper)
	data.value = '';
	area.innerHTML = randomNumbers.getNum(this.random0);
}

let inputChekNumber1 = new InputChekNumberMain(0, '#b', '.wrapper_a','.box_a','#a');
let inputChekNumber2 = new InputChekNumberMain(1, '#c', '.wrapper_b', '.box_b', '#b');
let inputChekNumber3 = new InputChekNumberMain(2, '#c', '.box_c', null, '.box_c');

inputChekNumber1.activedNextInput = function(){
	arrow.enable ().style.display = 'flex';
	this.lit.focus();
}

inputChekNumber2.activedNextInput = function () {
	let inputeC = document.createElement('input')
	inputeC.setAttribute('type', 'text');
	inputeC.setAttribute('maxlength', 2);
	inputeC.setAttribute('id', 'c');
	inputeC.className = 'answer';
	taskСontainer.getBox('.box_c').innerHTML = '';
	taskСontainer.getBox('.box_c').appendChild(inputeC);
	inputeC.focus();
}	
inputChekNumber3.chekNumber = function (data) {
	if (randomNumbers.getNum(this.random0) == data.value) {
		this.changeColor(data, 'black');
		this.inputOff(data);
	} else {
		this.changeColor(data, 'red');
	}
};
