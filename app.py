from dis import dis
from urllib import response
from flask import Flask, redirect, make_response, request, jsonify, render_template, Response, abort, url_for
import json
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta, date

from db import DB

import sqlite3
import base64
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request)
# Create a new Flask application

app = Flask(__name__)
app.debug = True


def db_connection():
    conn = None
    try:
        conn = sqlite3.connect("pickups.db")
    except sqlite3.error as e:
        print(e)
    return conn


# Enable cors on the server
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://img.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

# Register the JWT manager
app.config['JWT_SECRET_KEY'] = 'qominiqueisshitinoverwatch'
jwt = JWTManager(app)

# ============================ Routes ============================

# JWT routes



@ app.route('/players', methods=['GET'])
def players():
    try:

        qry = '''
           SELECT * FROM players
            '''

        players = DB.all(qry)
     

        
        return jsonify(players)
    except Exception as error:
        return {'error': str(error)}, 400
@ app.route('/presence', methods=['GET'])
def presence():
    try:

        qry = '''
           SELECT player_id, first_name, date, address from presence LEFT JOIN players on players.id = presence.player_id
            '''

        players = DB.all(qry)
     

        
        return jsonify(players)
    except Exception as error:
        return {'error': str(error)}, 400

@ app.route('/players', methods=['POST'])
def playersPost():
    try:
        args = request.get_json()
        qry = '''
            
            INSERT INTO 
                `players` 
                    (`first_name`, `last_name`, `address`, `phone_number`)
                VALUES
                    (:first_name, :last_name, :address, :phone_number)
            '''
        DB.insert(qry, args)
     

        
        return {'message': f'Successfully added {args["first_name"]} {args["last_name"]}'}, 201
    except Exception as error:
        return {'error': str(error)}, 400
@ app.route('/presence', methods=['POST'])
def presencePost():
    try:
        args = request.get_json()
        today = date.today()
        d1 = today.strftime("%d/%m/%Y")
        args["date"] = d1
        print(args)
        qry = '''
            
            INSERT INTO 
                `presence` 
                    (`player_id`, `date`, `first_time`)
                VALUES
                    (:player_id, :date, :first_time)
            '''
        DB.insert(qry, args)
     

        
        return {'message': f'Successfully logged in {args["player_id"]}'}, 201
    except Exception as error:
        return {'error': str(error)}, 400



# Start app
if __name__ == '__main__':
    DB.create()
    app.run(debug=True)

