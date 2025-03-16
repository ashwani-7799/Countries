const countryname = new URLSearchParams(location.search).get('name');
const flagimage = document.querySelector('.country-details img');
const countrynameH1 = document.querySelector('.country-details h1');
const nativename = document.querySelector('.nativename');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subregion = document.querySelector('.sub-region');
const captial = document.querySelector('.captial');
const tld = document.querySelector('.tld');
const curriences = document.querySelector('.curriences');
const languages = document.querySelector('.languages');
const borderCountry  = document.querySelector('.border-countries');





fetch(`https://restcountries.com/v3.1/name/${countryname}?fullText=true`)
.then((res) => res.json())
.then(([country]) =>{

    console.log(country);
    
    flagimage.src = country.flags.svg;
    countrynameH1.innerText  = country.name.common
    population.innerText = country.population.toLocaleString('en-In');
    region.innerText = country.region;
    tld.innerText = country.tld.join(', ');
    // languages.innerText = 


    if(country.subregion){
      subregion.innerText = country.subregion;

    }

    if(country.captial){
      captial.innerText = country.captial?.[0];
    }

    if (country.name.nativeName) {
        nativename.innerText = Object.values(country.name.nativeName)[0].common
      } else {
        nativename.innerText = country.name.common
      }

      if(country.currencies){
        curriences.innerText = (Object.values(country.currencies).map((currency) => currency.name).join(', '));
    }

    
    if(country.languages){
      languages.innerText = (Object.values(country.languages).join(','));
  }

  if(country.borders){
    country.borders.forEach((border)=> {
      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then((res) => res.json())
      .then(([bordercountry]) =>{
        const bordercountryTag = document.createElement('a');
        bordercountryTag.innerText = bordercountry.name.common;
        // console.log(bordercountryTag); 
        bordercountryTag.href = `country.html?name=${bordercountry.name.common}`
        borderCountry.append(bordercountryTag);
      })
    })
  }



      
})




