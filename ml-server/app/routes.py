from flask import Blueprint, request, jsonify, render_template
from PyPDF2 import PdfReader

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def home():
    return render_template("status.html")


@main.route('/pdf/extract', methods=['POST'])
def extract_text():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No PDF file provided'}), 400

    pdf_file = request.files['pdf']

    if pdf_file.filename == '':
        return jsonify({'error': 'No PDF file selected'}), 400

    if not pdf_file.filename.lower().endswith('.pdf'):
        return jsonify({'error': 'Only PDF files are allowed'}), 400

    try:
        pdf_reader = PdfReader(pdf_file)
        text = ""

        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        if not text.strip():
            return jsonify({'error': 'No text could be extracted from the PDF'}), 400

        return jsonify({'extracted_text': text}), 200

    except Exception as e:
        return jsonify({'error': f'Error processing PDF: {str(e)}'}), 500



@main.route('/<path:invalid_path>', methods=['GET', 'POST'])
def not_found(invalid_path):
    return render_template('NotFound.html'), 404
