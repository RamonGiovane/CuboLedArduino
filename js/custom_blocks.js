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


Blockly.Blocks['sleep'] = {
  init: function() {
    this.jsonInit({
      "message0": 'esperar por %1 segundo(s)',
      "args0": [
        {
          "type": "field_input",
          "name": "time",
        }
      ],
      "colour": 160,
      "previousStatement": "Action",
      "nextStatement": "Action"
    });
  }
};

Blockly.Blocks['repeat'] = {
  init: function() {
    this.jsonInit({
      "message0": 'repetir comandos acima %1 vezes',
      "args0": [
        {
          "type": "field_input",
          "name": "vezes",
        }
      ],
      "colour": 20,
      "previousStatement": "Action",
      "nextStatement": "Action"
    });
  }
};


Blockly.Blocks['add'] = {
  init: function() {
    this.jsonInit({

  "message0": "adicionar %1 + 1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "plan",
      "options": [
        [ "x", "x" ],
        [ "y", "y" ],
        [ "z", "z" ]
      ]
    }
  ],
  "colour": 100,
  "previousStatement": "Action",
  "nextStatement": "Action"
  
    });
  }
};

Blockly.Blocks['sub'] = {
  init: function() {
    this.jsonInit({

  "message0": "subtrair %1 + 1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "plan",
      "options": [
        [ "x", "x" ],
        [ "y", "y" ],
        [ "z", "z" ]
      ]
    }
  ],
  "colour": 100,
  "previousStatement": "Action",
  "nextStatement": "Action"
  
    });
  }
};
Blockly.Blocks['var'] = {
  init: function() {
    this.jsonInit({

  "message0": "%1 %2 %3 %4",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "operation",
      "options": [
        [ "acender", "acender"],
        [ "apagar", "apagar"]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "x",
      "options": [
        [ "x", "x" ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "y",
      "options": [
        [ "y", "y" ]

      ]
    },
    {
      "type": "field_dropdown",
      "name": "z",
      "options": [
        [ "z", "z" ]

      ]
    }
  ],
  "colour": 120,
  "previousStatement": "Action",
  "nextStatement": "Action"
  
    });
  }
};


Blockly.Blocks['var_blink'] = {
  init: function() {
    this.jsonInit({

  "message0": "piscar em %1 seg %2 %3 %4",
  "args0": [
    {
      "type": "field_input",
      "name": "time",
    },
    {
      "type": "field_dropdown",
      "name": "x",
      "options": [
        [ "x", "x" ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "y",
      "options": [
        [ "y", "y" ]

      ]
    },
    {
      "type": "field_dropdown",
      "name": "z",
      "options": [
        [ "z", "z" ]

      ]
    }
  ],
  "colour": 120,
  "previousStatement": "Action",
  "nextStatement": "Action"
  
    });
  }
};


Blockly.Blocks['reset'] = {
  init: function() {
    this.jsonInit({

  "message0": "reset %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "plan",
      "options": [
        [ "x", "x" ],
        [ "y", "y" ],
        [ "z", "z" ]
      ]
    }
  ],
  "colour": 0,
  "previousStatement": "Action",
  "nextStatement": "Action"
  
    });
  }
};

Blockly.Blocks['blink_light'] = {
  init: function() {
    this.jsonInit({
      "message0": 'piscar em %1 segundo(s) X %2 Y %3 Z %4',
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
