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
  //send(result)

}

function to_json(operation, x, y, z, time=0){
  j = new Object()
  j.operation = operation
  j.coordinate = coordinate_json(x, y, z);

  if(operation == "blink")
    j.time = time
  
    return JSON.stringify(j);
}

function coordinate_json(x, y, z){
  return JSON.stringify({x : x, y: y, z: z})

}


 function send(command){
  let server_url = ""

  fetch(server_url,{credentials:'same-origin',mode:'same-origin',
            method:"post",body:JSON.stringify(command)})
                .then(resp => {
                  if(resp.status==200){
                     return resp.json()
                  }else{
                      console.log("Status: "+resp.status);
                      return Promise.reject("server")
                  }
                
                })
              }
            
            