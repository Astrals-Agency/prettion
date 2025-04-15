const esbuild = require('esbuild');
const { execSync } = require('child_process');

// Clean up
console.log('Cleaning up...');
try {
  execSync('rm -rf dist');
} catch (error) {
  console.error('Error cleaning up:', error.message);
}

// Run TypeScript compiler for type declarations
console.log('Generating type declarations...');
try {
  execSync('npx tsc --emitDeclarationOnly', { stdio: 'inherit' });
} catch (error) {
  console.error('Error generating type declarations:', error.message);
  process.exit(1);
}

// ESBuild build
console.log('Building with esbuild...');

// CommonJS build
esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'es2018',
  minify: true,
  external: ['chalk'], // External dependencies if any
});

// ESM build
esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.mjs',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'es2018',
  minify: true,
  external: ['chalk'], // External dependencies if any
});

console.log('Build completed successfully!'); 