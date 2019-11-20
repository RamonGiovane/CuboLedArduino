int tam = 5;

//Setup
void setup(){
  Serial.begin(9600);
}

//Loop
void loop(){
 
    
    printReceivedData()
 
}

void printReceivedData(){
    char str[tam];
    int bytes = Serial.readBytes(str, tam);
 
    if(bytes > 0){

        for(int i=0;i<tam;i++)
            Serial.print(str[i]);
    
        Serial.print('\n');
    } 
}