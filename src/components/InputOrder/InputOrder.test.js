import React from "react";
import { shallow } from "enzyme";
import InputOrder from "./InputOrder";

describe("InputOrder", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InputOrder />);
    expect(wrapper).toMatchSnapshot();
  });
});
