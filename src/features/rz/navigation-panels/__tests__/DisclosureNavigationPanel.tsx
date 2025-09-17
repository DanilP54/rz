// import { render, screen, fireEvent } from "@testing-library/react";
// import { describe, it, expect, vi } from "vitest";
// import { DisclosureNavigationPanel } from "../ui/DisclosureNavigationPanel";
// import { navigationConfig } from "../config";

// const instinctsPanel = navigationConfig.panels.instincts;

// describe("DisclosureNavigationPanel", () => {
//   const onToggle = vi.fn();
//   it("renders button with correct attributes", () => {
//     render(
//       <DisclosureNavigationPanel
//         isExpanded={false}
//         onToggle={onToggle}
//         panel={instinctsPanel}
//       />
//     );
//     const button = screen.getByTestId(`nav-toggle-${instinctsPanel.segment}`);
//     expect(button).toBeInTheDocument();
//     expect(button).toHaveAttribute("aria-expanded", "false");
//   });

//   it("calls onToggle when button is clicked", () => {
//     render(
//       <DisclosureNavigationPanel
//         isExpanded={false}
//         onToggle={onToggle}
//         panel={instinctsPanel}
//       />
//     );
//     const button = screen.getByTestId(`nav-toggle-${instinctsPanel.segment}`);
//     fireEvent.click(button);
//     expect(onToggle).toHaveBeenCalledTimes(1);
//   });

//   it("shows links when expanded", () => {
//     render(
//       <DisclosureNavigationPanel
//         isExpanded={true}
//         onToggle={onToggle}
//         panel={instinctsPanel}
//       />
//     );
    
//     const ul = screen.getByRole("list");
//     expect(ul).toHaveClass("flex");

//     instinctsPanel.links.forEach((link) => {
//         const a = screen.getByText(link.label)
//         expect(a).toBeInTheDocument()
//     })

//   });

//   it("hides links when not expanded", () => {
//     render(
//       <DisclosureNavigationPanel
//         isExpanded={false}
//         onToggle={onToggle}
//         panel={instinctsPanel}
//       />
//     );
  
//     const ul = screen.getByRole("list");
//     expect(ul).toHaveClass("hidden");
//   });
// });
