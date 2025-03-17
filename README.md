# PharmaBot

PharmaBot is a powerful web application designed to assist users in extracting and interpreting text from images of prescriptions or medicine details. Using Optical Character Recognition (OCR) powered by EasyOCR and a language model for answering questions, PharmaBot simplifies the process of understanding medical information.

## Features

- **Image Upload**: Upload images of prescriptions or medicine details.
- **Text Extraction**: Extract text from images using EasyOCR.
- **Question Answering**: Ask questions about the extracted text and receive responses from a language model.
- **User-Friendly Interface**: Simple and intuitive web interface for seamless interaction.

## Requirements

- **Python 3.7+**: Required for running the Flask backend.
- **Node.js and npm**: Required for running the frontend development server.

---

## Installation

### 1. Clone the Repository

Clone the PharmaBot repository to your local machine:

```bash
git clone https://github.com/kungfupanda420/pharmabot.git
cd pharmabot
```

### 2. Set Up a Python Virtual Environment

Create and activate a virtual environment to manage dependencies:

```bash
python -m venv myenv
source myenv/bin/activate  # On Windows, use `myenv\Scripts\activate`
```

### 3. Install Python Dependencies

Install the required Python libraries using `pip`:

```bash
pip install flask flask-cors python-dotenv opencv-python easyocr langchain-groq langchain
```

### 4. Set Up the Frontend

Navigate to the frontend directory and install the required npm packages:

```bash
cd frontend  # Assuming the frontend code is in a separate directory
npm install
```

### 5. Configure Environment Variables

Create a `.env` file in the root directory of the project and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key
```

Replace `your_groq_api_key` with your actual Groq API key.

---

## Running the Application

### 1. Start the Flask Backend

Activate the virtual environment and start the Flask backend:

```bash
source myenv/bin/activate  # On Windows, use `myenv\Scripts\activate`
python app.py
```

The backend will start running at `http://localhost:5000`.

### 2. Start the Frontend Development Server

Navigate to the frontend directory and start the Vite development server:

```bash
cd frontend  # If not already in the frontend directory
npm run dev
```

The frontend will start running at `http://localhost:3000`.

---

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Upload an image of a prescription or medicine details.
3. The application will extract text from the image using EasyOCR.
4. Ask questions about the extracted text, and the language model will provide answers.

---

## Contributing

Contributions are welcome! If you'd like to contribute to PharmaBot, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request to the main repository.

---

## License

PharmaBot is open-source software licensed under the [MIT License](LICENSE).

---

## Support

If you encounter any issues or have questions, feel free to open an issue on the [GitHub repository](https://github.com/kungfupanda420/pharmabot/issues).

---

Enjoy using PharmaBot! 🚀
