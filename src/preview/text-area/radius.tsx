const code = `
import { TextArea } from "pigment-ui";

function TextAreaRadius() {
  return (
    <div className="flex flex-col gap-4">
      <TextArea radius="sm" label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextArea radius="md" label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextArea radius="lg" label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextArea radius="full" label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextArea radius="none" label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const radius = { code };
