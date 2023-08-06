const message = 'Hello node!';
console.log(message);

analytics('test');
export function analytics(name: string): void {
  console.log(name, ' started...');
}
