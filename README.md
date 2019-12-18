# CuboLedArduino
<i>Um cubo 3x3x3 de leds feito com Arduino que pode ser controlado por uma página WEB usando Google Blockly</i>

- <a href="https://ramongiovane.github.io/CuboLedArduino/">CuboLed Page</a>
- <a href="https://app.swaggerhub.com/apis-docs/hugo-bianchetti/CuboLed/1.0.0">Swagger API Doc</a>
## Sobre
<p>Projeto desenvolvido no curso de <b>Tecnologia em Sistemas para Internet</b> pertencente ao <b>IF Sudeste MG Barbacena</b> 
na disciplina  de <b>Web Services</b> ministrada pelo professor <a href="https://github.com/rafjaa">Rafael Alencar</a> em 2019.
<a href="https://ramongiovane.github.io/CuboLedArduino/">Mais detalhes.</a></p> 
<p align="center">
  <img src="https://raw.githubusercontent.com/RamonGiovane/CuboLedArduino/gh-pages/img/portfolio/fullsize/tela.png" width="600"/>
</p>

## Detalhes do Projeto
A arquitetura do projeto funciona de forma em que as aplicações de mais alto nível realizam operações mais complexas, enquanto as mais  baixas, mais simples.
  - Uma página WEB controla o cubo com blocos como acender, apagar, piscar um determinada coordenada (X, Y, Z) ou através de variáveis,       além de loops e operações de somas e subtrações. 
  - Uma API Restful em Python usando Flask recebe comandos do Blockly via HTTP POST, com operações que pode ser: esperar, acender, apagar,     piscar.
  - O arduino recebe comandos via porta serial e pode, apagar ou acender leds nas coordenadas (previamente convertidas pela API) X e Y.
  - O cubo foi construído utilizando o 27 leds azuis, uma protoboard, três transistores, resistores e fios de um kit Arduino Uno.
    
  <p align="center">
    <img src="https://raw.githubusercontent.com/RamonGiovane/CuboLedArduino/master/cuboled.PNG" width="600"/>
  </p>
    
## Equipe  
 
 <ul>
  <li><a href=https://github.com/RamonGiovane>Ramon Giovane Dias Rosa</a></li>
  <li><a href=https://github.com/leuribeiru>Leonardo Ribeiro</a></li>  
  <li><a href=https://github.com/hugo-bianchetti>Hugo Leonardo Bianchetti</a></li>  
  <li><a href=https://github.com/paulocirinojr>Paulo Cirino Junio</a></li>
  <li><a href=https://github.com/carlosrjr>Carlos Roberto Junior</a></li>
</ul>
