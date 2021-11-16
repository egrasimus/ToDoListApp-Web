const {requestUrl} = require('../initiator')
const dataWrapper = document.getElementById('data-wrapper')

const createTemplate = data =>{
    return `
    <div class="data-item">
        <div><span>Задача: </span>${data.title}</div>
        <div><span>Описание: </span>${data.description}</div>
        <br>
    </div>
    `
}
fetch(requestUrl)


.then(response => response.json())
     .then(data => {
         if(data){
             data.forEach(element => {
                 dataWrapper.innerHTML += createTemplate(element)
             });
         }
         console.log(data)
        })