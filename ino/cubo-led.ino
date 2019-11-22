int colunas[] = {10, 9, 8, 7, 6, 5, 4, 3, 2};   
int linhas[] = {13, 12, 11};
int tam = 5;
   
void setup(){
  for (int contador = 0; contador < 9; contador++){
      pinMode(colunas[contador], OUTPUT);
  }
  for (int contador = 0; contador < 3; contador++){
      pinMode(linhas[contador], OUTPUT);
  }
}
   
void loop(){
  printReceivedData();
  
}

void acenderLed(int linha, int coluna){
    digitalWrite(colunas[coluna-1], HIGH);
    digitalWrite(linhas[linha-1], HIGH);
}

void apagarLed(int linha, int coluna){
    digitalWrite(colunas[coluna-1], LOW);
    digitalWrite(linhas[linha-1], LOW);
}

String printReceivedData(){
    char str[tam]; /// L;X;Y
    
    int bytes = Serial.readBytes(str, tam);
 
    if(bytes > 0)
            Serial.print(str);
            Serial.print('\n');
    } 
}