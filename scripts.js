// Create a namespace for the app
const myElephants = {};

// Create function that will make ajax request to be called inside of the init function
myElephants.getElephants = () => {
    $.ajax({
        url: `https://elephant-api.herokuapp.com/elephants/random`,
        method: 'GET',
        dataType: 'jsonp'
    }).then(result => {
        console.log(result);
    })
}

// Create an init function for the app
myElephants.init = () => {
    myElephants.getElephants();
};

// Create a document ready function for the app 
$(function(){
    myElephants.init();
});