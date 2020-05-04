import React from "react";
import expect from "expect";
import Component from "../index";
import globalDom from "jsdom-global";
import enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

enzyme.configure({ adapter: new Adapter() });

const testScenarios = {
  "basic nested": {
    t: "hello",
    a: {
      b: 1,
      c: {
        d: 2,
        e: [
          1,
          2,
          3,
          {
            f: "1",
            d: "2",
          },
        ],
      },
    },
    h: "1",
  },
  "deep": {
    a: {
      b: {
        c: {
          d: 1,
          e: undefined,
          r: [{ e: "w", t: ["e", "t"], d: 'c' }],
        },
      },
    },
  },
  "undefined": {
    g: 's',
    c: {
      d: undefined
    },
    r: undefined
  }
};

const testScenarioRunner = function (name, data) {
  let callCounter;
  let form;
  let testData;
  let formTestConfig;
  const resetTestData = () => (testData = data);

  describe(`Rendering (${name})`, function () {
    this.timeout(10000);
    before("load dom", function () {
      setup();
    });

    it("Number of element matches JSON", function () {
      resetTestData();
      const inputs = form.find(InputRenderer);
      const containers = form.find(ContainerRenderer);
      expect(inputs).toHaveLength(countPrimitives(testData));
      // +1 for the form parent
      expect(containers).toHaveLength(1 + countDepth(testData));
    });

    it("Render function is called expected times", function () {
      resetTestData();
      const inputs = form.find(InputRenderer);
      const containers = form.find(ContainerRenderer);
      expect(inputs).toHaveLength(callCounter.field);
      expect(containers).toHaveLength(callCounter.container);
    });

    it("Field with correct path", function () {
      resetTestData();
      const inputs = form.find(InputRenderer);
      inputs.forEach((input) => {
        const path = input.props().path;
        expect(pathExists(testData, path)).toBeTruthy();
      });
    });

    it("Correct Props passed to field renderer", function () {
      resetTestData();
      const inputs = form.find(InputRenderer);
      inputs.forEach((input) => {
        const props = input.props();
        const expectedFields = ["field", "owner", "onChange", "value"];
        expectedFields.forEach((field) => {
          const originalValue = getValueByPath(testData, props.path);
          if(originalValue !== undefined) {
            expect(props[field]).toBeDefined();
          }
        });
      });
    });

    it("Correct props passed to container renderer", function () {
      resetTestData();
      const containers = form.find(ContainerRenderer);
      containers.forEach((container) => {
        const props = container.props();
        const expectedFields = ["field", "owner", "children"];
        expectedFields.forEach((field) => {
          expect(props[field]).toBeDefined();
        });
      });
    });
  });

  describe(`Interation with callback (${name})`, function () {
    this.timeout(10000);
    before("load dom", function () {
      setup(function () {
        callCounter.onChangeCount += 1;
      });
    });

    it("Input change event propagates", function () {
      resetTestData();
      const inputs = form.find(InputRenderer);
      expect(inputs.length === 0).toBe(false);

      const expectedTestData = { ...testData };
      let callbackCount = 0;
      inputs.forEach((input) => {
        callbackCount++;
        testRandomInputChange(input, expectedTestData, testData);
        expect(callbackCount).toBe(callCounter.onChangeCount);
      });
    });
  });

  describe(`Interation without callback (${name})`, function () {
    this.timeout(10000);
    before("load dom", function () {
      setup();
    });

    it("Input change event propagates", function () {
      resetTestData();
      const inputs = form.find(InputRenderer);
      expect(inputs.length === 0).toBe(false);

      const expectedTestData = { ...testData };
      inputs.forEach((input) => {
        testRandomInputChange(input, expectedTestData, testData);
        expect(callCounter.onChangeCount).toBe(0);
      });
    });
  });

  describe(`Performance (${name})`, function () {
    this.timeout(10000);
    let callbackCount = 0;
    before("load dom", function () {
      setup(() => callbackCount++);
    });

    it("onChange invokes less than max depth of property", function () {
      const inputs = form.find(InputRenderer);
      expect(inputs.length === 0).toBe(false);

      const expectedTestData = { ...testData };
      inputs.forEach((input) => {
        initCallCount();
        const path = input.props().path;
        const depth = path.split(".").length;
        testRandomInputChange(input, expectedTestData, testData);
        // in some scenarioes the call depth is smaller e.g. when the field is at the root depth
        expect(callCounter.container + callCounter.field).toBeLessThanOrEqual(
          depth
        );
      });
    });
  });

  describe(`Misc (${name})`, function () {
    this.timeout(10000);
    it("Prop types is defined", function () {
      expect(Component.propTypes).toBeDefined();
    });

    it("Default types is defined", function () {
      expect(Component.defaultProps).toBeDefined();
    });
  });

  function initCallCount() {
    callCounter = {
      field: 0,
      container: 0,
      onChangeCount: 0,
    };
  }

  function setup(onChange) {
    initCallCount();
    formTestConfig = {
      form: {
        id: "test",
        className: "test",
      },
      container: {
        className: "parent",
      },
      field: {
        className: "field",
      },
    };
    resetTestData();
    globalDom();
    form = renderComponent(onChange);
  }

  function testRandomInputChange(input, expectedData, testData) {
    const props = input.props();
    const path = props.path;
    const randomValue = Math.random().toString();
    setTestDataByPath(expectedData, path, randomValue);
    input.simulate("focus");
    input.simulate("change", { target: { value: randomValue } });

    expect(getValueByPath(testData, path)).toBe(
      getValueByPath(expectedData, path)
    );
    expect(input.find("input").getDOMNode().value).toBe(randomValue);
    expect(testData).toEqual(expectedData);
  }

  function InputRenderer({ onChange, value }) {
    callCounter.field++;
    return (
      <input
        onChange={onChange}
        value={value || ""}
        {...formTestConfig.field}
      />
    );
  }

  function ContainerRenderer({ value, children, owner, ...others }) {
    callCounter.container++;
    return (
      <div {...formTestConfig.container} {...others}>
        {children}
      </div>
    );
  }

  function renderComponent(onChange) {
    return mount(
      <Component
        {...formTestConfig.form}
        object={testData}
        ContainerComponent={ContainerRenderer}
        FormFieldComponent={InputRenderer}
        onChange={onChange}
      />
    );
  }
};

