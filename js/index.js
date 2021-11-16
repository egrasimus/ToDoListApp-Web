const requestUrl = ''
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
fetch('http://a0598837.xsph.ru/api/todos/')
.then(response => response.json())
     .then(data => {
         if(data){
             data.forEach(element => {
                 dataWrapper.innerHTML += createTemplate(element)
             });
         }
         console.log(data)
        })


// function loadtodos(){
//     var xhr = new XMLHttpRequest();
//     var formData = new FormData();
//     formData.append("login", "egrasimus");
//     formData.append("password", "123");

//     xhr.open('POST', 'http://localhost:3000/api/auth/login', false);
//     xhr.send(formData)
//     if (xhr.status != 200) {
//         // обработать ошибку
//         alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
//       } else {
//         // вывести результат
//         alert(xhr.responseText);
//       }
// }