import React, { useState } from "react";
import PropTypes from "prop-types";

function BasicReactJsonFormNode({
  field,
  owner,
  path,
  onChange,
  Component,
  ...others
}) {
  const [value, setValue] = useState(owner[field]);
  const _onChange = (event) => {
    owner[field] = event.target.value;
    onChange(owner);
    setValue(owner[field]);
  };
  return (
    <Component
      path={path.join(".")}
      key={field}
      field={field}
      owner={owner}
      value={value}
      onChange={_onChange}
      {...others}
    />
  );
}

function BasicReactJsonFormParent({
  field,
  owner,
  path,
  onChange,
  Component,
  ChildComponent,
  ...others
}) {
  const [value, setValue] = useState(field ? owner[field] : owner);
  const _onChange = (newValue) => {
    if (field) {
      owner[field] = newValue;
    }
    onChange(owner);
    setValue(newValue);
  };
  return (
    <Component key={field} field={field} owner={owner} {...others}>
      {Object.keys(value).map((key) =>
        typeof value[key] === "object" ? (
          <BasicReactJsonFormParent
            key={key}
            field={key}
            owner={value}
            path={[...path, key]}
            onChange={_onChange}
            Component={Component}
            ChildComponent={ChildComponent}
            {...others}
          />
        ) : (
          <BasicReactJsonFormNode
            key={key}
            path={[...path, key]}
            onChange={_onChange}
            field={key}
            owner={value}
            Component={ChildComponent}
          />
        )
      )}
    </Component>
  );
}

function BasicReactJsonForm({
  object,
  ContainerComponent,
  FormFieldComponent,
  onChange,
  ...others
}) {
  const [model, setModel] = useState(object);
  const _onChange = (newModel) => {
    setModel(newModel);
    if (typeof onChange === "function") {
      onChange(model);
    }
  };
  return (
    <form {...others}>
      <BasicReactJsonFormParent
        Component={ContainerComponent}
        ChildComponent={FormFieldComponent}
        field=''
        owner={model}
        path={[]}
        onChange={_onChange}
      />
    </form>
  );
}

BasicReactJsonForm.propTypes = Object.assign({}, React.Component.defaultProps, {
  object: PropTypes.object,
  ContainerComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  FormFieldComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onChange: PropTypes.func,
});

BasicReactJsonForm.defaultProps = {
  onChange: () => {},
};

export default BasicReactJsonForm;
