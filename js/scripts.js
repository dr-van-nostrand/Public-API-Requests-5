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
	  const form = document.querySelector('.search-container')
	  form.innerHTML = `
		<form action="#" method="get">
		  <input type="search" id="search-input" class="search-input" placeholder="Search...">
		  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
		</form>
	  `
	  searchInput = document.getElementById('search-input')
	  searchNames(searchInput)
};

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
function searchNames(searchInput) {
	const names = document.querySelectorAll('.card-name')
	searchInput.addEventListener('keyup', (e) => {
		const searchString = e.target.value

		for (let i=0; i<names.length; i++){
			if (!(names[i].innerHTML.toLowerCase().includes(searchString.toLowerCase()))) {
			  names[i].parentElement.parentElement.style.display = 'none'
			} else {
			  names[i].parentElement.parentElement.style.display = ''
			}
		  }
});


}