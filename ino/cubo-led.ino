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
  
  Serial.begin(4800);
  
}
   
void loop(){
  
  //recebe um dado no formato acção;linha;coluna
  //ações: l -> adiciona, f->remove
  //linha: valores-> 0, 1 ou 2
  //coluna: valores-> 0, 1, 2, 3, 4, 5, 6, 7 ou 8
  //exemplo: l;2;2 l;2;6  f;2;2 
  lerSerial();
  
  //acende os leds ativos
  acendeLedsAtivos();
  
  
}


//lê o conteúdo da porta serial e encaminha para a ação correta
void lerSerial(){
  if(Serial.available()){
    int tam = Serial.readBytes(str, strSize);
    if(tam > 0){
	  Serial.println(str);
      //adiciona o valor 1 para o led na matriz
      if(str[0] == 'L'){
        matriz[str[2]-48][str[4]-48] = 1;
      }
      //adiciona o valor 0 para o led na matriz
      if(str[0] == 'F'){
        matriz[str[2]-48][str[4]-48] = 0;
      }
    }
  }

}

//percorre a matriz e acende os leds com valor = 1
void acendeLedsAtivos(){
  for(int lin=0; lin<3; lin++){
    digitalWrite(linhas[lin], HIGH);
    for(int col=0; col<9; col++){
      if(matriz[lin][col] == 1){
        digitalWrite(colunas[col], HIGH);
        digitalWrite(colunas[col], LOW);
      }
    }
    digitalWrite(linhas[lin], LOW);
  }
}

