import renderer from "react-test-renderer";

import { Avatar } from "@components/avatar";

it(`renders correctly`, () => {
  const tree = renderer.create(<Avatar name="Jon" />).toJSON();

  expect(tree).toMatchSnapshot();
});
