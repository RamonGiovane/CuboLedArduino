var workspace = Blockly.inject('blocklyDiv',
{toolbox: document.getElementById('toolbox')});

var result = [];

Blockly.JavaScript['light_on'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var argument2 = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';

  result.push("acender " + argument0 + "," + argument1 + "," + argument2);

  return "";
};

Blockly.JavaScript['light_off'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';
  var argument2 = Blockly.JavaScript.valueToCode(block, 'Z', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '0';

  result.push(result += "acender " + argument0 + "," + argument1 + "," + argument2);

  return "";
};

function execute(){
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  try {
    eval(code);
  } catch (e) {
    alert(e);
  }
  console.log(result);

}
