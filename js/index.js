var workspace = Blockly.inject('blocklyDiv',
{toolbox: document.getElementById('toolbox')});

let result = [];


let var_x = 0, var_y = 0, var_z = 0;


Blockly.JavaScript['light_on'] = function(block) {
  let x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  let y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  let z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';

  
  result.push(to_json("light", x, y, z))
  return "";
};

Blockly.JavaScript['reset'] = function(block) {
  let plan = block.getFieldValue('plan');
  

  result.push({"operation":"reset", "plan" : plan});
  return "";
};

Blockly.JavaScript['add'] = function(block) {
  let plan = block.getFieldValue('plan');
  

  result.push({"operation":"add", "plan" : plan});
  return "";
};

Blockly.JavaScript['sub'] = function(block) {
  let plan = block.getFieldValue('plan');


  result.push({"operation":"remove", "plan" : plan});
  return "";
};

Blockly.JavaScript['repeat'] = function(block) {
  let times = 0;
  let vezes = block.getFieldValue('vezes');
  let size = result.length
  while(times < vezes){
    for(let i = 0; i<size; i++){
      let x = result[i];

          result.push(x);
        }

      
    
  times++;
}

  return "";
};

Blockly.JavaScript['var'] = function(block) {
  let operation = block.getFieldValue('operation'); 
  
  
  result.push(to_json('d' + to_operation(operation), var_x, var_y, var_z))
  return "";
};

Blockly.JavaScript['var_blink'] = function(block) {
  let operation = block.getFieldValue('operation'); 
  let time = block.getFieldValue('time'); 
  
  result.push(to_json('d' + to_operation(operation), var_x, var_y, var_z, time))
  return "";
};

Blockly.JavaScript['light_off'] = function(block) {
  let x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  let y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  let z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';


  result.push(to_json("fade", x, y, z))
  return "";
};

Blockly.JavaScript['blink_light'] = function(block) {
  let x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  let y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  let z = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  let time = block.getFieldValue('time');
  
  if(time == '') time = 0;

  result.push(to_json("blink", x, y, z, time))
  return "";
};


Blockly.JavaScript['sleep'] = function(block) {
  let time = block.getFieldValue('time');
  
  if(time == '') time = 0;
 

  result.push(to_json("sleep", null, null, null, time))
  return "";
};


function addOrSub(operation, plan){
  console.log(result)
  if(operation == 'sub'){
    if(plan == 'x') var_x -= (var_x == 0) ? 0 : 1
    else if(plan == 'y') var_y -= (var_y == 0) ? 0 : 1
    else if(plan == 'z') var_z -= (var_z == 0) ? 0 : 1
  }
  else if(operation == 'add'){
    if(plan == 'x') var_x += (var_x == 2) ? 0 : 1
    else if(plan == 'y') var_y += (var_y == 2) ? 0 : 1
    else if(plan == 'z') var_z += (var_z == 2) ? 0 : 1
  }
}

function execute(){
  result = [];
  let code = Blockly.JavaScript.workspaceToCode(workspace);
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
  
  interpret(result)

  console.log(result);
  send(result)
}
function interpret(result){
  for(let i = 0; i<result.length; i++){
      result[i] = JSON.parse(JSON.stringify(result[i]));
      let x = result[i];
      if(x.operation == 'add'){
        addOrSub('add', x.plan)
        result.splice(i--, 1);
      }

    else if (x.operation == 'sub'){
        addOrSub('sub', x.plan)
        result.splice(i--, 1);
    }

    else 
      if(String(x.operation).charAt(0) == 'd'){
        result[i].coordinate.x = var_x;
        result[i].coordinate.y = var_y;
        result[i].coordinate.z = var_z;
        result[i].operation = result[i].operation.substr(1);
      }
    
    else
      if(x.operation == 'reset'){
        if(x.plan == 'x') var_x = 0
        else if (x.plan == 'y') var_y = 0
        else if (x.plan == 'z') var_z = 0
        result.splice(i--, 1);
      
      }
  }
}

function to_json(operation, x =0, y = 0, z = 0, time=0){
  let j = {}
  j.operation = operation
  if(operation != "sleep") j.coordinate = {x : x, y: y, z: z}

  if(operation == "blink" || operation == "dblink" || operation == "sleep")
    j.time = time
  
    return j;
}

function to_operation(operation){
  if(operation == "acender") return "light";
  if(operation == "apagar") return "fade";
  if(operation == "piscar") return "blink";
}

function send(command){
  console.log(JSON.stringify(command))
  $.ajax({
    url: 'http://127.0.0.1:7778/execute',
    data: JSON.stringify(command),
    contentType: 'application/json;charset=UTF-8',
  	type: 'POST'
    
  }); 
}
            
            