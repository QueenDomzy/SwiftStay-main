#!/usr/bin/env node
/**
 * Auto-fix unmatched braces in reservations.service.ts
 */

const fs = require("fs");
const filepath = "reservations/reservations.service.ts";

if (!fs.existsSync(filepath)) {
  console.error("❌ File not found:", filepath);
  process.exit(1);
}

let code = fs.readFileSync(filepath, "utf8");

// Count braces
const openCount = (code.match(/{/g) || []).length;
const closeCount = (code.match(/}/g) || []).length;

console.log(`{ count: ${openCount}, } count: ${closeCount}`);

if (openCount > closeCount) {
  // Add closing braces at the end
  const diff = openCount - closeCount;
  code += "\n" + "}".repeat(diff) + "\n";
  fs.writeFileSync(filepath, code);
  console.log(`✅ Added ${diff} missing closing brace(s) to ${filepath}`);
} else if (closeCount > openCount) {
  console.log("⚠️ More closing braces than opening braces – please check logic.");
} else {
  console.log("✅ Braces already balanced.");
}
