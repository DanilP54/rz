import { screen } from "@testing-library/dom";

export class NavHintsTestObject {

  constructor(private introHintText: string, private panelHintText: string) {}

    checkIntroHintText() {
      return screen.queryByText(this.introHintText);
    }

    checkPanelHintText() {
      return screen.queryByText(this.panelHintText);
    }
  }