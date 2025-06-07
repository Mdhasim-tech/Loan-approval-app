from flask import Flask
from flask_cors import CORS
from predict import pred_bp  # ✅ Assuming your blueprint is in predict.py

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes by default
@app.route('/')
def home():
    return "Hello, world!"

# ✅ Register the prediction blueprint with a URL prefix
app.register_blueprint(pred_bp, url_prefix='/predict')

if __name__ == "__main__":
    app.run(debug=True)
