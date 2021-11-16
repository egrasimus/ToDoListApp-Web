const requestUrl = 'http://a0598837.xsph.ru/api/todos/'
const dataWrapper = document.getElementById('data-wrapper')

const createTemplate = data =>{
    return `
      <div class="data-item" style="background: #ffffff; border-radius: 10px; margin-bottom:30px; " >
      <h2 style="padding: 15px; font-size: 20px; text-align: left;color:#ffffff; background: #006C84; border-top-right-radius:10px;border-top-left-radius:10px;">${data.title}
      </h2>
      <p style="padding: 15px;text-align: left;">${data.description} </p>
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