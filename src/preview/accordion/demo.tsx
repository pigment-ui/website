const code = `
import { Accordion, AccordionItem } from "pigment-ui";

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" title="Accordion 1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dicta doloribus dolorum, eligendi, error facere facilis modi nemo nisi
        odio perferendis, porro quae sed similique sit tempora tempore voluptate voluptatibus. Adipisci et provident recusandae.
      </AccordionItem>
      <AccordionItem value="item-2" title="Accordion 2">
        Adipisci, culpa cum deserunt dolorem ducimus eligendi expedita impedit libero maiores nemo odio quibusdam quidem, quis quo totam unde
        veritatis.
      </AccordionItem>
      <AccordionItem value="item-3" title="Accordion 3">
        A accusamus ad adipisci consequuntur cumque, expedita id illum ipsum non omnis porro quisquam saepe, sapiente, tempore veniam! Accusamus
        alias atque consequatur cupiditate dolorem eius, hic ipsam laboriosam, modi perferendis quisquam quos sapiente totam veniam voluptate!
      </AccordionItem>
    </Accordion>
  );
}
`;

export const demo = { code };
