import json
import os
from flask import Flask
from flask import Response
from flask import request
from flask_cors import CORS, cross_origin
import sys
import time
from threading import Thread

import serial  # é necessário instalar o pyserial

# caminho do driver arduino por exemplo '/dev/ttyACM0'
driver = '/dev/ttyACM0'  
band = 9600


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
ser = None

@app.route('/execute', methods=['POST'])
@cross_origin()
def listener():

    data = json.loads(request.data)
    ser = serial.Serial(driver, band)

    print("SIZE OF data " + str(len(data)))
    time.sleep(1)
    for command in data:
      execute(ser,command)
    
    
    return "Sucesso."

@app.after_request
def add_headers(response):
    
    response.headers.remove('Access-Control-Allow-Origin')
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    
    return response



def blinkThread(ser, y, x, timer):
    print("THREAD")
    send(ser, "L;%d;%d" % (y, x)) 
    time.sleep(timer)
    send(ser, "F;%d;%d" % (y, x)) 
    print("Saiu")

#Envia um comando recebido do blockly que pode ser 'blink' (piscar), 'light' (acender) ou 'fade' (apagar)
#para o Arduino que recebe comandos para acender 'L;x;y' ou apagar 'F;x;y'
#Quando solicitado piscar, a API utiliza o atributo time para acender, esperar os segundos definidos para o usuário, e etnão apagar
def execute(ser, command):
    print("COMMAND: " + str(command))

    operation = command['operation']
    

    if operation == 'sleep':
        time.sleep(float(command['time']))
        return

    
    x = int(command['coordinate']['x']) + (3 * int(command['coordinate']['z']))
    y = int(command['coordinate']['y'])


    if operation == 'blink':
        t = Thread(target=blinkThread, args=(ser, y, x, float(command['time'])))
        t.start()
    
    elif operation == 'light':
       send(ser, "L;%d;%d" % (y, x)) 

    elif operation == 'fade' or operation == 'blink':
       send(ser, "F;%d;%d" % (y, x)) 
    

def send(ser, command):
    print("comandooo " +  str(command))
    ser.write(bytes(command, encoding="ascii"))
    
def main():
    app.run(port=7778, debug=True)
    
    if ser != None:
        ser.close()
if __name__ == "__main__":
    main()

####### Exemplo de JSON enviado pelo blockly e recebido pela API #######
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
#     {
#       operation: "sleep",
#       time: 1
#     }
# ]
