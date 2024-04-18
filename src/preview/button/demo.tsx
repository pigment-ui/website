const code = `
import { Button } from "#/ui";

function ButtonDemo() {
  return <Button onPress={() => console.log("Clicked!")}>Click me</Button>;
}
`;

export const demo = { code };
