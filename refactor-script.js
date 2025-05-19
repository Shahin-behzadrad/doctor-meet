const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const UI_COMPONENTS_DIR = path.join(__dirname, "src", "components", "ui");

// Function to process a single file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Replace React imports
  content = content.replace(/import \* as React from "react";/g, (match) => {
    // Extract all React imports used in the file
    const imports = new Set();

    // Check for common React hooks and types
    if (content.includes("useState")) imports.add("useState");
    if (content.includes("useEffect")) imports.add("useEffect");
    if (content.includes("useRef")) imports.add("useRef");
    if (content.includes("useContext")) imports.add("useContext");
    if (content.includes("useId")) imports.add("useId");
    if (content.includes("createContext")) imports.add("createContext");
    if (content.includes("forwardRef")) imports.add("forwardRef");
    if (content.includes("memo")) imports.add("memo");
    if (content.includes("lazy")) imports.add("lazy");
    if (content.includes("Suspense")) imports.add("Suspense");

    // Check for type imports
    if (content.includes("React.ElementRef")) imports.add("type ComponentRef");
    if (content.includes("React.ComponentPropsWithoutRef"))
      imports.add("type ComponentPropsWithoutRef");
    if (content.includes("React.HTMLAttributes"))
      imports.add("type HTMLAttributes");
    if (content.includes("React.ButtonHTMLAttributes"))
      imports.add("type ButtonHTMLAttributes");
    if (content.includes("React.InputHTMLAttributes"))
      imports.add("type InputHTMLAttributes");
    if (content.includes("React.TextareaHTMLAttributes"))
      imports.add("type TextareaHTMLAttributes");
    if (content.includes("React.SelectHTMLAttributes"))
      imports.add("type SelectHTMLAttributes");
    if (content.includes("React.AnchorHTMLAttributes"))
      imports.add("type AnchorHTMLAttributes");
    if (content.includes("React.FormHTMLAttributes"))
      imports.add("type FormHTMLAttributes");
    if (content.includes("React.ImgHTMLAttributes"))
      imports.add("type ImgHTMLAttributes");
    if (content.includes("React.LabelHTMLAttributes"))
      imports.add("type LabelHTMLAttributes");

    // Convert to named imports
    return `import { ${Array.from(imports).join(", ")} } from "react";`;
  });

  // Replace React.ElementRef with ComponentRef
  content = content.replace(/React\.ElementRef/g, "ComponentRef");

  // Replace React.ComponentPropsWithoutRef with ComponentPropsWithoutRef
  content = content.replace(
    /React\.ComponentPropsWithoutRef/g,
    "ComponentPropsWithoutRef"
  );

  // Replace React.HTMLAttributes with HTMLAttributes
  content = content.replace(/React\.HTMLAttributes/g, "HTMLAttributes");

  // Replace React.ButtonHTMLAttributes with ButtonHTMLAttributes
  content = content.replace(
    /React\.ButtonHTMLAttributes/g,
    "ButtonHTMLAttributes"
  );

  // Replace React.InputHTMLAttributes with InputHTMLAttributes
  content = content.replace(
    /React\.InputHTMLAttributes/g,
    "InputHTMLAttributes"
  );

  // Replace React.TextareaHTMLAttributes with TextareaHTMLAttributes
  content = content.replace(
    /React\.TextareaHTMLAttributes/g,
    "TextareaHTMLAttributes"
  );

  // Replace React.SelectHTMLAttributes with SelectHTMLAttributes
  content = content.replace(
    /React\.SelectHTMLAttributes/g,
    "SelectHTMLAttributes"
  );

  // Replace React.AnchorHTMLAttributes with AnchorHTMLAttributes
  content = content.replace(
    /React\.AnchorHTMLAttributes/g,
    "AnchorHTMLAttributes"
  );

  // Replace React.FormHTMLAttributes with FormHTMLAttributes
  content = content.replace(/React\.FormHTMLAttributes/g, "FormHTMLAttributes");

  // Replace React.ImgHTMLAttributes with ImgHTMLAttributes
  content = content.replace(/React\.ImgHTMLAttributes/g, "ImgHTMLAttributes");

  // Replace React.LabelHTMLAttributes with LabelHTMLAttributes
  content = content.replace(
    /React\.LabelHTMLAttributes/g,
    "LabelHTMLAttributes"
  );

  // Remove React. prefixes in component usage
  content = content.replace(/React\.forwardRef/g, "forwardRef");
  content = content.replace(/React\.createContext/g, "createContext");
  content = content.replace(/React\.useContext/g, "useContext");
  content = content.replace(/React\.useId/g, "useId");
  content = content.replace(/React\.useState/g, "useState");
  content = content.replace(/React\.useEffect/g, "useEffect");
  content = content.replace(/React\.useRef/g, "useRef");
  content = content.replace(/React\.memo/g, "memo");
  content = content.replace(/React\.lazy/g, "lazy");
  content = content.replace(/React\.Suspense/g, "Suspense");

  // Write the modified content back to the file
  fs.writeFileSync(filePath, content, "utf8");
}

// Function to process all files in a directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      processFile(filePath);
    }
  }
}

// Main execution
console.log("Starting refactoring...");
processDirectory(UI_COMPONENTS_DIR);
console.log("Refactoring complete!");

// Run Prettier to format the files
console.log("Formatting files with Prettier...");
execSync('npx prettier --write "src/components/ui/**/*.{ts,tsx}"', {
  stdio: "inherit",
});
console.log("Formatting complete!");
