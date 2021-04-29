import React from "react";
import { shallow } from "enzyme";
import CartButton from "./CartButton";

describe("CartButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CartButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
