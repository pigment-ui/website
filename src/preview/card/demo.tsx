const code = `
import { Button, Card, CardBody, CardButtons, CardFooter, CardHeader, CardHeading } from "pigment-ui";

function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardHeading>Lorem ipsum dolor sit amet.</CardHeading>
      </CardHeader>
      
      <CardBody>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto blanditiis commodi culpa dicta distinctio dolor
          dolorem ducimus eveniet id illo illum impedit, iste itaque iusto, libero magnam minima minus nesciunt nostrum numquam omnis optio
          perspiciatis quae quisquam quod repellat rerum sed suscipit ut, velit veniam vero voluptatibus voluptatum?
        </p>
      </CardBody>
      
      <CardFooter>
        <CardButtons>
          <Button variant="light">Cancel</Button>
          <Button>Click me</Button>
        </CardButtons>
      </CardFooter>
    </Card>
  );
}
`;

export const demo = { code };
