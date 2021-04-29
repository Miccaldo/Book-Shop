import React from "react";
import { shallow } from "enzyme";
import Book from "./Book";

describe("Book", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Book />);
    expect(wrapper).toMatchSnapshot();
  });
});
