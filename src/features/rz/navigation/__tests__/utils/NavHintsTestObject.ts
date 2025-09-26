import { screen } from "@testing-library/dom";

export class NavHintsTestObject {

  constructor(private introHintText: string) {}

    checkIntroHintText() {
      return screen.queryByText(this.introHintText);
    }

    checkText(text: string) {
      return screen.queryByText(text);
    }
  }