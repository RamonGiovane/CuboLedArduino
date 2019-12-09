Blockly.Blocks['light_on'] = {
  init: function() {
    this.jsonInit({
      "message0": 'acender X %1 Y %2 Z %3',
      "args0": [
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "Z",
        }
      ],
      "colour": 160,
      "previousStatement": "Action",
      "nextStatement": "Action"
    });
  }
};


Blockly.Blocks['light_off'] = {
  init: function() {
    this.jsonInit({
      "message0": 'apagar X %1 Y %2 Z %3',
      "args0": [
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "Z",
        }
      ],
      "colour": 160,
      "previousStatement": "Action",
      "nextStatement": "Action"
    });
  }
};

Blockly.Blocks['blink_light'] = {
  init: function() {
    this.jsonInit({
      "message0": 'piscar por %1 segundo(s) X %2 Y %3 Z %4',
      "args0": [
        {
          "type": "field_input",
          "name": "time",
        },
        {
          "type": "input_value",
          "name": "X",
        },
        {
          "type": "input_value",
          "name": "Y",
        },
        {
          "type": "input_value",
          "name": "Z",
        }
      ],
      "colour": 160,
      "previousStatement": "Action",
      "nextStatement": "Action"
    });
  }
};
