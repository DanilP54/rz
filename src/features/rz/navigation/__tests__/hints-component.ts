import { screen } from "@testing-library/dom";

export class NavHintsTestObject {
  constructor(private introHintText: string) {}

  getIntroHintText() {
    return screen.queryByText(this.introHintText);
  }

  getHintText(text: string) {
    return screen.queryByText(text);
  }
}
