#!/usr/bin/env node
/**
 * SwiftStay Repo Auto-Fix Script
 * Usage: node fix-repo.js
 */

const fs = require("fs");
const { execSync } = require("child_process");

function run(cmd) {
  console.log(`\n> ${cmd}`);
  try {
    const out = execSync(cmd, { stdio: "pipe" }).toString();
    console.log(out);
    return out;
  } catch (err) {
    console.error(err.stdout?.toString() || err.message);
  }
}

// 1. Ensure package.json is valid
if (fs.existsSync("package.json")) {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

  // Remove nested scripts keys
  if (pkg.scripts && pkg.scripts.scripts) {
    pkg.scripts = { ...pkg.scripts, ...pkg.scripts.scripts };
    delete pkg.scripts.scripts;
  }

  // Standard scripts
  pkg.scripts = {
    ...pkg.scripts,
    prebuild: "npx prisma generate",
    build: "tsc",
    start: "node dist/main.js",
    "start:dev": "nest start --watch",
    "prisma:migrate": "npx prisma migrate dev",
  };

  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
  console.log("✅ package.json scripts fixed");
} else {
  console.log("⚠️ No package.json found");
}

// 2. Ensure tsconfig.json has outDir
if (fs.existsSync("tsconfig.json")) {
  let tsconfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf8"));
  if (!tsconfig.compilerOptions) tsconfig.compilerOptions = {};
  tsconfig.compilerOptions.outDir = "./dist";
  fs.writeFileSync("tsconfig.json", JSON.stringify(tsconfig, null, 2));
  console.log("✅ tsconfig.json outDir fixed");
}

// 3. Generate Prisma client
if (fs.existsSync("prisma/schema.prisma")) {
  run("npx prisma generate");
} else {
  console.log("⚠️ prisma/schema.prisma not found");
}

// 4. Install deps
run("npm install");

// 5. Try build
run("npm run build");

console.log("\n🚀 Repo check complete. If build passed, you can now deploy.");
