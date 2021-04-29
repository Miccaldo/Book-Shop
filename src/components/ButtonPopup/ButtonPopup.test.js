import React from "react";
import { shallow } from "enzyme";
import EmptyCartPopup from "./EmptyCartPopup";

describe("EmptyCartPopup", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EmptyCartPopup />);
    expect(wrapper).toMatchSnapshot();
  });
});
