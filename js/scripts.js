const form = document.createElement('FORM');
form.action = '#';
form.method = 'get';
document.querySelector('.search-container').appendChild(form);

const search = document.createElement('INPUT');
search.type = 'search';
search.id = 'search-input';
search.classList.add('search-input');
search.placeholder = 'Search...';
document.getElementsByTagName('form')[0].appendChild(search);

const btn = document.createElement('BUTTON');
btn.type = ' submit';
btn.value = '&#x1F50D';
btn.id = 'search-submit';
btn.classList.add('search-submit');
btn.innerHTML = 'submit';
document.getElementsByTagName('form')[0].appendChild(btn);

const card = document.createElement('DIV');
card.classList.add('card');
document.querySelector('.gallery').appendChild(card);

const imgContainer = document.createElement('DIV');
imgContainer.classList.add('card-img-container');
document.querySelector('.card').appendChild(imgContainer);

const img = document.createElement('IMG');
img.classList.add('card-img');
img.src = 'https://placehold.it/90x90';
img.alt = 'profile picture';
document.querySelector('.card-img-container').appendChild(img);

const infoContainer = document.createElement('DIV');
infoContainer.classList.add('card-info-container');
document.querySelector('.card').appendChild(infoContainer);

const h3 = document.createElement('H3');
h3.id = 'name';
h3.classList.add('card-name-cap');
h3.innerHTML = 'first last';
document.querySelector('.card-info-container').appendChild(h3);

const emailP = document.createElement('P');
emailP.classList.add('card-text');
emailP.innerHTML = 'email'
document.querySelector('.card-info-container').appendChild(emailP);

const cityP = document.createElement('P');
cityP.classList.add('card-text');
cityP.innerHTML = 'city, state'
document.querySelector('.card-info-container').appendChild(cityP);

// const modalContainer =  document.createElement('DIV');
// modalContainer.classList.add('modal-container');
// document.querySelector('.gallery').appendChild(modalContainer);

// const modal =  document.createElement('DIV');
// modal.classList.add('modal');
// document.querySelector('.modal-container').appendChild(modal);

// const btnModalClose = document.createElement('BUTTON');
// btnModalClose.type = 'button';
// btnModalClose.id = 'modal-close-btn';
// btnModalClose.classList.add('modal-close-btn');
// btnModalClose.innerHTML = '<strong>x</strong>';
// document.querySelector('.modal').appendChild(btnModalClose);

// const modalInfoContainer = document.createElement('DIV');
// modalInfoContainer.classList.add('modal-info-container');
// document.querySelector('.modal').appendChild(modalInfoContainer);

// const modalImg = document.createElement('IMG');
// modalImg.classList.add('modal-img');
// modalImg.src = 'https://placehold.it/125x125';
// modalImg.alt = 'profile picture';
// document.querySelector('.modal-info-container').appendChild(modalImg);

// const modalH3 = document.createElement('H3');
// modalH3.id = 'name';
// modalH3.classList.add('modal-name-cap');
// modalH3.innerHTML= 'name'
// document.querySelector('.modal-info-container').appendChild(modalH3);

// const modalMail = document.createElement('P');
// modalMail.classList.add('modal-text');
// modalMail.innerHTML= 'email'
// document.querySelector('.modal-info-container').appendChild(modalMail);

// const modalCity = document.createElement('P');
// modalCity.classList.add('modal-text');
// modalCity.innerHTML= 'city'
// document.querySelector('.modal-info-container').appendChild(modalCity);

// const hr = document.createElement('HR');
// document.querySelector('.modal-info-container').appendChild(hr);

// const modalPhone = document.createElement('P');
// modalPhone.classList.add('modal-text');
// modalPhone.innerHTML= '(555) 555-5555';
// document.querySelector('.modal-info-container').appendChild(modalPhone);

// const modalAddress = document.createElement('P');
// modalAddress.classList.add('modal-text');
// modalAddress.innerHTML= '123 Portland Ave., Portland, OR 97204';
// document.querySelector('.modal-info-container').appendChild(modalAddress);

// const modalBD = document.createElement('P');
// modalBD.classList.add('modal-text');
// modalBD.innerHTML= 'Birthday: 10/21/2015';
// document.querySelector('.modal-info-container').appendChild(modalBD);

// const btnContainer = document.createElement('DIV');
// btnContainer.classList.add('modal-btn-container');
// document.querySelector('.modal-container').appendChild(btnContainer);

// const btnPrev = document.createElement('BUTTON');
// btnPrev.type = 'button';
// btnPrev.id = 'modal-prev';
// btnPrev.classList.add('modal-btn-container');
// btnPrev.innerHTML= 'Prev';

// document.querySelector('.modal-btn-container').appendChild(btnPrev);
// const btnNext = document.createElement('BUTTON');
// btnNext.type = 'button';
// btnNext.id = 'modal-next';
// btnNext.classList.add('modal-btn-container');
// btnNext.innerHTML= 'Next';
// document.querySelector('.modal-btn-container').appendChild(btnNext);

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
	return fetch(url).then(checkStatus).then(res => res.json()).catch(error => console.log(
		'Loos like there was a problem!', error))
}

Promise.all([
		fetchData('https://fsjs-public-api-backup.herokuapp.com/api'),
	])
	// .then(data => console.log(data))
	.then(data => {
		const randomImage = data[0].results;
        generateCardHTML(randomImage) 
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
	data.map(person => {
        imgContainer.innerHTML = 
         `
          <img src=${person.picture.thumbnail}>
      `;
        

		// infoContainer.innerHTML =
		// 	`
    //      <h3>${person.name.first}${' '}${person.name.last}</h3>
    //      <p>${person.email}</p>
    //      <p>${person.location.city}</p>

    // `;
	});
}

