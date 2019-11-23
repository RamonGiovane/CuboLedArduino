int colunas[] = {10, 9, 8, 7, 6, 5, 4, 3, 2};   
int linhas[] = {13, 12, 11};

int matriz[3][9];

int strSize = 5;
char str[5];
   
void setup(){
  for (int contador = 0; contador < 9; contador++){
      pinMode(colunas[contador], OUTPUT);
  }
  for (int contador = 0; contador < 3; contador++){
      pinMode(linhas[contador], OUTPUT);
  }

  //marca todos os leds como desligados
  for(int lin=0; lin<3; lin++){
    for(int col=1; col<9; col++){
      matriz[lin][col] = 0;
    }
  }
  
  Serial.begin(9600);
  
}
   
void loop(){
  
  //recebe um dado no formato acção;linha;coluna
  //ações: L -> adiciona, F -> remove
  //linha: valores-> 0, 1 ou 2
  //coluna: valores-> 0, 1, 2, 3, 4, 5, 6, 7 ou 8
  //exemplo: L;2;2 L;2;6  F;2;2 
  
  lerSerial();

  //percorre a matriz e acende os leds com valor = 1
  for(int lin=0; lin<3; lin++){
    for(int col=0; col<9; col++){
      if(matriz[lin][col] == 1){
        acendeLed(lin, col);
        apagaLed(lin, col);
      }
    }
  }
  
}

//lê o conteúdo da porta serial e encaminha para a ação correta
void lerSerial(){
  int tam = Serial.readBytes(str, strSize);
  if(tam > 0){
    
    //coloca o valor 1 para o led na matriz
    if(str[0] == 'L'){
      adicionaLed(str[2]-48,str[4]-48);
    }
    //coloca o valor 0 para o led na matriz
    if(str[0] == 'F'){
      removeLed(str[2]-48,str[4]-48);
    }
  }

}


void acendeLed(int linha, int coluna){
    digitalWrite(colunas[coluna], HIGH);
    digitalWrite(linhas[linha], HIGH);
}

void apagaLed(int linha, int coluna){
    digitalWrite(colunas[coluna], LOW);
    digitalWrite(linhas[linha], LOW);
}

void adicionaLed(int linha, int coluna){
  matriz[linha][coluna] = 1;
  /*
  Serial.print("Adicionou ");
  Serial.print(linha);
  Serial.print(" ");
  Serial.print(coluna);
  Serial.print(" = ");
  Serial.print(matriz[linha][coluna]);
  Serial.print("\n");
  */
}

void removeLed(int linha, int coluna){
  matriz[linha][coluna] = 0; 
  /*
  Serial.print("Removeu ");
  Serial.print(linha);
  Serial.print(" ");
  Serial.print(coluna);
  Serial.print(" = ");
  Serial.print(matriz[linha][coluna]);
  Serial.print("\n");
  */
}
