
/* ======= Model ======= */

var model = {
    currentCat: null,
    isFormShowing: false,
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
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        formView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
        formView.render();
    },

    // show the form
    showForm: function() {
    	formView.adminForm.classList.remove('hide');
    	model.isFormShowing ? model.isFormShowing = false : model.isFormShowing = true;
    },

    // cancel the form
    cancelFormInfo: function() {
    	if(model.isFormShowing) {
    		formView.adminForm.classList.add('hide');
    		model.isFormShowing = false;
    	}
    },

    // save the form info into the model and re-render the views
    saveFormInfo: function(newName, newUrl, newClicks) {
		// find the current cat in the original array 
		// and update its info then update the catListView
		var modelCat;
		for (var i=0; i<model.cats.length; i++) {
			modelCat = model.cats[i];
			if (modelCat.name === model.currentCat.name) {
				modelCat.name = newName;
				modelCat.imgSrc = newUrl;
				modelCat.clickCount = newClicks;
				catListView.render();
			};
		};

		// set current cat's name, url and click count and update the catView
		model.currentCat.name = newName;
		model.currentCat.imgSrc = newUrl;
		model.currentCat.clickCount = newClicks;
		catView.render();		
    }

};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    formView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

var formView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		this.adminForm = document.getElementById('form');
		this.adminBtn = document.getElementById('admin-btn');
		this.saveBtn = document.getElementById('save-btn');
		this.cancelBtn = document.getElementById('cancel-btn');
		this.nameInput = document.getElementById('name-input');
		this.urlInput = document.getElementById('url-input');
		this.clicksInput = document.getElementById('clicks-input');

		// on click, show the form
		this.adminBtn.addEventListener('click', function(event) {
			octopus.showForm();
		});

		// on cancel, hide the form
		this.cancelBtn.addEventListener('click', function(event) {
			octopus.cancelFormInfo();
		});

		// on save, update the info in model and views
		this.saveBtn.addEventListener('click', function(event) {
			// get the values from the inputs
			var newName = document.getElementById('name-input').value;
			var newUrl = document.getElementById('url-input').value;
			var newClicks = document.getElementById('clicks-input').value;
			octopus.saveFormInfo(newName, newUrl, newClicks);
		});

		this.render();
	},

	render: function() {
		// update the DOM elements with the values from the current cat
		var currentCat = octopus.getCurrentCat();
		this.nameInput.value = currentCat.name;
		this.urlInput.value = currentCat.imgSrc;
		this.clicksInput.value = currentCat.clickCount;
	}
};


// make it go!
octopus.init();
