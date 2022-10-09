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
           SELECT * FROM players ORDER BY first_name ASC
            '''

        players = DB.all(qry)

        return jsonify(players)
    except Exception as error:
        return {'error': str(error)}, 400


@ app.route('/players/<int:player_id>', methods=['GET'])
def player(player_id):
    try:
        print("trying to connect")
        qry = '''
           SELECT * FROM players WHERE id = :player_id ORDER BY first_name ASC
            '''

        players = DB.one(qry, {'player_id': player_id})
        qry2 = '''
            SELECT MIN(date) FROM presence WHERE player_id = :player_id ORDER BY date ASC
        '''
        qry3 = '''
            SELECT MAX(date) FROM presence WHERE player_id = :player_id ORDER BY date ASC
        '''
        first_presence = DB.one(qry2, {'player_id': player_id})
        last_presence = DB.one(qry3, {'player_id': player_id})
        total_presence = DB.one('''SELECT COUNT(*) FROM presence WHERE player_id = :player_id''', {'player_id': player_id})
        print(last_presence, "asdasdasdasdas")
        players["first_presence"] = first_presence["MIN(date)"]
        players["last_presence"] = last_presence["MAX(date)"]
        players["total_presence"] = total_presence["COUNT(*)"]
        print(players)
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
        id = DB.insert(qry, args)

        qry2 = '''
            INSERT INTO 
                `presence` 
                    (`player_id`, `date`, `first_time`)
                VALUES
                    (:player_id, :date, 1)
            '''
        today = date.today()
        d1 = today.strftime("%Y/%m/%d")
        DB.insert(qry2, {'player_id': id, 'date': d1})

        return {'message': f'Successfully added {args["first_name"]} {args["last_name"]}'}, 201
    except Exception as error:
        return {'error': str(error)}, 400


@ app.route('/presence', methods=['POST'])
def presencePost():
    try:
        args = request.get_json()
        today = date.today()
        d1 = today.strftime("%Y/%m/%d")
        args["date"] = d1
        print(args)
        qry = '''
            
            INSERT INTO 
                `presence` 
                    (`player_id`, `date`, `first_time`)
                VALUES
                    (:player_id, :date, :first_time)
            '''
        qry2 = '''
            
            SELECT * FROM presence WHERE player_id = :player_id AND date = :date
            '''
        res = DB.one(
            qry2, {'player_id': args["player_id"], 'date': args["date"]})
        print(res)
        if res:
            return {'message': f'Already added'}, 400

        DB.insert(qry, args)

        return {'message': f'Successfully logged in'}, 201
    except Exception as error:
        return {'error': str(error)}, 400
@ app.route('/overzicht', methods=['GET'])
def overzicht():
    try:
        qry = '''
          SELECT date FROM presence group by date order by date desc
            '''
            
        dates = DB.all(qry)
        print(dates)
        returnObject = []

        for date in dates:
            qry2 = '''
                SELECT COUNT(*) FROM presence WHERE date = :date
            '''
            print(date)
            res = DB.one(qry2, {'date': date["date"]})
            print(res)
            returnObject.append({"date": date["date"], "count": res["COUNT(*)"]})
        return jsonify(returnObject)
    except Exception as error:
        return {'error': str(error)}, 400
@ app.route('/overzicht/<string:date>', methods=['GET'])
def overzichtDetail(date):
    try:
        date = date.replace("-", "/")
        print(date)
        qry = '''
            SELECT * FROM presence LEFT JOIN players on players.id = presence.player_id WHERE date = :date
        '''
        res = DB.all(qry, {'date': date})

        return jsonify(res)
    except Exception as error:
        return {'error': str(error)}, 400
        
# Start app
if __name__ == '__main__':
    DB.create()
    app.run(debug=True)
