var workspace = Blockly.inject('blocklyDiv',
{toolbox: document.getElementById('toolbox')});

var result = [];

Blockly.JavaScript['light_on'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';

  //result.push("acender " + argument0 + "," + argument1 + "," + argument2);
  result.push(to_json("light", x, y, z))
  return "";
};

Blockly.JavaScript['light_off'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';

  //result.push(result += "acender " + argument0 + "," + argument1 + "," + argument2);
  result.push(to_json("fade", x, y, z))
  return "";
};

Blockly.JavaScript['blink_light'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var time = block.getFieldValue('time');
  //if(time == null)time = '0';

  //result.push(result += "acender " + argument0 + "," + argument1 + "," + argument2);
  result.push(to_json("blink", x, y, z, time))
  return "";
};


function execute(){
  result = [];
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
  console.log(result);

  send(result)
  //result.forEach((r) => send(r));

}

function to_json(operation, x, y, z, time=0){
  j = {}
  j.operation = operation
  j.coordinate = {x : x, y: y, z: z}

  if(operation == "blink")
    j.time = time
  
    return j;
}


function send(command){
  console.log(command)
  console.log(JSON.stringify(command))
  $.ajax({
    url: 'http://127.0.0.1:7778/execute',
    data: JSON.stringify(command),
    contentType: 'application/json;charset=UTF-8',
  	type: 'POST'
    
  }); 
}
            
            