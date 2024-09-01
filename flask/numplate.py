from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

info =[]

@app.route('/addinformation', methods=['post'])
def addData():
    req = request.get_json()

    name = req.get('name')
    mobile = req.get('mobile')
    email = req.get('email')
    region = req.get('region')
    numberplate = req.get('numberplate')

    if any(user['email'] == email or user['mobile'] == mobile or user['numberplate'] == numberplate for user in info):
        return jsonify({'success': False, 'message': 'user already Exists'}), 400

    info.append({'name': name, 'mobile': mobile, 'email': email, 'region': region, 'numberplate': numberplate})
    return jsonify({'success': True, 'message': 'User added Successfully'}), 201

@app.route('/info/<string:input_value>', methods=['GET'])
def get_info(input_value):
    for item in info:
        if input_value in item['mobile']:
            return jsonify(item), 200
        elif input_value in item['email']:
            return jsonify(item), 200
        elif input_value.lower() in item['numberplate'].lower():
            return jsonify(item), 200
    return jsonify({'error': True}), 400



@app.route('/alldata', methods=['get'])
def getAllData():
    return jsonify(info)
    

@app.route('/adduser/<string:numberplate>', methods=['put'])
def update_info(numberplate):
    data = request.get_json()
    for user in info:
        if user['numberplate'].lower() == numberplate.lower():
            user['mobile'] = data.get('mobile', user['mobile'])
            user['email'] = data.get('email', user['email'])
            return jsonify({"Message": "User updated successfully"})
    return jsonify({"error": "User not found"}), 404


@app.route('/removeuser/<string:mobile>', methods=['delete'])
def remove_user(mobile):
    for user in info:
        if user['mobile'] == mobile:
            info.remove(user)
            return jsonify({'Message:': 'product is removed'})
    
    

if __name__=='__main__':
    app.run(debug = True)
