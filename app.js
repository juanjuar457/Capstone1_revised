

var state = {
    pets: [], 
    position: 0, 
    etsy: {
        url: '', 
        img: '',
    }

}


//>>>>> PETFINDER RENDER 1st! 
$('#searchButton').click(function(){
    var url = 'http://api.petfinder.com/pet.find?animal=dog&location=89123&breed=corgi&key=65c4992311f187604a92a73f3816308e&output=full&format=json&callback=?';
    $.getJSON(url,
       function(data) {    
       console.log(data)         
        estyQuery(petStoreState(data));
        console.log(state.pets)
        }
        );
    });

function petStoreState (data) {
    console.log(data)
    state.pets = data.petfinder.pets.pet.map(function (pet){
        return {
            id: pet.id.$t,
            img_url: pet.media.photos.photo[3].$t,
            breed: pet.breeds.breed[0] === undefined ? 'Corgi' : pet.breeds.breed[0].$t //problem here not sure why undefinded??
        }
    });   
    state.position = 0; 
    return state.pets[state.position].breed;
};

function buttonPress (data, position) {
    console.log(data);
}

function renderState () {
    $('#red_box').html('<a href ="https://www.petfinder.com/petdetail/' + state.pets[state.position].id +'"> <img height="100px" width="150px" src="' + state.pets[state.position].img_url + '"></a>');  
    var infoHTML = '<div style="display: inline-block"><a target="_bl9nk" href="' + state.etsy.url + '">'  
    infoHTML += '<img height="100px" width="150px" src="' + state.etsy.img + '"</img></a></div>';
    $("#blue_box").html(infoHTML);
};




// //>>>>>>>>>>>>> make function to store the state! store with pets array stuff from ajax call on the petfinder api! 

// var i = state.position //add to i if we go forward button, decrement if we go back button.  
// //make the #searchbutton call === to state.pets array to store the 25 items that we get back from the petfinder api. 
// //then increment or go back depending on button which will manip the position we're on. 


// $('#red_box').append('<a href ="https://www.petfinder.com/petdetail/' + state.pets[i].id.$t +'"> <img class="pullImg" height="100px" width="150px" src="' + pets[0].media.photos.photo[3].$t + '"></a>');



//figure later on how to get rid of seeing them all at once, 25 array total?! 

//need an if loop on input, and to loop through to show them all. (with a for loop..)

// etsy api call 
var api_key = "ou1mf40oocudzdcvdtk92am7";
var shop_name = "WoolArtToys";
var imgPadding = "15px";

// this function adds all the listings with a particular shop_section_id to the website
function estyQuery (breed) {

    $.ajax({
        url: "https://openapi.etsy.com/v2/shops/" + shop_name + "/listings/active.js?keywords=" + breed +"&api_key=" + api_key + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=1",
        dataType: 'jsonp',
        success: function (data) {
            etsyState(data); 
            renderState();
            // $(".pullImg").hover(function () {
            //     $(this).fadeTo('fast', .7);
            // });

            
        },
        //end success block
    });

}

function etsyState (data) {
   if(data.results[0] === undefined) {
        state.etsy.img = '';
        state.etsy.url = '#';
    } else { 
        state.etsy.img = data.results[0].MainImage.url_170x135;
        state.etsy.url = data.results[0].url;
    }
}

//>>>>> Events 


$('#btn_forward').click(function () {
    if (state.position < 24) {
        state.position++; 
    } else {
        state.position = 0; 
    }
    estyQuery(state.pets[state.position].breed); 
}); 



$('#btn_back').click(function() {
    if (state.position > 0) {
        state.position--;
    } else {
        state.position = 24; 
    }
   
    estyQuery(state.pets[state.position].breed);
}); 



// // this is the bit of code that starts everything in motion!
// $(document).ready(function () {
//     //create sections
//     //createSections();
//     populateSection();
// });






