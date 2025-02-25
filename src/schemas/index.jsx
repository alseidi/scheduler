const simple = {
  schema: {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      age: {
        type: "integer",
        title: "Age",
      },
      bio: {
        type: "string",
        title: "Bio",
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3,
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10,
      },
    },
  },
  uiSchema: {
    firstName: {
      "ui:autofocus": true,
      "ui:emptyValue": "",
      "ui:autocomplete": "family-name",
      "ui:enableMarkdownInDescription": true,
      "ui:placeholder": "Placeholder First Name",
      "ui:description":
        "Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/).",
    },
    lastName: {
      "ui:autocomplete": "given-name",
      "ui:enableMarkdownInDescription": true,
      "ui:description":
        "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ",
    },
    age: {
      "ui:widget": "updown",
      "ui:title": "Age of person",
      "ui:description": "(earth year)",
    },
    bio: {
      "ui:widget": "textarea",
    },
    password: {
      "ui:widget": "password",
      "ui:help": "Hint: Make it strong!",
    },
    telephone: {
      "ui:options": {
        inputType: "tel",
      },
    },
  },
};

const references = {
  schema: {
    definitions: {
      address: {
        type: "object",
        properties: {
          street_address: {
            type: "string",
          },
          city: {
            type: "string",
          },
          state: {
            type: "string",
          },
        },
        required: ["street_address", "city", "state"],
      },
      node: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          children: {
            type: "array",
            items: {
              $ref: "#/definitions/node",
            },
          },
        },
      },
    },
    type: "object",
    properties: {
      billing_address: {
        title: "Billing address",
        $ref: "#/definitions/address",
      },
      shipping_address: {
        title: "Shipping address",
        $ref: "#/definitions/address",
      },
      tree: {
        title: "Recursive references",
        $ref: "#/definitions/node",
      },
    },
  },
  uiSchema: {
    "ui:order": ["shipping_address", "billing_address", "tree"],
  },
};

export const schemaNames = ["simple", "references"];

export const schemas = {
  simple,
  references,
};
