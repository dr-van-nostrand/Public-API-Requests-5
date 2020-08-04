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

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
	return fetch(url).then(checkStatus).then(res => res.json()).catch(error => console.log(
		'Loos like there was a problem!', error))
}

Promise.all([
		fetchData('https://randomuser.me/api/?results=12'),
	])
	// .then(data => console.log(data))
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

	data.map(person => {
		const card = document.createElement('DIV');
		card.classList.add('card');
		document.querySelector('.gallery').appendChild(card);

		const imgContainer = document.createElement('DIV');
		imgContainer.classList.add('card-img-container');
		card.appendChild(imgContainer);
		
		const imag = document.createElement('IMG');
		imag.src = 'https://placehold.it/90x90';
		imag.alt = 'profile picture';
		imgContainer.appendChild(imag);	

        imgContainer.innerHTML = `
        <img class=${'card-img'} src=${person.picture.thumbnail}>
      `;
        
		const infoContainer = document.createElement('DIV');
		infoContainer.classList.add('card-info-container');
		card.appendChild(infoContainer);

		const h3 = document.createElement('H3');
		h3.id = 'name';
		h3.innerHTML = 'first last';
		infoContainer.appendChild(h3);

		const emailP = document.createElement('P');
		emailP.innerHTML = 'email'
		infoContainer.appendChild(emailP);

		const cityP = document.createElement('P');
		cityP.innerHTML = 'city, state'
		infoContainer.appendChild(cityP);

		infoContainer.innerHTML = `
        <h3 class=${'card-name cap'}> ${person.name.first}${' '}${person.name.last}</h3>
        <p class=${'card-text'}>${person.email}</p>
        <p class=${'card-text'}>${person.location.city}</p>
	`;
	
		const modalContainer =  document.createElement('DIV');
		modalContainer.classList.add('modal-container');
		modalContainer.style.display = 'none';
		document.body.appendChild(modalContainer);

		const modal =  document.createElement('DIV');
		modal.classList.add('modal');
		modalContainer.appendChild(modal);

		const btnModalClose = document.createElement('BUTTON');
		btnModalClose.type = 'button';
		btnModalClose.id = 'modal-close-btn';
		btnModalClose.classList.add('modal-close-btn');
		btnModalClose.innerHTML = '<strong>x</strong>';
		modal.appendChild(btnModalClose);

		const modalInfoContainer = document.createElement('DIV');
		modalInfoContainer.classList.add('modal-info-container');
		modal.appendChild(modalInfoContainer);

		const modalImg = document.createElement('IMG');
		modalImg.src = 'https://placehold.it/125x125';
		modalImg.alt = 'profile picture';
		modalInfoContainer.appendChild(modalImg);

		const modalH3 = document.createElement('H3');
		modalH3.id = 'name';
		modalH3.innerHTML= 'name'
		modalInfoContainer.appendChild(modalH3);		

		const modalMail = document.createElement('P');
		// modalMail.classList.add('modal-text');
		modalMail.innerHTML= 'email'
		modalInfoContainer.appendChild(modalMail);
		
		const modalCity = document.createElement('P');
		modalCity.innerHTML= 'city'
		modalInfoContainer.appendChild(modalCity);	

		const modalPhone = document.createElement('P');
		modalPhone.innerHTML= '(555) 555-5555';
		modalInfoContainer.appendChild(modalPhone);
		
		const modalAddress = document.createElement('P');
		modalAddress.innerHTML= '123 Portland Ave., Portland, OR 97204';
		modalInfoContainer.appendChild(modalAddress);
		
		const modalBD = document.createElement('P');
		modalBD.innerHTML= 'Birthday: 10/21/2015';
		modalInfoContainer.appendChild(modalBD);
		
		const btnContainer = document.createElement('DIV');
		btnContainer.classList.add('modal-btn-container');
		modalContainer.appendChild(btnContainer);
		
		const btnPrev = document.createElement('BUTTON');
		btnPrev.type = 'button';
		btnPrev.id = 'modal-prev';
		btnPrev.classList.add('modal-btn-container');
		btnPrev.innerHTML= 'Prev';
		btnContainer.appendChild(btnPrev);
		
		const btnNext = document.createElement('BUTTON');
		btnNext.type = 'button';
		btnNext.id = 'modal-next';
		btnNext.classList.add('modal-btn-container');
		btnNext.innerHTML= 'Next';
		btnContainer.appendChild(btnNext);

		btnModalClose.addEventListener('click', function() {
			modalContainer.style.display = 'none';
		});	

		card.addEventListener('click', function() {
			modalContainer.style.display = 'block';
		});	

		modalInfoContainer.innerHTML = `
		<img class=${'modal-img'} src=${person.picture.large}>
		<h3 id='name' class='modal-name cap'> ${person.name.first} ${person.name.last} </h3>
		<p class=${'modal-text'}>${person.email}</p>
		<p class=${'modal-text-cap'}>${person.location.city}</p>
		<hr>
		<p class=${'modal-text'}>${person.phone}</p>
		<p class=${'modal-text'}>${person.location.street.number}
		${' '}${person.location.street.name}
		${' '}${person.location.city}
		${' '}${person.location.state}
		${' '}${person.location.postcode}</p>
        <p class=${'modal-text'}>${person.dob.date}</p>						
	  `;
		

  
	});
}




