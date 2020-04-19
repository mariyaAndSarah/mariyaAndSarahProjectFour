// // Create an empty object that will be holding all of the code for the application. This object will be the namespace for the application.
const myElephants = {};

// Define a function that will make the ajax request. This function will be called inside of the init function. 
myElephants.getElephants = () => {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: 'http://elephant-api.herokuapp.com/elephants',
        }
    }).then((result) => {
        myElephants.displayElephants(result);
    });
};

// Filter the results so that all of the elephants that are displayed have names as well as functioning images. 
myElephants.displayElephants = (data) => {
    myElephants.filteredArrayOne = data.filter((filterName) => {
        const name = filterName.name;
        return name;

    });
    myElephants.filteredArray = myElephants.filteredArrayOne.filter((filterImage) => {
        const url = filterImage.image;
        if (url.includes('missing')){

        } else {
            return url;
        }
    })
};

// Define a scroll function that will be used throughout the application. This function will be called in the init function. 
myElephants.scroll = function (scrollTo) {
    $('html, body').animate({
        scrollTop: $(scrollTo).offset().top
    }, 650);
}

// Use the scroll function so that when the start link on the landing page is clicked, the page scrolls from the landing page to the first question of the quiz. This function will be called in the init function. 
myElephants.clickEventStart = () => {
    $('header a').on('click', function (e) {
        e.preventDefault();
        myElephants.scroll('.firstQuestion');
    })
}

// Use the scroll function again so that when the 'Next Question' link underneath the first question is clicked, the page scrolls from the first question of the quiz to the second. This function will be called in the init function. 
myElephants.clickEventQuestionOne = () => {
    $('a.first').on('click', function (e) {
        e.preventDefault();
        myElephants.scroll('.secondQuestion');
    })
}

// Create a tooltip pop up that appears on hover of each option selected.
myElephants.labelHover = () => {
    const moveLeft = -400;
    const moveRight = 50;
    const moveDown = -150;

    // Trigger for Asian species label
    $('label.triggerOne').hover(function (e) {
        $('div#hoverFactOne').show();
    }, function () {
        $('div#hoverFactOne').hide();
    });

    $('label.triggerOne').mousemove(function (e) {
        $("div#hoverFactOne").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });

    // Trigger for African species label
    $('label.triggerTwo').hover(function (e) {
        $('div#hoverFactTwo').show();
    }, function () {
            $('div#hoverFactTwo').hide();
    });

    $('label.triggerTwo').mousemove(function (e) {
        $("div#hoverFactTwo").css('top', e.pageY + moveDown).css('left', e.pageX + moveRight);
    });

    // Trigger for girl elephant label
    $('label.triggerThree').hover(function (e) {
        $('div#hoverFactThree').show();
    }, function () {
        $('div#hoverFactThree').hide();
    });

    $('label.triggerThree').mousemove(function (e) {
        $("div#hoverFactThree").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
    });

    // Trigger for boy elephant label
    $('label.triggerFour').hover(function (e) {
        $('div#hoverFactFour').show();
    }, function () {
            $('div#hoverFactFour').hide();
    });

    $('label.triggerFour').mousemove(function (e) {
        $("div#hoverFactFour").css('top', e.pageY + moveDown).css('left', e.pageX + moveRight);
    });
}

// Define a function that will contain the event listener for the submit button. This function will be called in the init function. 
myElephants.clickEventSubmit = () => {
    $('form').on('submit', function(e) {
        e.preventDefault();

        // On submit, the page will scroll to the 'results' section of the app. 
        myElephants.scroll('.results');

        // In addition, the 'results' section of the app will be emptied every click of the submit button. 
        $('.results').empty();

        // Declare two variables that will store the user input for each of the two questions.
        const species = $('input[class="species"]:checked').val();
        const sex = $('input[class="sex"]:checked').val();

        // Create a for loop that loops through the filtered array in order to match the checked species and checked gender with those stored in the API. 
        for (let i = 0; i < myElephants.filteredArray.length; i++) {
            const store = myElephants.filteredArray[i].species;
            const gender = myElephants.filteredArray[i].sex;

            if (store.includes(species) && gender.toLowerCase() === sex) {

                // Declare variables that will be used when appending the API results to the page. 
                const elephantName = myElephants.filteredArray[i].name;
                const elephantImg = myElephants.filteredArray[i].image;
                const description = myElephants.filteredArray[i].note;
                const wikiLink = myElephants.filteredArray[i].wikilink;
                const elephantDob = myElephants.filteredArray[i].dob;
                const elephantDod = myElephants.filteredArray[i].dod;      
                
                // The HTML that will be appended. 
                const elephantHtml = 
                `
                <div class="elephant">
                    <h2>${elephantName}</h2>
                    <img src="${elephantImg}" alt="${elephantName}">
                    <p>${elephantDob} - ${elephantDod}</p>
                    <p>${description}</p>
                    <a href="${wikiLink}">Learn More</a>
                </div>
                `
                // Appending the HTML to the 'results' section. 
                $('.results').append(elephantHtml);
            }
        }
    })
}

// Define a function that will contain the event listener for the reset button. In this event listener, on reset, the 'results' section is emptied, the radio buttons are un-checked, and the app is scrolled back to the landing page.  
myElephants.clickEventReset = () => {
    $('.reset').click(function () {
        $('.results').empty();
        myElephants.scroll('body');
    });
}

// Define the init function for the app and inside of it, call the functions from throughout the app. 
myElephants.init = () => {
    myElephants.getElephants();
    myElephants.clickEventStart();
    myElephants.labelHover();
    myElephants.clickEventQuestionOne();
    myElephants.clickEventSubmit();
    myElephants.clickEventReset();
};

// Define a document ready function for the app and inside of it, call the init function. 
$(function(){
    myElephants.init();
});