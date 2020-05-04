# basic-react-json-form &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ndphan/basic-react-json-form/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/basic-react-json-form.svg?style=flat)](https://www.npmjs.com/package/basic-react-json-form)
A basic json form builder for React that will build the form structure based on the json object


## Installation

```bash
npm i basic-react-json-form
```

## Usage

```javascript
import React from "react";
import JSONForm from "basic-react-json-form";

function example({ json }) {
  return (
      <JSONForm
        className="json-form"
        object={json}
        ContainerComponent={ContainerRenderer}
        FormFieldComponent={FormFieldRenderer}
      />
  );
}

function FormFieldRenderer({ field, owner, onChange, value }) {
  return (
    <div className="json-form-child">
      <label name={field}>{field}</label>
      <input
        key={field}
        type="text"
        onChange={onChange}
        value={value || ""}
      />
    </div>
  );
}

function ContainerRenderer({ children, field, owner, ...others }) {
  return <div className="json-form-parent" {...others}>{children}</div>;
}
```
