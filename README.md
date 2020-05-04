# basic-react-json-form &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ndphan/basic-react-json-form/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/basic-react-json-form.svg?style=flat)](https://www.npmjs.com/package/basic-react-json-form)
A basic json form builder for React that will build the form structure based on the json object


## Installation

```bash
npm i basic-react-json-form
```

## Usage

```javascript
import React from "react";
import BasicReactJsonForm from "basic-react-json-form";

function example({ json }) {
  return (
      <BasicReactJsonForm
        className="json-form"
        object={json}
        ContainerComponent={ContainerComponent}
        FormFieldComponent={FormFieldComponent}
      />
  );
}

function FormFieldComponent({ field, owner, onChange, value }) {
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

function ContainerComponent({ children, field, owner, ...others }) {
  return <div className="json-form-parent" {...others}>{children}</div>;
}
```

## Api
BasicReactJsonForm

The component which renders the JSON object form structure

props
- object: the json object (note: only strings are supported)
- ContainerComponent: component to render the container
- FormFieldComponent: component to render the input field
- other props are passed to the form element

ContainerComponent

The container of any nested object properties e.g. { a: { b: '2' } } where a will contain a parent

props
- field: the key of the container for the property in the parent e.g. { a: { b: { d: 2 } } } where b is the key
- owner: the parent object for this level e.g. { a: { b: { d: 2 } } } where { b: { d: 2 } } is the owner
- childern: the child input / parent fields (this must be placed inside the rendered html)

FormFieldComponent

The input field component for the string property e.g. { a: { b: '2' } } where b is a input field

props
- field: the key of the field for the property in the parent e.g. { a: { b: { d: 2 } } } where d is the key
- owner: the parent object for this level e.g. { a: { b: { d: 2 } } } where { d: 2 } is the owner
- onChange: onChange that must be bound to an input field
- value: value that must be bound to an input field

