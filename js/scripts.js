const gallery = document.querySelector('#gallery');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
	return fetch(url).then(checkStatus).then(res => res.json()).catch(error => console.log(
		'Loos like there was a problem!', error))
}
Promise.all([
		fetchData('https://randomuser.me/api/?results=12&nat=us'),
	])
	.then(data => {
		const randomData = data[0].results;
		generateCardHTML(randomData)
		// console.log(data); 
	})
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
	if (response.ok) {
		return Promise.resolve(response)
	} else {
		return Promise.reject(new Error(response.statusText));
	}
}

function generateCardHTML(data) {
	// const arrData = data;
	data.map(person => {
		const card = document.createElement('div');
		card.className = 'card';
		gallery.appendChild(card);
		card.innerHTML =
			`
			<div class='card-img-container'>
			<img class='card-img' src=${person.picture.large}>
            </div>
            <div class='card-info-container'>
		    <h3 id='name'class='card-name cap'> ${person.name.first}${' '}${person.name.last}</h3>
        	<p class='card-text'>${person.email}</p>
			<p class='card-text'>${person.location.city}</p>
			</div>
	`;
		card.addEventListener('click', () => {
			generateModal(data, person);
		})
	});
	const names = document.querySelectorAll('#name');
    for (let i = 0; i < names.length; i++) {
        list.push(names[i]);
    }
}

function generateModal(data, person) {
	const body = document.getElementsByTagName('BODY')[0];
	const modalContainer = document.createElement('div');
	modalContainer.className = 'modal-container';
	body.appendChild(modalContainer);
	modalContainer.innerHTML =
		`
		<div class='modal'>
		<button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>
		<div class='modal-info-container'>
		<img class='modal-img' src=${person.picture.large}>
		<h3 id='name' class='modal-name cap'> ${person.name.first} ${person.name.last}</h3>
		<p class='modal-text'>${person.email}</p>
		<p class='modal-text-cap'>${person.location.city}</p>
		<hr>
		<p class='modal-text'>${person.phone}</p>
		<p class='modal-text'>${person.location.street.number}
		${' '}${person.location.street.name}
		${' '}${person.location.city}
		${' '}${person.location.state}
		${' '}${person.location.postcode}</p>
		<p class='modal-text'>${person.dob.date}</p>		
		</div>
		<div class='modal-btn-container'>
		<button type='button' id='modal-prev' class="modal-prev btn">Prev</button>
		<button type='button' id='modal-next' class="modal-next btn">Next</button>
		</div>
        </div>				
	  
	`;
	const btnModalClose = document.querySelector('#modal-close-btn');
	btnModalClose.addEventListener('click', () => {
		body.removeChild(modalContainer);
	})
	const btnPrev = document.querySelector('#modal-prev');
	btnPrev.addEventListener('click', () => {
		let prevIndex = data.indexOf(person) - 1;
		body.removeChild(modalContainer);
		if (prevIndex < 0) {
			prevIndex = 11;
			generateModal(data, data[prevIndex]);
		} else {
			generateModal(data, data[prevIndex]);
		}
	})
	const btnNext = document.querySelector('#modal-next');
	btnNext.addEventListener('click', () => {
		let btnNext = data.indexOf(person) + 1;
		body.removeChild(modalContainer);
		if (btnNext > 11) {
			btnNext = 0;
			generateModal(data, data[btnNext]);
		} else {
			generateModal(data, data[btnNext]);
		}
	})
}
// ------------------------------------------
//  SEARCH FUNCTIONS
// ------------------------------------------
const form = document.createElement('FORM');
form.action = '#';
form.method = 'get';
document.querySelector('.search-container').appendChild(form);

const searchField = document.createElement('INPUT');
searchField.type = 'search';
searchField.id = 'search-input';
searchField.classList.add('search-input');
searchField.placeholder = 'Search...';
document.getElementsByTagName('form')[0].appendChild(searchField);

const btn = document.createElement('BUTTON');
btn.type = ' submit';
btn.value = '&#x1F50D';
btn.id = 'search-submit';
btn.classList.add('search-submit');
btn.innerHTML = 'submit';
document.getElementsByTagName('form')[0].appendChild(btn);

// //search Funtion
const list = [];

function searchNames(search, list) {

	for (let i = 0; i < list.length; i++) {
		
		if ((search.length !== 0 && list[i].textContent.toLowerCase().includes(search.toLowerCase()))) {
            list[i].parentNode.parentNode.style.display = '';
        } else if (search.length == 0) {
            list[i].parentNode.parentNode.style.display = '';
        } else {
            list[i].parentNode.parentNode.style.display = 'none';
        }
	}
}
const input = document.querySelector('#search-input');
input.addEventListener('keyup', (e) => {
	e.preventDefault();
	if (input.value != '') {
		searchNames(input.value, list);
	}
});