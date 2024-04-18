const code = `
import { TextArea } from "#/ui";

function TextAreaRadius() {
  return (
    <div className="flex flex-col gap-4">
      <TextArea radius="sm" label="Comment" description="Lorem ipsum dolor sit amet." />
      <TextArea radius="md" label="Comment" description="Lorem ipsum dolor sit amet." />
      <TextArea radius="lg" label="Comment" description="Lorem ipsum dolor sit amet." />
      <TextArea radius="full" label="Comment" description="Lorem ipsum dolor sit amet." />
      <TextArea radius="none" label="Comment" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const radius = { code };
