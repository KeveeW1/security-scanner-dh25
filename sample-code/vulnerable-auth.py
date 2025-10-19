# Sample vulnerable Python code for testing CodeGuardian
# This file contains authentication and cryptography vulnerabilities

from flask import Flask, request, session
import hashlib
import os

app = Flask(__name__)

# VULNERABILITY: Hardcoded secret key
app.secret_key = 'super-secret-key-12345'

# VULNERABILITY: Hardcoded database credentials
DB_HOST = 'localhost'
DB_USER = 'admin'
DB_PASSWORD = 'admin123'  # Hardcoded password!

# VULNERABILITY: Weak hashing algorithm (MD5)
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

# VULNERABILITY: No password strength validation
@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']

    # VULNERABILITY: Using MD5 for password hashing
    hashed_pw = hash_password(password)

    # Store user (mock)
    # VULNERABILITY: No input validation
    return f"User {username} registered with password hash: {hashed_pw}"

# VULNERABILITY: Session management issues
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # VULNERABILITY: Timing attack possible
    stored_hash = hash_password('password123')
    user_hash = hash_password(password)

    if user_hash == stored_hash:
        # VULNERABILITY: Storing username in session without encryption
        session['username'] = username
        session['is_admin'] = False  # VULNERABILITY: Client-side authorization
        return "Login successful"
    else:
        return "Login failed"

# VULNERABILITY: Missing authentication check
@app.route('/admin/delete-user', methods=['POST'])
def delete_user():
    # VULNERABILITY: No authentication or authorization check!
    user_id = request.form['user_id']
    # Delete user logic here
    return f"User {user_id} deleted"

# VULNERABILITY: Insecure random number generation
def generate_token():
    import random
    # VULNERABILITY: Using non-cryptographic random
    return str(random.randint(1000, 9999))

# VULNERABILITY: Path traversal
@app.route('/download')
def download_file():
    filename = request.args.get('file')
    # VULNERABILITY: No path validation - path traversal attack possible
    with open(f'/var/www/uploads/{filename}', 'rb') as f:
        return f.read()

# VULNERABILITY: Command injection
@app.route('/ping')
def ping():
    host = request.args.get('host')
    # VULNERABILITY: Direct command execution with user input
    result = os.system(f'ping -c 1 {host}')
    return str(result)

if __name__ == '__main__':
    # VULNERABILITY: Debug mode enabled in production
    app.run(debug=True, host='0.0.0.0')
