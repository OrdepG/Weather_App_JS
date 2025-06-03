const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () =>{

const APIkey = '50a874e7fdfbc8fdbb5376a410fc63f7';
const APIunsplash = 'bnIfEUar5y3MuzavdJVHHzSRc6-u5mX4aGo7bYeELQg';
const city = document.querySelector('.search-box input').value.trim();

if(city === '') return;

try{
    const [weatherRes, imagesRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`),
        fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${APIunsplash}&per_page=4`)
    ]);

    const weatherData = await weatherRes.json();
    const imagesData = await imagesRes.json();
    

    if(weatherData.cod === '404' || weatherData.cod === 404){
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(weatherData.weather[0].main){
            case 'Clear': image.src = 'images/clear.png'; break;
            case 'Rain': image.src = 'images/rain.png'; break;
            case 'Snow': image.src = 'images/snow.png'; break;
            case 'Clouds': image.src = 'images/cloud.png'; break;
            case 'Haze': image.src = 'images/haze.png'; break;
            default: image.src = '';
        }

        temperature.innerHTML = `${parseInt(weatherData.main.temp)}<span>ºC</span>`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        wind.innerHTML = `${parseInt(weatherData.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        if(window.innerWidth <= 480){
            container.style.height = 'auto';
        }else{
        container.style.height = '800px';
        }

        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

        imagesData.results.forEach(img => {
            const image = document.createElement('img');
            image.src = img.urls.small;
            image.alt = city;
            image.classList.add('city-image');
            image.style.objectFit = 'cover';
            
            gallery.appendChild(image);
        });
    } catch (erro) {
        console.error('Erro geral:', erro);
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
    }
});
