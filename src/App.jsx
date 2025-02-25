import { Box, Button, Typography } from "@mui/material";
import "./App.css";
import RJSFMaterialForm from "./components/RJSFMaterialForm";
import { schemaNames, schemas } from "./schemas";
import { useEffect, useState } from "react";
import formEventEmitter from "./components/RJSFMaterialForm/formEventEmitter";

function App() {
  const [selectedSchemaName, setSelectedSchemaName] = useState("simple");

  const [editableSchema, setEditableSchema] = useState();
  const [schema, setSchema] = useState({});

  const [editableUiSchema, setEditableUiSchema] = useState();
  const [uiSchema, setUiSchema] = useState({});

  useEffect(() => {
    formEventEmitter.on("formValidated", (data) => {
      console.log("formValidated from the event", data);
    });
    formEventEmitter.on("formChanged", (data) => {
      console.log("formValidated from the event", data);
    });
  }, []);

  useEffect(() => {
    setEditableSchema(
      JSON.stringify(schemas[selectedSchemaName].schema, null, "\t")
    );
    setEditableUiSchema(
      JSON.stringify(schemas[selectedSchemaName].uiSchema, null, "\t")
    );
  }, [selectedSchemaName]);

  useEffect(() => {
    try {
      setSchema(JSON.parse(editableSchema));
    } catch {
      console.log("Invalid Json");
    }
  }, [editableSchema]);

  useEffect(() => {
    try {
      setUiSchema(JSON.parse(editableUiSchema));
    } catch {
      console.log("Invalid Json");
    }
  }, [editableUiSchema]);

  const handleSubmit = (formData) => {
    console.log("formData", formData);
  };

  const handleSelectSchema = (schemaName) => () => {
    setSelectedSchemaName(schemaName);
  };

  const handleSchemaChange = (event) => {
    setEditableSchema(event.target.value);
  };

  const handleUiSchemaChange = (event) => {
    setEditableUiSchema(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          <RJSFMaterialForm
            schema={schema}
            uiSchema={uiSchema}
            onSubmit={handleSubmit}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography component="p">Schemas</Typography>
          <Box>
            {schemaNames.map((schemaName) => (
              <Button key={schemaName} onClick={handleSelectSchema(schemaName)}>
                {schemaName}
              </Button>
            ))}
          </Box>
          <Typography component="p">Schema:</Typography>
          <Box
            component={"textarea"}
            sx={{
              width: "100%",
              height: "500px",
            }}
            value={editableSchema}
            onChange={handleSchemaChange}
          ></Box>
          <Typography component="p">UI Schema:</Typography>
          <Box
            component={"textarea"}
            sx={{
              width: "100%",
              height: "500px",
            }}
            value={editableUiSchema}
            onChange={handleUiSchemaChange}
          ></Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
