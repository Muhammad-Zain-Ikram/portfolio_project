from flask import Flask, request, g, redirect, url_for, render_template,jsonify
import sqlite3

app = Flask(__name__)


app.secret_key = 'supersecretkey'

# Create a connection to the database in each request
@app.before_request
def before_request():
    g.conn = sqlite3.connect("database.db",check_same_thread=False)

# Close the connection after each request
@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'conn'):
        g.conn.close()

@app.route('/')
def index():
    return render_template("index.html")

# Route to handle form submission
@app.route('/contact', methods=['POST'])
def postIndex():
    name = request.form['name']
    email = request.form['email']
    number = request.form['number']
    message = request.form['message']

    # Insert data into SQLite database
    g.conn.execute("INSERT INTO user (name, email, contact,message) VALUES (?, ?, ?, ?)", 
                   (name, email, number,message))
    g.conn.commit()
    data = {'result' : 'true'}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)