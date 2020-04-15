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
    myElephants.filteredArray = data.filter((filterElephant) => {
        const name = filterElephant.name;
        return name;
    });
    console.log(myElephants.filteredArray)
};


// Gather user input values and filter API objects based on this
myElephants.clickEventSubmit = () => {
    $('form').on('submit', function(e) {
        e.preventDefault();
      // declare variables to store user input 
        const species = $('input[class="species"]:checked').val();
        const sex = $('input[class="sex"]:checked').val();
        // const death = $('input[class="death"]:checked').val();
        console.log(species, sex)
        
        let userSelectionValue;
        // const selectionArray = [];
        for (let i = 0; i < myElephants.filteredArray.length; i++) {
            const store = myElephants.filteredArray[i].species;
            const gender = myElephants.filteredArray[i].sex;
            console.log(gender)
            if (store.includes(species) && gender == sex) {
                console.log(myElephants.filteredArray[i])
            }
            else {
                console.log('no match')
            }
        }
    } )
}


// syntax for getting the key from the array object
// array[i].key

// Get the location 
    // user selects species type: Asian or African
    // declare selectSpecies variable to store the user input 

// Get the sex
    // user selects elephant type: Male or Female
    // declare selectSex variable to store the user input 

// Get by dead or alive
    // user selects if they want to see an elephant that is still living or dead
    // declare selectStatus variable to store the user input
    // if selectStatus variable.length = > 2 && < = 5, elephant is dead
    // else, elephant is alive

// Filter the results
    // for loop going through the array to see whether the user selected Asian or African
    // check if user input === API object data (array.Species)

// Display name, affiliation, image, note


// Create an init function for the app
myElephants.init = () => {
    myElephants.getElephants();
    
    myElephants.clickEventSubmit();
};


// Create a document ready function for the app 
$(function(){
    myElephants.init();
});