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