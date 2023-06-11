from flask import Flask, request, jsonify


app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route('/api/endpoint', methods=['POST'])
def my_endpoint():
    data = request.get_json()  # Ottieni i dati inviati con la richiesta POST

    # Elabora i dati come desiderato
    # ...
    print(f"Richiesta: {data}")

    # Restituisci una risposta JSON
    response = {'message': 'Success', 'data': data}
    return jsonify(response)


if __name__ == '__main__':
    app.run()
