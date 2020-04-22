// Create an empty object that will be holding all of the code for the application. This object will be the namespace for the application.
const app = {};

// Cache Jquery selectors
app.$header = $('header a')
app.$firstLink = $('a.first')
app.$form = $('form')
app.$results = $('.results')
app.$audio = $('audio#pop')
app.$reset = $('.reset')

// Define a function that will make the Ajax request. This function will be called inside of the init function. 
app.getElephants = () => {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: 'http://elephant-api.herokuapp.com/elephants',
        }
    }).then((result) => {
        app.displayElephants(result);
    });
};

// Filter the results so that all of the elephants that are displayed have names as well as functioning images. Elephants without names in the API did not have any other data included. 
app.displayElephants = (data) => {
    app.filteredArrayOne = data.filter((filterName) => {
        const name = filterName.name;
        return name;
    });
    app.filteredArray = app.filteredArrayOne.filter((filterImage) => {
        const url = filterImage.image;
        if (url.includes('missing')){

        } else {
            return url;
        }
    })
};

// Define a scroll function that will be used throughout the application. This function will be called in the init function. 
app.scroll = function (scrollTo) {
    $('html, body').animate({
        scrollTop: $(scrollTo).offset().top
    }, 650);
}

// Use the scroll function so that when the start link on the landing page is clicked, the page scrolls from the landing page to the first question of the quiz. This function will be called in the init function. 
app.clickEventStart = () => {
    app.$header.on('click', function (e) {
        e.preventDefault();
        app.scroll('.firstQuestion');
    })
}

// Use the scroll function again so that when the 'Next Question' link underneath the first question is clicked, the page scrolls from the first question of the quiz to the second. This function will be called in the init function. 
app.clickEventQuestionOne = () => {
    app.$firstLink.on('click', function (e) {
        e.preventDefault();
        app.scroll('.secondQuestion');
    })
}

// On click of each of the labels, append the appropriate image to the top center of the page and clear the default image.  
app.clickFunction = (label, clickedPic, removedPic, defaultPic) => {
    $(label).on('click', function(){
        $(clickedPic).addClass('visible')
        $(removedPic).removeClass('visible')
        $(defaultPic).css('visibility', 'hidden')
    })
}

// Define a function that will contain the event listener for the submit button. This function will be called in the init function. 
app.clickEventSubmit = () => {
    app.$form.on('submit', function(e) {
        e.preventDefault();

        // On submit, the page will scroll to the 'results' section of the app. 
        app.scroll(app.$results);

        // In addition, the 'results' section of the app will be emptied with every click of the submit button. 
        $(app.$results).empty();

        // On submit, play the audio file of an elephant. You are welcome.
        app.$audio[0].play()
    
        // Declare two variables that will store the user input for each of the two questions.
        const species = $('input[class="species"]:checked').val();
        const sex = $('input[class="sex"]:checked').val();

        // Create a for loop that loops through the filtered array in order to match the checked species and checked gender with those stored in the API. 
        for (let i = 0; i < app.filteredArray.length; i++) {
            const store = app.filteredArray[i].species;
            const gender = app.filteredArray[i].sex;
        
            if (store.includes(species) && gender.toLowerCase() === sex) {

                // Declare variables that will be used when appending the API results to the page. 
                const elephantName = app.filteredArray[i].name;
                const elephantImg = app.filteredArray[i].image;
                const description = app.filteredArray[i].note;
                const wikiLink = app.filteredArray[i].wikilink;
                const elephantDob = app.filteredArray[i].dob;
                const elephantDod = app.filteredArray[i].dod;    
                const elephantType = app.filteredArray[i].species;  
                
                // The HTML that will be appended. 
                const elephantHtml = 
                `
                <div class="elephant" tabindex="0">
                    <h2>${elephantName}</h2>
                    <img src="${elephantImg}" alt="An ${elephantType} elephant named ${elephantName}">
                    <p>${elephantDob} - ${elephantDod}</p>
                    <p>${description}</p>
                    <a href="${wikiLink} ">Learn More</a>
                </div>
                `
                // Appending the HTML to the 'results' section. 
                $('.results').append(elephantHtml);
            }
        }
    })
}

// Define a function that will contain the event listener for the reset button. In this event listener, on reset, the 'results' section is emptied, the radio buttons are un-checked, and the app is scrolled back to the landing page.  
app.clickEventReset = () => {
    app.$reset.click(function () {
        app.$results.empty();
        $('.mapsOne, .maps, .boyPicture, .girlPicture').removeClass('visible');
        $('.defaultMap').css('visibility', 'visible');
        $('.defaultGender').css('visibility', 'visible');
        app.scroll('body');
    });
}

// Define the init function for the app and inside of it, call the functions from the app namespace. 
app.init = () => {
    app.getElephants();
    app.clickEventStart();
    app.clickFunction('label.asia', '.maps', '.mapsOne', '.defaultMap')
    app.clickFunction('label.africa', '.mapsOne', '.maps', '.defaultMap')
    app.clickFunction('label.girl', '.girlPicture', '.boyPicture', '.defaultGender');
    app.clickFunction('label.boy', '.boyPicture', '.girlPicture', '.defaultGender')
    app.clickEventQuestionOne();
    app.clickEventSubmit();
    app.clickEventReset();
};

// Define a document ready function for the app and call the init function. 
$(function(){
    app.init();
});


