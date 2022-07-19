from flask import *
import os

app = Flask(__name__)
os.system("title Calculator Server")

@app.route("/")
def calculator():
    return render_template("calculator.html")

app.run(host="0.0.0.0", port=8080)