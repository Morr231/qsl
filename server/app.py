from flask import Flask, render_template, request
from flask_cors import CORS
import os
from main import script

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def upload_file():

    print( request.files['file'].filename)
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        print(uploaded_file.filename)
        uploaded_file.save( "./videos/class/" + uploaded_file.filename + ".mp4")
        script()
    return {"msg":"What am I DOING"},200




if __name__ == "__main__":
    app.run(debug=True)

