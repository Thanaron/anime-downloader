import { rm } from 'shelljs';

console.log('Cleaning up build directories');

rm('-rf', 'dist/');
rm('-rf', 'build/');
