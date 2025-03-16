from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
from dotenv import load_dotenv  # Import load_dotenv
import cv2
import easyocr
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize EasyOCR
reader = easyocr.Reader(['en'])

# Initialize LLM
groq_api_key = os.environ.get("GROQ_API_KEY")  # Get the API key from environment variables
if not groq_api_key:
    raise ValueError("GROQ_API_KEY not found in environment variables.")

llm = ChatGroq(temperature=0.8, model_name="llama-3.2-1b-preview", api_key=groq_api_key)

# Define the prompt template
prompt = PromptTemplate(
    template="""
    You are a knowledgeable doctor providing clear guidance on a patient's prescribed medicine.

    Medicine Details:
    {context}

    User Question: {question}
    """,
    input_variables=["question", "context"]
)

# Initialize LLMChain
chain = LLMChain(prompt=prompt, llm=llm)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        # Process the image and extract text
        extracted_text = extract_text_from_image(filepath)

        # Return the extracted text
        return jsonify({'message': 'File uploaded successfully', 'extracted_text': extracted_text}), 200

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    context = data.get('context', '')
    question = data.get('question', '')

    if not context or not question:
        return jsonify({'error': 'Context and question are required'}), 400

    # Get response from LLMChain
    try:
        result = chain.invoke({"question": question, "context": context})
        return jsonify({'response': result['text']}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def extract_text_from_image(image_path):
    # Extract text using EasyOCR
    results = reader.readtext(image_path, detail=0)
    return '\n'.join(results)

if __name__ == '__main__':
    app.run(debug=True)