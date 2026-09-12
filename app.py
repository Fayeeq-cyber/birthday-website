from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/surprise")
def surprise():
    return render_template("surprise.html")
