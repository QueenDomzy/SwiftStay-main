{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "typeRoots": ["./node_modules/@types", "./src/@types"]
  },
  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx"],
  "exclude": [
    "node_modules",
    "src/index.ts",
    "src/routes",
    "src/lib",
    "backend",
    "server"
  ]
}
