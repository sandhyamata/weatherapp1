window.addEventListener("load",() => {
 let long;
let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
     let temperatureDegree = document.querySelector(".temperature-degree");
     let locationTimeZone = document.querySelector(".location-timezone");
         let temperatureSection = document.querySelector(".temperature");
       let temperatureSpan = document.querySelector(".temperature span");
    
    
if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/32feeedcf8681c30d8269f7bb9398087/${lat},${long}`;
       
            fetch(api)
            .then(response =>{
                return response.json();
                
            } )
            .then(data => {
                console.log(data);
                  
                const {temperature,summary,icon} = data.currently;
                //set dom elements from the API
                temperatureDegree.textContent= temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;
                //formula for celsius
                let celsius = (temperature - 32) * (5/9);
                //set icon
                setIcons(icon,document.querySelector(".icon"));
                //change temp to cels/farenheit
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent ==="F"){
                        temperatureSpan.textContent="C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent= "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
                 
        
        });
         }
    function setIcons(icon,iconID){
        const skycons= new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
        
    }
});