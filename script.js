const countriescontainer = document.querySelector(".countries-container");
const filterbyregion = document.querySelector(".filterbyregion");
const searchinput = document.querySelector(".search-container input");
const theme = document.querySelector('.theme');
let allcountriesdata;



function local(){
    const currenttheme = localStorage.getItem('theme') || 'light';
 
    document.body.classList.add(currenttheme);
    
    
    
    if(currenttheme ==='dark'){
        theme.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;&nbsp;Light Mode`;
    
    }
    
    else{
        theme.innerHTML = `<i class="fa-regular fa-moon"></i> &nbsp;&nbsp;Dark Mode`;
    
    }
}

local();
themechecker();


fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) =>{
        rendercountries(data);        
        allcountriesdata = data;
    })


    if(filterbyregion){
        filterbyregion.addEventListener('change', (e) =>{
    
            fetch(`https://restcountries.com/v3.1/region/${filterbyregion.value}`)
            .then((res) => res.json())
            .then(rendercountries)
        })

    }



function rendercountries(data){
     
    if(countriescontainer){
        countriescontainer.innerHTML = ``;
        data.forEach((country) => {
            
    
            // console.log(country.languages.);
    
            
           const countrycard = document.createElement("a");
            countrycard.classList.add("country-card");
            countrycard.href = `/country.html?name=${country.name.common}`;
    
            // const cardimg = document.createElement('img');
            // cardimg.src = 'https://flagcdn.com/is.svg'
            // countrycard.append(cardimg);
    
            countrycard.innerHTML = `
    <img src= ${country.flags.svg} alt="flag" />
          <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>population: </b>${country.population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Captial: </b>${country.capital?.[0] ?? 'No capital available'}
        </p>
          </div>`
    
            countriescontainer.append(countrycard);
        });
    }

}

if(searchinput){
    searchinput.addEventListener('input' , (e)=>{
        e.target.value;
        const filteredCountries = allcountriesdata.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
        rendercountries(filteredCountries);
       })
}


let isdarkmode;

function themechecker(){
    (theme).addEventListener('click' , ()=>{
         isdarkmode = document.body.classList.toggle('dark');
    
        if(isdarkmode){
            theme.innerHTML = `<i class="fa-regular fa-sun"></i> &nbsp;&nbsp;Light Mode`;
            localStorage.setItem('theme' , 'dark');
        }
    
        else{
            theme.innerHTML = `<i class="fa-regular fa-moon"></i> &nbsp;&nbsp;Dark Mode`;
            localStorage.setItem('theme' , 'light')
        }
    
    })
}
