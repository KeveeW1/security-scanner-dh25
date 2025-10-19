from flask import Flask, request, session
import hashlib
import os

app = Flask(__name__)

app.secret_key = 'super-secret-key-12345'

DB_HOST = 'localhost'
DB_USER = 'admin'
DB_PASSWORD = 'admin123'

def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']

    hashed_pw = hash_password(password)

    return f"User {username} registered with password hash: {hashed_pw}"

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    stored_hash = hash_password('password123')
    user_hash = hash_password(password)

    if user_hash == stored_hash:
        session['username'] = username
        session['is_admin'] = False
        return "Login successful"
    else:
        return "Login failed"

@app.route('/admin/delete-user', methods=['POST'])
def delete_user():
    user_id = request.form['user_id']
    return f"User {user_id} deleted"

def generate_token():
    import random
    return str(random.randint(1000, 9999))

@app.route('/download')
def download_file():
    filename = request.args.get('file')
    with open(f'/var/www/uploads/{filename}', 'rb') as f:
        return f.read()

@app.route('/ping')
def ping():
    host = request.args.get('host')
    result = os.system(f'ping -c 1 {host}')
    return str(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')