// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { $ } from "./$.js";

describe("$", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-id" class="test-class">Hello</div>
      <div class="test-class">World</div>
    `;
  });

  it("should select an element by id", () => {
    const el = $("#test-id");
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe("Hello");
  });

  it("should select the first element by class", () => {
    const el = $(".test-class");
    expect(el?.textContent).toBe("Hello");
  });

  it("should return null if element not found", () => {
    const el = $(".non-existent");
    expect(el).toBeNull();
  });

  it("should respect context", () => {
    const container = document.createElement("div");
    container.innerHTML = `<span class="test-class">Inner</span>`;
    const el = $(".test-class", container);
    expect(el?.textContent).toBe("Inner");
  });
});