Object.keys(testScenarios).forEach((scenario) =>
  testScenarioRunner(scenario, testScenarios[scenario])
);

function getValueByPath(object, path) {
  let objDepth = object;
  const segments = path.split(".");
  for (let segmentIdx = 0; segmentIdx < segments.length; segmentIdx++) {
    const segment = segments[segmentIdx];
    if (segmentIdx === segments.length - 1) {
      return objDepth[segment];
    } else {
      objDepth = objDepth[segment];
    }
  }
  return undefined;
}

function setTestDataByPath(object, path, value) {
  let objDepth = object;
  const segments = path.split(".");
  for (let segmentIdx = 0; segmentIdx < segments.length; segmentIdx++) {
    const segment = segments[segmentIdx];
    if (segmentIdx == segments.length - 1) {
      objDepth[segment] = value;
    } else {
      if (objDepth[segment] === undefined) {
        break;
      }
      objDepth = objDepth[segment];
    }
  }
}

function pathExists(object, path) {
  let objDepth = object;
  const segments = path.split(".");
  for (let segmentIdx = 0; segmentIdx < segments.length; segmentIdx++) {
    const segment = segments[segmentIdx];
    if(segmentIdx === segments.length - 1) {
      break;
    }
    if (objDepth[segment] === undefined) {
      return false;
    }
    objDepth = objDepth[segment];
  }
  return true;
}

function countPrimitives(object, count = 0) {
  return [0, 
    ...Object.keys(object).map((o) =>
      typeof object[o] === "object"
        ? countPrimitives(object[o], count)
        : count + 1
    ),
  ].reduce((a, b) => a + b);
}

function countDepth(object, count = 0) {
  return Math.max(
    0,
    ...Object.keys(object).map((o) =>
      typeof object[o] === "object" ? countDepth(object[o], count + 1) : count
    )
  );
}
