from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/users/*": {"origins": "http://localhost:5173"}})

users = []
user_id_counter = 1

# Crear usuario
@app.route("/users", methods=["POST"])
def create_user():
    global user_id_counter
    data = request.get_json()
    new_user = {
        "id": user_id_counter,
        "name": data["name"],
        "email": data["email"],
        "age": data["age"],
        "phone": data["phone"]
    }
    users.append(new_user)
    user_id_counter += 1
    return jsonify({"message": "Usuario creado"}), 201

# Leer todos
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)

# Leer uno
@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    user = next((user for user in users if user["id"] == id), None)
    if user is None:
        return jsonify({"message": "Usuario no encontrado"}), 404
    return jsonify(user)

# Actualizar
@app.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    user = next((user for user in users if user["id"] == id), None)
    if user is None:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    data = request.get_json()
    user["name"] = data.get("name", user["name"])
    user["email"] = data.get("email", user["email"])
    user["age"] = data.get("age", user["age"])
    user["phone"] = data.get("phone", user["phone"])

    return jsonify({"message": "Usuario actualizado"})

# Eliminar
@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = next((user for user in users if user["id"] == id), None)
    if user is None:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    users.remove(user)
    return jsonify({"message": "Usuario eliminado"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)