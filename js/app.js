
/* ======= Model ======= */
// an object with 2 properties:
//      - a current cat
//      - an array with cat objects each having clickCount, name and img url

var model = {
	currentCat: null,
	cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
	]
}

/* ======= Octopus ======= */
// an object with 5 properties, all functions: init, getCurrentCat, getCats, setCurrentCat, incrementCounter
// 		- init: set current cat's val in Model to cats[0], tell both views to init
// 		- incrementCounter: increments the cat's click counter then asks the catView to re-render
// 		- getCurrentCat: returns Model currentCat
// 		- getCats: returns Model cats
// 		- setCurrentCat to the object passed in

var octopus = {
	init: function() {
		model.currentCat = model.cats[0];
		catView.init();
		catListView.init();
	},

	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	getCats: function() {
		return model.cats;
	},

	setCurrentCat: function(cat) {
		model.currentCat = cat;
	}
}

/* ======= View ======= */
// split in 2 views: list and cat
// each view is an object with 2 properties which are functions: init & render
// use "this" all over the place

// in catView:
// in init function:
//      - store pointers to the DOM (catElement=cat, catNameElement=cat-name, catImageElement=cat-img, countElement=cat-count)
//      - add event listener to the image element and invoke incrementCounter function from Octopus
//      - invoke the render function from this view to render the cat details
// in render function:
//      - define and get the currentCat from the Model via Octopus
//      - update the countElement textContent w/ currentCat's click count
//      - update the catName textContent w/ currentCat's name
//      - update the catImageElement src w/ currentCat's img url

var catView = {
	init: function() {
		this.catElement = document.getElementById('cat');
		this.catNameElement = document.getElementById('cat-name');
		this.catImageElement = document.getElementById('cat-img');
		this.catCountElement = document.getElementById('cat-count');

		this.catImageElement.addEventListener('click', function() {
			octopus.incrementCounter();
		});

		this.render();
	},

	render: function() {
		var currentCat = octopus.getCurrentCat();
		this.catNameElement.textContent = currentCat.name;
		this.catCountElement.textContent = currentCat.clickCount;
		this.catImageElement.src = currentCat.imgSrc;
	}
}

// in catListView:
// in init function:
//      - store pointers to the DOM (catListElement=cat-list)
//      - invoke the render function from this view to render the list
// in render function:
//      - define cats, cat, i, elem to use below
//      - getCats from the octopus and store in cats var above
//      - empty the cat list from template
//      - loop over the cats:
//          - get the curent cat and assign to cat above
//          - create an li elem and assign to elem above
//          - add the current cat name to the  textContent of the li elem
//          - add event listener to the element; use a closure to add the event to each of the cats:
//				in the event listener function return another function that:
//	    	        - calls Octopus setCurrentCat (also sends the event to it)
//  	            - calls catView View render method
//          	self invoke the event listener function with the current cat for the closure
//     		- append the element to the list of cats

var catListView = {
	init: function() {
		this.catListElement = document.getElementById('cat-list');
		this.render();
	},

	render: function() {
		var cats, cat, i, element;
		cats = octopus.getCats();
		this.catListElement.innerHTML = '';
		for(i=0; i<cats.length; i++) {
			cat = cats[i];
			element = document.createElement('li');
			element.textContent = cat.name;
			element.addEventListener('click', (function(event) {
				return function() {
					octopus.setCurrentCat(event);
					catView.render();
				};
			})(cat));
			this.catListElement.appendChild(element);
		};
	}
}

// make it go with init from Octopus!
octopus.init();

