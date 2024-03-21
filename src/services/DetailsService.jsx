

export const fetchStatistics = async (days) => {
    const apiKey = '753730ee35554e77a6a104318242103'; 
    const apiUrl = 'http://api.weatherapi.com/v1/forecast.json';
    const location = localStorage.getItem('location');
    const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}&days=${days}&aqi=no&alerts=no`);
    const data = await response.json();
    return data;
}