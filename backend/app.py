from flask import *
import psycopg2
from urllib.parse import urlparse
from flask_cors import CORS, cross_origin
from json import load

#Database connectivity

#Establish connection with postgres db.

result = urlparse("postgres://flask_i22d_user:XLFsNLAqUGI8CUAzUqrRAfjQ1dEojtEU@dpg-cg5csdfdvk4pls4d5e30-a.singapore-postgres.render.com/flask_i22d")
username = result.username
password = result.password
database = result.path[1:]
hostname = result.hostname
port = result.port
conn = psycopg2.connect(database=database,
                        host=hostname,
                        user=username,
                        password=password,
                        port=port)

conn.autocommit = True

cursor = conn.cursor()


################  Tasks relation  ##########################
def createBlogsRelation():
    cursor.execute("create table Userblogs(id serial PRIMARY KEY, title varchar(20) unique not null, author varchar(20) unique not null, body varchar(200) unique not null, created_at timestamptz NOT NULL DEFAULT now(), userID int, FOREIGN KEY (userID) REFERENCES users(id))")

################  User Relation  ###########################
def createUserRelation():
    cursor.execute("create table users(id serial PRIMARY KEY, username varchar(20) unique not null, password varchar(20) not null)")


####################  Tasks Related methods  ####################


def fetchData():
    cursor.execute("select * from Userblogs")
    data = []
    # print(cursor.fetchall())
    for item in cursor.fetchall():
        json = {"id":item[0], "title":item[1], "author":item[2], "body": item[3], "created_at": item[4]}
        data.append(json)
    return {"blogs": data}

def insertDB(title, author, body):
    cursor.execute("""INSERT INTO Userblogs (title, author, body) VALUES (%s,%s,%s)""", (title, author, body))
    conn.commit()
    return fetchData()

def updateDB(title, author, body, id):
    cursor.execute("""UPDATE Userblogs SET title = %s, author=%s, body=%s WHERE id = %s""", (title, author, body, id))
    conn.commit()
    return fetchData()

def deleteData(id):
    cursor.execute(f'DELETE FROM Userblogs WHERE ID = {id}')
    conn.commit()
    return fetchData()

################  User related methods  ##############


def fetchUserData():
    cursor.execute("select * from users")
    data = []
    for item in cursor.fetchall():
        json = {"id":item[0], "username":item[1], "password":item[2], }
        data.append(json)
    return {"data": data}

def insertUser(username, password):
    cursor.execute("""INSERT INTO users (username, password) VALUES (%s,%s)""", (username, password))
    conn.commit()
    return fetchUserData()

def updateUser(password, id):
    cursor.execute("""UPDATE users SET password = %s WHERE id = %s""", (password, id))
    conn.commit()
    return fetchUserData()


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

if __name__ == '__main__':
    app.run(debug=False, port=5000)

@app.route('/api/dashboard', methods=["GET", "POST", "PUT", "DELETE"])
@cross_origin()
def getAllPosts():
    if (request.method=="POST"):
        print(request.json)
        try:
            return insertDB(request.json['title'], request.json['author'], request.json['body'])
        except Exception as e :
            print(e)
            return jsonify({"error":"Cannot post the data, check params, check log"})
            
    if (request.method=="PUT"):
        try:
            return updateDB(request.json['title'], request.json['author'], request.json['body'], request.json['id'])
        except Exception as e :
            print(e)
            return jsonify({"error":"Cannot update the given element, check params, check logs"})
        
    if (request.method=="GET"):
        try:
            return jsonify(fetchData())
        except Exception as e :
            print(e)
            return jsonify({"error":"cannot get elements, check server, check logs"})

    if (request.method=="DELETE"):
        try:
            return deleteData(request.json['id'])
        except Exception as e :
            print(e)
            return jsonify({"error":"Cannot delete the given element, check params, check logs"})

@app.route('/api/dashboard/users', methods=["GET", "POST", "PUT"])
@cross_origin()
def getAllUsers():
    try:
        if (request.method=="POST"):
            return insertUser(request.json['username'], request.json['password'])
    except Exception as e :
            print(e)
            return jsonify({"error":"Cannot post the given element, check params, check logs"})

    if (request.method=="PUT"):
        try:
            return updateUser(request.json['password'], request.json['id'])
        except Exception as e :
            print(e)
            return jsonify({"error":"Cannot update the given element, check params, check logs"})

    if (request.method=="GET"):
        try:
            return jsonify(fetchUserData())
        except Exception as e :
            print(e)
            return jsonify({"error":"Cannot get the data, check server, check logs"})