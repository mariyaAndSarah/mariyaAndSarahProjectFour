// Create a namespace for the app
const myElephants = {};

// Create function that will make ajax request to be called inside of the 
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

// Scroll function
myElephants.scroll = function (scrollTo) {
    $('html, body').animate({
        scrollTop: $(scrollTo).offset().top
    }, 800);
}

// Scroll from start button to quiz
myElephants.clickEventStart = () => {
    $('header a').on('click', function (e) {
        e.preventDefault();
        myElephants.scroll('.firstQuestion');
    })
}

// Scroll from first question to second 
myElephants.clickEventQuestionOne = () => {
    $('a.first').on('click', function (e) {
        e.preventDefault();
        myElephants.scroll('.secondQuestion');
    })
}


// Gather user input values and filter API objects based on this
myElephants.clickEventSubmit = () => {
    $('form').on('submit', function(e) {
        e.preventDefault();
        myElephants.scroll('.results');
        $('.results').empty();

      // declare variables to store user input 
        const species = $('input[class="species"]:checked').val();
        const sex = $('input[class="sex"]:checked').val();

        // For loop to go through and match the user input for species and sex
        for (let i = 0; i < myElephants.filteredArray.length; i++) {
            const store = myElephants.filteredArray[i].species;
            const gender = myElephants.filteredArray[i].sex;

            if (store.includes(species) && gender.toLowerCase() === sex) {

                const elephantName = myElephants.filteredArray[i].name;
                const elephantImg = myElephants.filteredArray[i].image;
                const description = myElephants.filteredArray[i].note;
                const wikiLink = myElephants.filteredArray[i].wikilink;
                const elephantDob = myElephants.filteredArray[i].dob;
                const elephantDod = myElephants.filteredArray[i].dod;
                const wikiLink = myElephants.filteredArray[i].wikilink
                const note = myElephants.filteredArray[i].note        
                
                const elephantHtml = 
                `
                <div class="elephant">
                    <h2>${elephantName}</h2>
                    <img src="${elephantImg}" alt="${elephantName}">

                    <p>${elephantDob} - ${elephantDod}</p>
                    <p>${description}</p>
                    <p>${note}</p>
                    <a href="${wikiLink}">Learn More!</a>
                </div>
                `
                $('.results').append(elephantHtml);

            }
        }
    })
}

myElephants.clickEventReset = () => {
    $('.reset').click(function () {
        $('.results').empty();
        myElephants.scroll('.firstQuestion');
    });
}

// Create an init function for the app
myElephants.init = () => {
    myElephants.getElephants();
    myElephants.clickEventStart();
    myElephants.clickEventQuestionOne();
    myElephants.clickEventSubmit();
    myElephants.clickEventReset();
};

// Create a document ready function for the app 
$(function(){
    myElephants.init();
});