var favBtn = document.getElementById("favBtn");
var results = document.getElementById("results");
var multifacts = document.getElementById("multifacts");


favBtn.onclick = function() {
  results.innerHTML = '';
  var favNum = document.getElementById("favNum").value;
  const regex = /()\W/g;


  // need error handling for inability to get multiple facts for multiple 'favorite' numbers
  
  if (!favNum) {
      alert('enter your favorite number')

  } else if (favNum.match(regex)){
    multiNumFact(favNum)

  } else if(!multifacts.checked){
    singleFavNumFact(favNum);

  } else {
    multiFavNumFacts(favNum)

  }
}



  // ********** get favorite number fact here ***********

function singleFavNumFact(numData){

  let url = `http://numbersapi.com/${numData}/?json`;
  let ourPromise = axios.get(url);
  
  ourPromise.then(data => handleResponse(data))

  ourPromise.catch(err => console.log("REJECTED!", err))
}

// *********** get multiple facts for different numbers here ************

function multiNumFact(numData){
  favNum = numData.replace(/(\s)/g, '');

  let url = `http://numbersapi.com/${favNum}`
  let ourPromise = axios.get(url);
  ourPromise = axios.get(url);

  ourPromise.then(data => handleResponse(data))

  ourPromise.catch(err => console.log("REJECTED!", err))
}

// *********** get multiple facts for favorite number here

function multiFavNumFacts(numData){

  let fourFactsPromises = [];

  for (let i = 1; i < 5; i++) {
    fourFactsPromises.push(
      axios.get(`http://numbersapi.com/${numData}`)
    );
  }

  let fourFacts = [];

  Promise.all(fourFactsPromises)
    .then(factsArr => (
      factsArr.forEach(fact => fourFacts.push(fact))
    ))
    .catch(err => console.log(err));

  handleResponse(fourFacts)
}

// *********** return data from api to user ***********

function handleResponse(factInfo){
console.log(factInfo)
  let res = factInfo.data;

  let facts = [];

  if(multifacts.checked){
    console.log(factInfo)

    factInfo.forEach(fact => console.log(fact.data))
    // factInfo.forEach(fact => $("results").append(`<p>${fact.data}</p>`))


  } else {
  
    if (res.text){

    let fact = `
      ${res.text}
    `;

    return results.append(fact)

    } else {

      for(var key in res) {

        // ***** come back later and get this to work with jquery's append method for a cleaner look

        // * option 1 *
        // let fact = `<p>${res[key]}</p>`;

        // results += fact;

        // * option 2 *

        facts.push(`${res[key]}`)

      }

      return results.innerHTML = facts;
    
    }  
  }
}