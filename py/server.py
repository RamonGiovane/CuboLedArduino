import json
import os
from flask import Flask
from flask import Response
from flask import request

import time

import serial  # é necessário instalar o pyserial

driver = '/dev/ttyACM1'
band = 9600



app = Flask(__name__)

ser = None

@app.route('/execute', methods=['POST'])
def listener():
    data = request.get_json()
    
    ser = serial.Serial(driver, band)
    for command in data:
        execute(command)
    ser.close()



#Envia um comando recebido do blockly que pode ser 'blink' (piscar), 'light' (acender) ou 'fade' (apagar)
#para o Arduino que recebe comandos para acender 'L;x;y' ou apagar 'F;x;y'
#Quando solicitado piscar, a API utiliza o atributo time para acender, esperar os segundos definidos para o usuário, e etnão apagar
def execute(command):
    x = command.x + (3 * command.z)
    y = command.y

    if command.operation == 'blink':
        timer = command.time
    
    if command.operation == 'light' or command.operation == 'blink':
       send("L;%d;%d" % (x, y)) 
    
    if command.operation == 'blink':
       time.sleep(timer)

    if command.operation == 'fade' or command.operation == 'blink':
       send("F;%d;%d" % (x, y)) 
    

def send(command):
    ser.write(bytes(command, encoding="ascii"))

if __name__ == "__main__":
    app.run(port=7777, debug=True)

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
