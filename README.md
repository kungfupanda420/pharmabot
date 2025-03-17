# PharmaBot

PharmaBot is a web application that allows users to upload images of prescriptions or medicine details, extract text from the images using OCR (Optical Character Recognition), and ask questions about the extracted text. The application uses a Flask backend with EasyOCR for text extraction and a language model for answering questions.

## Features

- Upload images of prescriptions or medicine details
- Extract text from images using EasyOCR
- Ask questions about the extracted text
- Get responses from a language model

## Requirements

- Python 3.7+
- Node.js and npm

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kungfupanda420/pharmabot.git
cd pharmabot


```bash
python -m venv myenv
source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
pip install flask flask-cors python-dotenv opencv-python easyocr langchain-groq langchain


## Frontend
```bash
npm install


create a .env file and change this to you api key
GROQ_API_KEY=your_groq_api_key


Running the Application
Start the Flask backend:
```bash
source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
python [app.py](http://_vscodecontentref_/1)
```bash
Start the Vite development server:
npm run dev
