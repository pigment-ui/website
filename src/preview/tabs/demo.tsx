const code = `
import { Tab, TabList, TabPanel, Tabs } from "pigment-ui";

function TabsDemo() {
  return (
      <Tabs>
        <TabList aria-label="Lorem ipsum dolor sit amet">
          <Tab id="item-1">Tab 1</Tab>
          <Tab id="item-2">Tab 2</Tab>
          <Tab id="item-3">Tab 3</Tab>
        </TabList>
        <TabPanel id="item-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dicta doloribus dolorum, eligendi, error facere facilis modi nemo nisi
          odio perferendis, porro quae sed similique sit tempora tempore voluptate voluptatibus. Adipisci et provident recusandae.
        </TabPanel>
        <TabPanel id="item-2">
          Adipisci, culpa cum deserunt dolorem ducimus eligendi expedita impedit libero maiores nemo odio quibusdam quidem, quis quo totam unde
          veritatis.
        </TabPanel>
        <TabPanel id="item-3">
          A accusamus ad adipisci consequuntur cumque, expedita id illum ipsum non omnis porro quisquam saepe, sapiente, tempore veniam! Accusamus
          alias atque consequatur cupiditate dolorem eius, hic ipsam laboriosam, modi perferendis quisquam quos sapiente totam veniam voluptate!
        </TabPanel>
      </Tabs>
  );
}
`;

export const demo = { code };
