[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YKU87tP_)
# Project Assignment: Zomato Restaurant Listing & Searching
 




<p><strong>Deadline:</strong> 2 days ago</p>

<h2>Key Use Cases</h2>

<ul>
    <li>Data Loading: Create an independent script to load the Zomato restaurant data into a database.</li>
    <li>Web API Service:
        <ul>
            <li>Get Restaurant by ID: Retrieve details of a specific restaurant by its ID.</li>
            <li>Get List of Restaurants: Fetch a list of restaurants with pagination support.</li>
        </ul>
    </li>
    <li>User Interface:
        <ul>
            <li>Restaurant List Page: Display a list of restaurants. Clicking on a restaurant should navigate
                the user to the restaurant's detail page.</li>
            <li>Restaurant Detail Page: Show details of a specific restaurant.</li>
        </ul>
    </li>
</ul>

<h2>Additional Use Cases (Optional)</h2>
<p>If time allows, implement the following additional features, ensuring they are supported in both the API and the UI:</p>
<ul>
    <li>Filtering Options:
        <ul>
            <li>By Country</li>
            <li>By Average Spend for Two People</li>
            <li>By Cuisines</li>
        </ul>
    </li>
    <li>Search Functionality: Enable search for restaurants by name and description.</li>
</ul>

<hr>

<h2>Process to Complete the Task - FoodExplorer</h2>

<h3>Installation and Setup</h3>

<h4>1. Install MySQL</h4>
<p>Install MySQL Server and MySQL Command Line Client:</p>
<ul>
    <li>Download MySQL Server from <a href="https://dev.mysql.com/downloads/mysql/">MySQL Official Website</a>.</li>
    <li>Follow the installation instructions for your operating system.</li>
    <li>Ensure MySQL server is running.</li>
</ul>

<h4>2. Install Python and Dependencies</h4>
<p>Ensure Python 3.x is installed. Install required Python packages:</p>
<pre>
pip install mysql-connector-python pandas sqlalchemy flask
</pre>

<h4>3. Download Data from Kaggle</h4>
<p>Download the Zomato Restaurants dataset from <a href="https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data">Kaggle</a>.</p>
<p>Use Kaggle CLI or download directly from the website. Place the dataset in a directory accessible to your application.</p>
</pre>

<h4>4. Unzip Dataset and Load Data into MySQL</h4>
<p>Use MySQL CLI to create a database, load data from the dataset:</p>
<pre>
mysql -u username -p -e "CREATE DATABASE dbname; USE dbname; SOURCE data/dataset.zip;"
</pre>


<h3>Backend Setup</h3>

<h4>1. Configure Backend</h4>
<p>Edit the <code>.env</code> file in the <code>backend/</code> directory:</p>
<pre>
DATABASE_URL=mysql+pymysql://username:password@localhost/dbname
</pre>
<p>Replace <code>username</code>, <code>password</code>, and <code>dbname</code> with your MySQL credentials.</p>


<h3>6. Run Flask Application</h3>
<p>Start the Flask backend server:</p>
<pre>
python app.py
</pre>

<hr>

<h2 id="api-endpoints">API Endpoints</h2>

<h3>1. Get Restaurant by ID</h3>
<p>Retrieve details of a specific restaurant by its ID.</p>
<pre>
http://localhost:5000/api/restaurants/{id}

</pre>

<h3>2. Get List of Restaurants</h3>
<p>Fetch a list of restaurants with support for filtering, searching, and pagination.</p>
<pre>
http://locahost:5000/restaurants?page={page}&per_page={per_page}&country={country}&min_cost={min_cost}&max_cost={max_cost}&cuisine={cuisine}&search={search}
</pre>

<h3>3. Get List of Countries</h3>
<p>Fetch a list of unique countries available in the dataset.</p>
<pre>
http://localhost:5000/api/countries
</pre>
<h3>Frontend Setup</h3>

<p>After setting up the backend, start a simple HTTP server to access the frontend:</p>
    <pre>
python -m http.server 8080
    </pre>
<h2>Accessing the Application</h2>



<h3>Frontend Application</h3>
    <p>The frontend application can be accessed by opening <code>http://localhost:8080/</code> in a web browser.</p>

<h2>Dockerization Attempt</h2>
<p>I attempted to dockerize the application but encountered issues:</p>
<ul>
    <li>Backend and frontend Docker images were successfully created.</li>
    <li>Encountered difficulties in configuring MySQL container for data loading.</li>
    <li>Integration challenges between Docker containers for seamless operation.</li>
</ul>
<p>Future work involves resolving these issues to achieve a fully dockerized deployment.</p>
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YKU87tP_)
# Project Assignment: Zomato Restaurant Listing & Searching
 




<p><strong>Deadline:</strong> 2 days ago</p>

<h2>Key Use Cases</h2>

