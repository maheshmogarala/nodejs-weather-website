//console.log("Client side javascript file loaded.");


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent='From javascript';
messageTwo.textContent='';

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent='Fetching ...';
    const location = search.value;
    const url = '/weather?address='+location;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent='Error'
                messageTwo.textContent=data.error;
            }
            else{
                messageOne.textContent=data.location;
                messageTwo.textContent='It is '+data.temperature+" degrees today. But feels like "+data.feelslike+", with "+data.precip+"% chance of rainfall.";
            }
        })
    });
    //console.log(location)
})