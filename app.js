var favBtn = document.getElementById("favBtn");
var results = document.getElementById("results")

favBtn.onclick = function() {
  results.innerHTML = '';

  var favNum = document.getElementById("favNum").value;

  const regex = /()\W/g;

  if (!favNum) {
      alert('enter your favorite number')
  } else if (favNum.match(regex)){

    // *********** code for getting multiple facts here ************

      favNum = favNum.replace(/(\s)/g, '');

      let url = `http://numbersapi.com/${favNum}`
      let ourPromise = axios.get(url);
      ourPromise = axios.get(url);

      ourPromise.then(data => handleResponse(data))

      ourPromise.catch(err => console.log("REJECTED!", err))

    // *******************************************************************
    
  } else {

    // ********** code for getting a favorite number fact here ***********

    // ** numbers must be separated by commas **

    let url = `http://numbersapi.com/${favNum}/?json`;
    let ourPromise = axios.get(url);
    
    ourPromise.then(data => handleResponse(data))

    ourPromise.catch(err => console.log("REJECTED!", err))

    // *******************************************************************

  }
}



function handleResponse(data){
  let res = data.data;

  let facts = [];

  if (res.text){

    let fact = `
      ${res.text}
    `;


    return results.append(fact)

  } else {
        
    for(var key in res) {

      // ***** neither of these seem to work using html within template literals

      // * option 1 *
      let fact = `<p>${res[key]}.</p>`
      facts.push(fact)

      // * option 2 *

      // facts.push(`<p>${res[key]}</p>`)

    }
    
    return results.append(facts)
    
  }
}