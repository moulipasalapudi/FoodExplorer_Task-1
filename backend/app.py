import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
load_dotenv()
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  

# Configure MySQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define Restaurant model
class Restaurant(db.Model):
    __tablename__ = 'zomato_restaurants'
    id = db.Column('Restaurant ID', db.Integer, primary_key=True)
    name = db.Column('Restaurant Name', db.String(100), nullable=False)
    country_code = db.Column('Country Code', db.String(100))
    city = db.Column('City', db.String(100))
    address = db.Column('Address', db.String(200), nullable=False)
    locality = db.Column('Locality', db.String(100))
    locality_verbose = db.Column('Locality Verbose', db.Text)
    longitude = db.Column('Longitude', db.DECIMAL(9, 6))
    latitude = db.Column('Latitude', db.DECIMAL(9, 6))
    cuisines = db.Column('Cuisines', db.String(100))
    avg_cost_for_two = db.Column('Average Cost for two', db.Integer)
    currency = db.Column('Currency', db.String(50))
    has_table_booking = db.Column('Has Table booking', db.String(10))
    has_online_delivery = db.Column('Has Online delivery', db.String(10))
    is_delivering_now = db.Column('Is delivering now', db.String(10))
    switch_to_order_menu = db.Column('Switch to order menu', db.String(10))
    price_range = db.Column('Price range', db.Integer)
    aggregate_rating = db.Column('Aggregate rating', db.DECIMAL(3, 2))
    rating_color = db.Column('Rating color', db.String(50))
    rating_text = db.Column('Rating text', db.String(50))
    votes = db.Column('Votes', db.Integer)

    def __repr__(self):
        return f'<Restaurant {self.id}>'

# Define API endpoints
@app.route('/')
def index():
    return 'Welcome to the Zomato Restaurant API'

# Endpoint to get restaurant by ID
@app.route('/api/restaurants/<int:id>', methods=['GET'])
def get_restaurant_by_id(id):
    restaurant = Restaurant.query.get_or_404(id)
    return jsonify({
        'id': restaurant.id,
        'name': restaurant.name,
        'country_code': restaurant.country_code,
        'city': restaurant.city,
        'address': restaurant.address,
        'locality': restaurant.locality,
        'locality_verbose': restaurant.locality_verbose,
        'longitude': float(restaurant.longitude) if restaurant.longitude else None,
        'latitude': float(restaurant.latitude) if restaurant.latitude else None,
        'cuisines': restaurant.cuisines,
        'avg_cost_for_two': restaurant.avg_cost_for_two,
        'currency': restaurant.currency,
        'has_table_booking': restaurant.has_table_booking,
        'has_online_delivery': restaurant.has_online_delivery,
        'is_delivering_now': restaurant.is_delivering_now,
        'switch_to_order_menu': restaurant.switch_to_order_menu,
        'price_range': restaurant.price_range,
        'aggregate_rating': float(restaurant.aggregate_rating) if restaurant.aggregate_rating else None,
        'rating_color': restaurant.rating_color,
        'rating_text': restaurant.rating_text,
        'votes': restaurant.votes
    })

# Endpoint to get list of unique countries
@app.route('/api/countries', methods=['GET'])
def get_countries():
    countries = db.session.query(Restaurant.country_code).distinct().all()
    country_list = [{'code': country[0], 'name': country[0]} for country in countries]  # Assuming country_code is the country name
    return jsonify({'countries': country_list})

# Endpoint to get list of restaurants with filtering, searching, and pagination methods
@app.route('/api/restaurants', methods=['GET'])
def get_restaurants():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 7, type=int)
    country = request.args.get('country')
    min_cost = request.args.get('min_cost', type=int)
    max_cost = request.args.get('max_cost', type=int)
    cuisine = request.args.get('cuisine')
    search = request.args.get('search')

    query = Restaurant.query

    if country:
        query = query.filter(Restaurant.country_code.ilike(f'%{country}%'))
    if min_cost is not None:
        query = query.filter(Restaurant.avg_cost_for_two >= min_cost)
    if max_cost is not None:
        query = query.filter(Restaurant.avg_cost_for_two <= max_cost)
    if cuisine:
        query = query.filter(Restaurant.cuisines.ilike(f'%{cuisine}%'))
    if search:
        query = query.filter((Restaurant.name.ilike(f'%{search}%')) | 
                             (Restaurant.locality_verbose.ilike(f'%{search}%')))

    total_restaurants = query.count()
    restaurants = query.offset((page - 1) * per_page).limit(per_page).all()

    restaurant_list = []
    for restaurant in restaurants:
        restaurant_data = {
            'id': restaurant.id,
            'name': restaurant.name,
            'country_code': restaurant.country_code,
            'city': restaurant.city,
            'address': restaurant.address,
            'locality': restaurant.locality,
            'locality_verbose': restaurant.locality_verbose,
            'longitude': float(restaurant.longitude) if restaurant.longitude else None,
            'latitude': float(restaurant.latitude) if restaurant.latitude else None,
            'cuisines': restaurant.cuisines,
            'avg_cost_for_two': restaurant.avg_cost_for_two,
            'currency': restaurant.currency,
            'has_table_booking': restaurant.has_table_booking,
            'has_online_delivery': restaurant.has_online_delivery,
            'is_delivering_now': restaurant.is_delivering_now,
            'switch_to_order_menu': restaurant.switch_to_order_menu,
            'price_range': restaurant.price_range,
            'aggregate_rating': float(restaurant.aggregate_rating) if restaurant.aggregate_rating else None,
            'rating_color': restaurant.rating_color,
            'rating_text': restaurant.rating_text,
            'votes': restaurant.votes
        }
        restaurant_list.append(restaurant_data)

    return jsonify({
        'restaurants': restaurant_list,
        'page': page,
        'per_page': per_page,
        'total_restaurants': total_restaurants  # Total number of restaurants
    })

# Main program entry point
if __name__ == '__main__':
    
    with app.app_context():
        db.create_all()
    # Run Flask app in debug mode
    app.run(debug=True)
