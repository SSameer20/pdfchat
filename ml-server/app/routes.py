from flask import Blueprint, request, jsonify, render_template
from app.model.predict import make_prediction

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def Home():
    return render_template("status.html")



@main.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    prediction = make_prediction(data)
    return jsonify(prediction)



@main.route('/<path:invalid_path>', methods=['GET', 'POST'])
def not_found(invalid_path):
    return render_template('NotFound.html'), 404
