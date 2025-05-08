# app.py

from flask import Flask

def create_app():
    app = Flask(__name__)  # Create the app

    # Any configuration you want to add here
    app.config['SECRET_KEY'] = 'your-secret-key'

    # Routes
    @app.route('/')
    def home():
        return "Hello, World!"  # You can replace this with your actual home route

    return app
