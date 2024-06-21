const apiUrl = 'http://localhost:5000/api/restaurants';

document.addEventListener('DOMContentLoaded', () => {
    fetchData(apiUrl);  // Fetch initial data when page loads
    populateFilters();  // Populate filters when page loads

    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');

    if (restaurantId) {
        fetchRestaurantDetails(restaurantId);
    }
});

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayRestaurants(data.restaurants);
        displayPagination(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = '';

    if (restaurants.length === 0) {
        restaurantList.innerHTML = '<p class="no-results">No restaurants found with applied filters.</p>';
        return;
    }

    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.classList.add('restaurant');
        restaurantCard.innerHTML = `
            <h2>${restaurant.name}</h2>
            <p><strong>Address:</strong> ${restaurant.address}</p>
            <p><strong>City:</strong> ${restaurant.city}</p>
            <p><strong>Country:</strong> ${restaurant.country_code}</p>
            <p><strong>Cuisines:</strong> ${restaurant.cuisines}</p>
            <p><strong>Avg Cost for Two:</strong> ${restaurant.avg_cost_for_two}</p>
            <p><strong>Rating:</strong> ${restaurant.aggregate_rating}</p>
            <button onclick="viewDetails(${restaurant.id})">View Details</button>
        `;
        restaurantList.appendChild(restaurantCard);
    });
}

function viewDetails(id) {
    window.location.href = `restaurant.html?id=${id}`;
}

function displayPagination(data) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(data.total_restaurants / data.per_page);
    const currentPage = data.page;

    const createButton = (text, page, isDisabled = false) => {
        const button = document.createElement('button');
        button.textContent = text;
        if (isDisabled) {
            button.disabled = true;
        } else {
            button.addEventListener('click', () => {
                fetchData(`${apiUrl}?page=${page}&country=${getCurrentCountry()}&cuisine=${getCurrentCuisine()}`);
            });
        }
        return button;
    };

    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (totalPages >= maxPagesToShow && endPage - startPage < maxPagesToShow) {
        startPage = endPage - maxPagesToShow + 1;
    }

    paginationContainer.appendChild(createButton('First', 1, currentPage === 1));
    paginationContainer.appendChild(createButton('Previous', currentPage - 1, currentPage === 1));

    for (let i = startPage; i <= endPage; i++) {
        const button = createButton(i, i, i === currentPage);
        if (i === currentPage) {
            button.classList.add('active');
        }
        paginationContainer.appendChild(button);
    }

    paginationContainer.appendChild(createButton('Next', currentPage + 1, currentPage === totalPages));
    paginationContainer.appendChild(createButton('Last', totalPages, currentPage === totalPages));
}

async function populateFilters() {
    const countrySelect = document.getElementById('country');
    countrySelect.innerHTML = '<option value="">All Countries</option>';

    try {
        const response = await fetch('http://localhost:5000/api/countries');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        data.countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });

        // Retrieve current filters from URL and pre-select them
        const urlParams = new URLSearchParams(window.location.search);
        const countryParam = urlParams.get('country');
        if (countryParam) {
            countrySelect.value = countryParam;
        }

        applyFilters(); // Apply filters initially
    } catch (error) {
        console.error('Error fetching filters:', error);
    }
}

function applyFilters() {
    const country = getCurrentCountry();
    const cuisine = document.getElementById('cuisine').value;
    const minCost = document.getElementById('min_cost').value;
    const maxCost = document.getElementById('max_cost').value;

    let url = `${apiUrl}?country=${country}&cuisine=${cuisine}`;
    if (minCost) {
        url += `&min_cost=${minCost}`;
    }
    if (maxCost) {
        url += `&max_cost=${maxCost}`;
    }

    fetchData(url);
}

function getCurrentCountry() {
    return document.getElementById('country').value;
}

function getCurrentCuisine() {
    return document.getElementById('cuisine').value;
}

async function fetchRestaurantDetails(id) {
    try {
        const response = await fetch(`http://localhost:5000/api/restaurants/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const restaurant = await response.json();
        displayRestaurantDetails(restaurant);
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
    }
}

function displayRestaurantDetails(restaurant) {
    const detailsContainer = document.getElementById('restaurant-details');
    detailsContainer.innerHTML = `
        <div class="restaurant-card">
            <h2>${restaurant.name}</h2>
            <div class="restaurant-info">
                <div><strong>Address:</strong> ${restaurant.address}</div>
                <div><strong>City:</strong> ${restaurant.city}</div>
                <div><strong>Country:</strong> ${restaurant.country_code}</div>
                <div><strong>Locality:</strong> ${restaurant.locality}</div>
                <div><strong>Locality Verbose:</strong> ${restaurant.locality_verbose}</div>
                <div><strong>Longitude:</strong> ${restaurant.longitude}</div>
                <div><strong>Latitude:</strong> ${restaurant.latitude}</div>
                <div><strong>Cuisines:</strong> ${restaurant.cuisines}</div>
                <div><strong>Average Cost for Two:</strong> ${restaurant.avg_cost_for_two}</div>
                <div><strong>Currency:</strong> ${restaurant.currency}</div>
                <div><strong>Table Booking Available:</strong> ${restaurant.has_table_booking ? 'Yes' : 'No'}</div>
                <div><strong>Online Delivery Available:</strong> ${restaurant.has_online_delivery ? 'Yes' : 'No'}</div>
                <div><strong>Is Delivering Now:</strong> ${restaurant.is_delivering_now ? 'Yes' : 'No'}</div>
                <div><strong>Switch to Order Menu:</strong> ${restaurant.switch_to_order_menu ? 'Yes' : 'No'}</div>
                <div><strong>Price Range:</strong> ${restaurant.price_range}</div>
                <div><strong>Aggregate Rating:</strong> ${restaurant.aggregate_rating}</div>
                <div><strong>Rating Color:</strong> ${restaurant.rating_color}</div>
                <div><strong>Rating Text:</strong> ${restaurant.rating_text}</div>
                <div><strong>Votes:</strong> ${restaurant.votes}</div>
            </div>
            <button onclick="goBack()">Back</button>
        </div>
    `;
}

function goBack() {
    window.history.back();
}
