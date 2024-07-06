from flask import Flask,jsonify,json,request;
from model import LeaguePedia as lp

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/api/grid/teams', ['GET'])
def getTeams():
    teams = request.json
    response = {
        'teams' : teams
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True, port=5050, host='0.0.0.0')