<ul>
    <li>Data Loading: Create an independent script to load the Zomato restaurant data into a database.</li>
    <li>Web API Service:
        <ul>
            <li>Get Restaurant by ID: Retrieve details of a specific restaurant by its ID.</li>
            <li>Get List of Restaurants: Fetch a list of restaurants with pagination support.</li>
        </ul>
    </li>
    <li>User Interface:
        <ul>
            <li>Restaurant List Page: Display a list of restaurants. Clicking on a restaurant should navigate
                the user to the restaurant's detail page.</li>
            <li>Restaurant Detail Page: Show details of a specific restaurant.</li>
        </ul>
    </li>
</ul>

<h2>Additional Use Cases (Optional)</h2>
<p>If time allows, implement the following additional features, ensuring they are supported in both the API and the UI:</p>
<ul>
    <li>Filtering Options:
        <ul>
            <li>By Country</li>
            <li>By Average Spend for Two People</li>
            <li>By Cuisines</li>
        </ul>
    </li>
    <li>Search Functionality: Enable search for restaurants by name and description.</li>
</ul>

<hr>

<h2>Process to Complete the Task - FoodExplorer</h2>

<h3>Installation and Setup</h3>

<h4>1. Install MySQL</h4>
<p>Install MySQL Server and MySQL Command Line Client:</p>
<ul>
    <li>Download MySQL Server from <a href="https://dev.mysql.com/downloads/mysql/">MySQL Official Website</a>.</li>
    <li>Follow the installation instructions for your operating system.</li>
    <li>Ensure MySQL server is running.</li>
</ul>

<h4>2. Install Python and Dependencies</h4>
<p>Ensure Python 3.x is installed. Install required Python packages:</p>
<pre>
pip install mysql-connector-python pandas sqlalchemy flask
</pre>

<h4>3. Download Data from Kaggle</h4>
<p>Download the Zomato Restaurants dataset from <a href="https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data">Kaggle</a>.</p>
<p>Use Kaggle CLI or download directly from the website. Place the dataset in a directory accessible to your application.</p>
</pre>

<h4>4. Unzip Dataset and Load Data into MySQL</h4>
<p>Use MySQL CLI to create a database, load data from the dataset:</p>
<pre>
mysql -u username -p -e "CREATE DATABASE dbname; USE dbname; SOURCE data/dataset.zip;"
</pre>


<h3>Backend Setup</h3>

<h4>1. Configure Backend</h4>
<p>Edit the <code>.env</code> file in the <code>backend/</code> directory:</p>
<pre>
DATABASE_URL=mysql+pymysql://username:password@localhost/dbname
</pre>
<p>Replace <code>username</code>, <code>password</code>, and <code>dbname</code> with your MySQL credentials.</p>


<h3>6. Run Flask Application</h3>
<p>Start the Flask backend server:</p>
<pre>
python app.py
</pre>

<hr>

<h2 id="api-endpoints">API Endpoints</h2>

<h3>1. Get Restaurant by ID</h3>
<p>Retrieve details of a specific restaurant by its ID.</p>
<pre>
http://localhost:5000/api/restaurants/{id}

</pre>

<h3>2. Get List of Restaurants</h3>
<p>Fetch a list of restaurants with support for filtering, searching, and pagination.</p>
<pre>
http://locahost:5000/restaurants?page={page}&per_page={per_page}&country={country}&min_cost={min_cost}&max_cost={max_cost}&cuisine={cuisine}&search={search}
</pre>

<h3>3. Get List of Countries</h3>
<p>Fetch a list of unique countries available in the dataset.</p>
<pre>
http://localhost:5000/api/countries
</pre>
<h3>Frontend Setup</h3>

<p>After setting up the backend, start a simple HTTP server to access the frontend:</p>
    <pre>
python -m http.server 8080
    </pre>
<h2>Accessing the Application</h2>



<h3>Frontend Application</h3>
    <p>The frontend application can be accessed by opening <code>http://localhost:8080/</code> in a web browser.</p>

<h2>Dockerization Attempt</h2>
<p>I attempted to dockerize the application but encountered issues:</p>
<ul>
    <li>Backend and frontend Docker images were successfully created.</li>
    <li>Encountered difficulties in configuring MySQL container for data loading.</li>
    <li>Integration challenges between Docker containers for seamless operation.</li>
</ul>
<p>Future work involves resolving these issues to achieve a fully dockerized deployment.</p>
<footer>
    <h2>Sample User Interface</h2>
    <p>This section provides a visual example of how the application interface should look:</p>
    <div>
        <img src="file2.png" alt="Sample UI 1" style="width: 65%;">
        <img src="file1.png" alt="Sample UI 2" style="width: 45%; margin-left: 1%;">
    </div>
</footer>


</body>
</html>


</body>
</html>
