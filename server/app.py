from flask import Flask, render_template, request
from flask_cors import CORS
import os
from script import script

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def upload_file():
    res = ""
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        print(uploaded_file.filename)
        uploaded_file.save( "./videos/class/" + uploaded_file.filename + ".mp4")
        res = script()
    return res,200




if __name__ == "__main__":
    app.run(debug=True)

