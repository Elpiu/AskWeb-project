import time

from flask import Flask, request, jsonify


app = Flask(__name__)

# Endpoint prima iterazione, viene inviato il contenuto della pagina
@app.route('/api/v1/post_page', methods=['POST'])
def post_page():
    try:
        data = request.get_json()
        url = data.get('url')
        content = data.get('content')

        print(f"Url is {url}")
        print(f"content is {content}")

        return jsonify({'result': 'ok'})

    except KeyError as e:
        print(e)
        return jsonify({'result': 'error'})

# api in cui mi passi la domanda e ti ritorno la risposta
@app.route('/api/v1/post_query', methods=['POST'])
def post_query():
    try:
        data = request.get_json()
        id = data.get('id')
        content = data.get('content')
        time = data.get('time')
        sender = data.get('sender')
        url = data.get('url')
        print(f"content is {content}")
        return jsonify({'result': 'ciao tutto bene?'})

    except KeyError as e:
        print(e)
        return jsonify({'result': 'error'})



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
