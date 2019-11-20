
import serial  # é necessário instalar o pyserial

driver = '/dev/ttyACM1'
band = 9600

#Envia várias mensagens 'hello' para a porta serial 'driver'
def hello():
    ser = serial.Serial(driver, band)
    print(ser.name)

    for i in range(100):
        ser.write(b'hello')
    ser.close()

if __name__ == "__main__":
    hello()