import { useRef, useEffect, useState } from "react";

import { withTheme } from "@rjsf/core";
import { Theme } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import Ajv from "ajv";
import { ErrorBoundary } from "react-error-boundary";
import formEventEmitter from "./formEventEmitter";

const Form = withTheme(Theme); // Pass the MUI theme here.

const ajv = new Ajv(); // Initialize AJV for schema validation

const RJSFMaterialForm = ({
  schema,
  uiSchema,
  onSubmit,
  validateSchema = true,
}) => {
  const formRef = useRef(null);

  const [schemaErrors, setSchemaErrors] = useState([]);

  // Validate the schema if `validateSchema` is true

  useEffect(() => {
    if (validateSchema) {
      try {
        ajv.compile(schema); // Compiles and validates the schema
      } catch (error) {
        console.log(error);
        setSchemaErrors([error]);
      }
    }
  }, [schema, validateSchema]);

  const handleValidationCheck = () => {
    if (formRef.current) {
      const { errors } = formRef.current.validateForm();

      const isValid = errors ? errors.length === 0 : true;

      // Emit validation result and errors

      formEventEmitter.emit("formValidated", { isValid, errors });

      if (isValid) {
        onSubmit(formRef.current.state.formData);
      } else {
        console.error("Form validation failed:", errors);
      }
    }
  };

  const handleChange = (e) => {
    formEventEmitter.emit("formChanged", e.formData);
  };

  return (
    <Box sx={{ p: 2 }}>
      {schemaErrors.length ? (
        <Box>
          <Typography variant="h6" color="error">
            Schema Validation Errors:
          </Typography>

          <List>
            {schemaErrors.map((error, index) => (
              <ListItem key={index}>
                <ListItemText primary={error.message} />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Your Form Title
          </Typography>
          <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
            <Form
              schema={schema}
              uiSchema={uiSchema}
              onChange={handleChange}
              ref={formRef}
              validator={validator}
              onSubmit={handleValidationCheck}
            >
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </ErrorBoundary>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleValidationCheck}
            sx={{ mt: 2 }}
          >
            Validate Form
          </Button>
        </>
      )}
    </Box>
  );
};

export default RJSFMaterialForm;
