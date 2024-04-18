const code = `
import { Button, Card, CardBody, CardButtons, CardFooter, CardHeader, CardHeading, Separator } from "#/ui";

function CardHasShadow() {
  return (
    <Card hasShadow={false}>
      <CardHeader>
        <CardHeading>Lorem ipsum dolor sit amet.</CardHeading>
      </CardHeader>

      <Separator />

      <CardBody>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto blanditiis commodi culpa dicta distinctio dolor
          dolorem ducimus eveniet id illo illum impedit, iste itaque iusto, libero magnam minima minus nesciunt nostrum numquam omnis optio
          perspiciatis quae quisquam quod repellat rerum sed suscipit ut, velit veniam vero voluptatibus voluptatum?
        </p>
      </CardBody>

      <Separator />

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

export const hasShadow = { code };
