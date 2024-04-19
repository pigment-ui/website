const code = `
import { TextArea } from "#/ui";

function TextAreaSize() {
  return (
    <div className="flex flex-col gap-4">
      <TextArea size="sm" label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextArea size="md" label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextArea size="lg" label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const size = { code };
