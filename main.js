document.addEventListener("DOMContentLoaded", function (event) {
	const wrapper = document.querySelector('.wrapper');
	activatePeriod.SetArrowWidth();

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

let RandoNum = (function(){
	let random_a = Math.floor(6 + Math.random() * 4);
	let random_c = Math.floor(11 + Math.random() * 4);
	let random_b = random_c - random_a;
	let nums = [random_a, random_b, random_c];

	function RandoNumConstructor(){
		RandoNum.prototype.getRanNum = function (num) {
			return nums[num];
		}
	}
	return RandoNumConstructor;
})();
let randoNum = new RandoNum();

let ActivatePeriod  = (function(){
	const period1 = document.querySelector('.period1');
	const period2 = document.querySelector('.period2');

	let activeArrow = function(){
		period1.lastElementChild.setAttribute('src', `images/section_${randoNum.getRanNum(0)}.svg`);
		period2.lastElementChild.setAttribute('src', `images/section_${randoNum.getRanNum(1)}.svg`);
	}

	function ActivatePeriodConstructor(){
		ActivatePeriodConstructor.prototype.SetArrowWidth = function(){
			period1.style.width = 4.89 * randoNum.getRanNum(0) +'%';
			period2.style.width = 4.91 * randoNum.getRanNum(1) +'%';
			activeArrow();
		}

		ActivatePeriodConstructor.prototype.getPeriod = function(){
			return period2;
		}
	}
	return ActivatePeriodConstructor;
})();
let activatePeriod = new ActivatePeriod();

let PasteNumbers = (function () {
	let box_a = document.querySelector('.box_a');
	let box_b = document.querySelector('.box_b');

	function PasteNumbersConstructor() {
		PasteNumbers.prototype.paste = function () {
			box_a.innerHTML = randoNum.getRanNum(0);
			box_b.innerHTML = randoNum.getRanNum(1);
		}
		PasteNumbers.prototype.getBox = function (boxLock) {
			let box = document.querySelector(boxLock);
			return box;
		}
	}

	return PasteNumbersConstructor;

})();
let pasteNumbers = new PasteNumbers();
pasteNumbers.paste();

function InputChekNumberMain(random0, litera, wrapper, box, ident) {
	this.lit = document.querySelector(litera);
	this.ident = document.querySelector(ident);
	this.box = box;
	this.wrapper = wrapper;
	this.random0 = random0;
	
}
 InputChekNumberMain.prototype.chekNumber = function (data) {
	if (randoNum.getRanNum(this.random0) == data.value) {
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
	if(bool) pasteNumbers.getBox(	this.box).classList.add('wrong_number');
	else pasteNumbers.getBox(	this.box).classList.remove('wrong_number');
}
 InputChekNumberMain.prototype.inputOff = function(data){
	let area = document.querySelector(this.wrapper)
	data.value = '';
	area.innerHTML = randoNum.getRanNum(this.random0);
}

let inputChekNumber1 = new InputChekNumberMain(0, '#b', '.wrapper_a','.box_a','#a');
let inputChekNumber2 = new InputChekNumberMain(1, '#c', '.wrapper_b', '.box_b', '#b');
let inputChekNumber3 = new InputChekNumberMain(2, '#c', '.box_c', null, '.box_c');

inputChekNumber1.activedNextInput = function(){
	activatePeriod.getPeriod().style.display = 'flex';
	this.lit.focus();
}

inputChekNumber2.activedNextInput = function () {
	let inputeC = document.createElement('input')
	inputeC.setAttribute('type', 'text');
	inputeC.setAttribute('maxlength', 2);
	inputeC.setAttribute('id', 'c');
	inputeC.className = 'answer';
	pasteNumbers.getBox('.box_c').innerHTML = '';
	pasteNumbers.getBox('.box_c').appendChild(inputeC);
	inputeC.focus();
}	
inputChekNumber3.chekNumber = function (data) {
	if (randoNum.getRanNum(this.random0) == data.value) {
		this.changeColor(data, 'black');
		this.inputOff(data);
	} else {
		this.changeColor(data, 'red');
	}
};
