let random_a = Math.floor(6 + Math.random()*4);
let random_c = Math.floor(11 + Math.random()*4);
let random_b = random_c - random_a;



const wrapper_a = document.querySelector('.wrapper_a');
const wrapper_b = document.querySelector('.wrapper_b');

const box_a = document.querySelector('.box_a');
const box_b = document.querySelector('.box_b');
const box_c = document.querySelector('.box_c');
box_a.innerHTML = random_a;
box_b.innerHTML = random_b;


const period1 = document.querySelector('.period1');
const period2 = document.querySelector('.period2');
period1.style.width = 4.89 * random_a +'%';
period2.style.width = 4.91 * random_b +'%';


const inputA = document.querySelector('#a');
const inputB = document.querySelector('#b');
inputA.onkeypress = function (e) {
	return noString(e);
}

inputB.onkeypress = function (e) {
	return noString(e);
}

function noString(e){
  return !(/[А-Яа-яA-Za-z ]/.test(String.fromCharCode(e.charCode)));

}

let create_inputeC = document.createElement('input')
create_inputeC.setAttribute('type', 'text');
create_inputeC.setAttribute('maxlength', 2);
create_inputeC.className = 'answer';
create_inputeC.onkeypress = function (e) {
	return noString(e);
}

inputA.addEventListener('input', function(){
	if(inputA.value == random_a){
		inputA.style.color = 'black';
		box_a.classList.remove('wrong_number');
		inputA.value = '';
		wrapper_a.innerHTML = random_a;
		period2.style.display = 'flex';
		inputB.focus();
	}
	else{ 
		inputA.style.color = 'red';
		box_a.classList.add('wrong_number');
	}
})

inputB.addEventListener('input', function(){
	if(inputB.value == random_b){
		inputB.style.color = 'black';
		box_b.classList.remove('wrong_number');
		inputB.value = '';
		wrapper_b.innerHTML = random_b;
		box_c.innerHTML = '';
		box_c.appendChild(create_inputeC);
		create_inputeC.focus();
	}
	else{ 
		inputB.style.color = 'red';
		box_b.classList.add('wrong_number');
	}
})

create_inputeC.addEventListener('input', function(){
	if(create_inputeC.value == random_c){
		create_inputeC.style.color = 'black';
		box_c.innerHTML = random_c;
	}
	else{ 
		create_inputeC.style.color = 'red';
	}
})

function lengthSection(){
		period1.lastElementChild.setAttribute('src', `section_${random_a}.svg`)
		period2.lastElementChild.setAttribute('src', `section_${random_b}.svg`)
}
lengthSection();