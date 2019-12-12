import json
import os
from flask import Flask
from flask import Response
from flask import request
from flask_cors import CORS, cross_origin
import sys
import time

import serial  # é necessário instalar o pyserial

# caminho do driver arduino por exemplo '/dev/ttyACM0'
driver = ''  #deixar em branco aqui. será recebido pelo console
band = 9600



app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
ser = None

@app.route('/execute', methods=['POST'])
@cross_origin()
def listener():

    data = json.loads(request.data)
    ser = serial.Serial(driver, band)

    print("SIZE OF data " + str(len(data)) )
    for command in data:
      execute(command)
    
    ser.close()
    return "Sucesso."

@app.after_request
def add_headers(response):
    
    response.headers.remove('Access-Control-Allow-Origin')
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    
    return response



#Envia um comando recebido do blockly que pode ser 'blink' (piscar), 'light' (acender) ou 'fade' (apagar)
#para o Arduino que recebe comandos para acender 'L;x;y' ou apagar 'F;x;y'
#Quando solicitado piscar, a API utiliza o atributo time para acender, esperar os segundos definidos para o usuário, e etnão apagar
def execute(command):
    print("COMMAND: " + str(command))
    x =  int(command['coordinate']['x']) + (3 * int(command['coordinate']['z']))
    y = int(command['coordinate']['x'])
    operation = command['operation']

    if operation == 'blink':
        timer = int(command['time'])
    
    if operation == 'light' or operation == 'blink':
       send("L;%d;%d" % (x, y)) 
    
    if operation == 'blink':
       time.sleep(timer)

    if operation == 'fade' or operation == 'blink':
       send("F;%d;%d" % (x, y)) 
    

def send(command):
    print(command)
    ser.write(bytes(command, encoding="ascii"))
    
def main():
    if(len(sys.argv) != 2):
        print("Parâmetro inválido.\nO parâmetro deve ser o nome da porta serial usada pelo Arduino.")
        return
    driver = sys.argv[1] 
    app.run(port=7778, debug=True)

if __name__ == "__main__":
    main()

####### Exemplo de JSON enviado pelo blockly e recebido pelo JSON #######
# [
#     { 
#       operation: "blink",
#       coordinate: {x: 1, y: 2, z: 0},
#       time: 1
#      },
#     { 
#       operation: "light",
#       coordinate: {x: 1, y: 2, z: 0},
#      },
#     { 
#       operation: "fade",
#       coordinate: {x: 1, y: 2, z: 0},
#      }
#
# ]
