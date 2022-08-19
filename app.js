window.addEventListener('load', ()=>
{
    let long;
    let lat;
    let temperatureDescription=document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".temperature-degree");
    let locationTimezone=document.querySelector(".location-timezone");
    let temperatueSection=document.querySelector(".temperature");
    const temperatueSpan=document.querySelector(".temperature span");

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position =>
            {
                long=position.coords.longitude;
                lat=position.coords.latitude;
                const proxy="https://cors-anywhere.herokuapp.com/";
                const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

                fetch(api)
                    .then(response=>
                        {
                            return response.json();
                        });
                    then(data =>
                        {
                            console.log(data);
                            const {temperatue, summary, icon}=data.currently;
                            //Set DOM Elements from the API
                            temperatureDegree.textContent=temperature;
                            temperatureDescription.textcontent=summary;
                            locationTimezone.textContent=data.timezone;
                            //Formula for celsius
                            let celsius= (temperature-32)*(5/9);
                            //Set Icon
                            setIcons(icon, document.querySelector(".icon"));

                            //Change temperature to Celsius or Fahrenheit
                            temperatureSection.andEventListener("click", () =>
                            {
                                if(temperatureSpan.textContent=="F")
                                {
                                    temperatueSpan.textContent="C";
                                    temperatureDegree.textContent=Math.floor(celsius);
                                }
                                else
                                {
                                    temperatueSpan.textContent="F";
                                    temperatureDegree.textContent=temperature;
                                }
                            });
                        });
            });
    }
    else
    {
        h1.textContent= "Please enable geolocation";
    }
    function setIcons(icon, iconID)
    {
        const skycons=new Skycons({color: "white"});
        const currentIcon=icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});