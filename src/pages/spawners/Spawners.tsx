import Select, { GroupBase, SingleValue } from "react-select";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import React, { useState } from "react";
import { Option, Spawner } from "./Spawners.types.ts";
import { SPAWNER_OPTIONS } from "../../data/spawner-options.ts";
import { DROPDOWN_STYLES } from "../../components/dropdown/Dropdown.styles.ts";
import { FILE_TYPE, readFile } from "../../utils/read-file.ts";
import { Alert } from "../../components/alert/Alert.tsx";
import { AMMO } from "../../app/items/ammo.ts";

export function Spawners() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [jsonData, setJsonData] = useState<Spawner | null>(null);

  const handleChange = async (newValue: SingleValue<Option | null>): Promise<void> => {
    setSelectedOption(newValue);

    if (newValue) {
      const data = await readFile<Spawner>(newValue, FILE_TYPE.Spawners);
      if (data) {
        setJsonData(data);
      }
    }
  }

  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Spawners</h1>
      <Alert children={'Here will be description of the spawners'} />

      <span>
        <Select<Option, false, GroupBase<Option>>
          options={SPAWNER_OPTIONS}
          value={selectedOption}
          isSearchable={true}
          isClearable={true}
          styles={DROPDOWN_STYLES}
          placeholder="Select spawner..."
          onChange={handleChange}
        />
      </span>

      <span>
        {selectedOption &&
          <>
            <Tabs>
              <TabList>
                <Tab>Items</Tab>
                <Tab>Fixed Items</Tab>
                <Tab>Nodes</Tab>
                <Tab>Settings</Tab>
              </TabList>

              <TabPanel>
                <Alert children={'Here will be a form for adding items and probability'} />

                {jsonData && jsonData.Items && jsonData.Items.map((item) => (
                  <p key={item.Id}>Id: {item.Id} - Rarity: {item.Rarity}</p>
                ))}
              </TabPanel>
              <TabPanel>
                <Alert children={'Here will be a form for adding fixed items'} />

                {jsonData && jsonData.FixedItems && jsonData.FixedItems.map((item) => (
                  <p key={item}>{AMMO.get(item)?.name || item}</p>
                ))}
              </TabPanel>
              <TabPanel>
                <Alert children={'Here will be a form for adding pre-made nodes'} />

                {jsonData && jsonData.Nodes && jsonData.Nodes.map((node, key) => (
                  <React.Fragment key="node-wrapper">
                    <p key={key}>Rarity: {node.Rarity}</p>
                    {node.Ids.map((id) => (
                      <p key={id}>{id}</p>
                    ))}
                  </React.Fragment>
                ))}
              </TabPanel>
              <TabPanel>
                <Alert children={'Here will be tooltips with explanations for each field'} />

                <div>
                  <label htmlFor="probability">Probability:</label>
                  <input type="text" id="probability" name="probability" defaultValue={jsonData?.Probability}/>
                </div>
                <div>
                  <label htmlFor="quantity-min">Quantity Min:</label>
                  <input type="text" id="quantity-min" name="quantity-min" defaultValue={jsonData?.QuantityMin}/>
                </div>
                <div>
                  <label htmlFor="quantity-max">Quantity Max:</label>
                  <input type="text" id="quantity-max" name="quantity-max" defaultValue={jsonData?.QuantityMax}/>
                </div>
                <div>
                  <label htmlFor="allow-duplicates">Allow duplicates:</label>
                  <input type="text" id="allow-duplicates" name="allow-duplicates"
                         defaultValue={jsonData?.AllowDuplicates ? String(jsonData?.AllowDuplicates) : ""}/>
                </div>
                <div>
                  <label htmlFor="should-filter-items-by-zone">Should filter items by zone:</label>
                  <input type="text" id="should-filter-items-by-zone" name="should-filter-items-by-zone"
                         defaultValue={jsonData?.ShouldFilterItemsByZone ? String(jsonData?.ShouldFilterItemsByZone) : ""}/>
                </div>
                <div>
                  <label htmlFor="initial-damage">Initial damage:</label>
                  <input type="text" id="initial-damage" name="initial-damage" defaultValue={jsonData?.InitialDamage}/>
                </div>
                <div>
                  <label htmlFor="random-damage">Random damage:</label>
                  <input type="text" id="random-damage" name="random-damage" defaultValue={jsonData?.RandomDamage}/>
                </div>
                <div>
                  <label htmlFor="initial-usage">Initial usage:</label>
                  <input type="text" id="initial-usage" name="initial-usage" defaultValue={jsonData?.InitialUsage}/>
                </div>
                <div>
                  <label htmlFor="random-usage">Random usage:</label>
                  <input type="text" id="random-usage" name="random-usage" defaultValue={jsonData?.RandomDamage}/>
                </div>
                <div>
                  <label htmlFor="post-spawn-actions">Post spawn actions:</label>
                  {jsonData && jsonData.PostSpawnActions && jsonData.PostSpawnActions.map((action) => (
                    <p key={action}>{action}</p>
                  ))}
                </div>
              </TabPanel>
            </Tabs>
            <a href="#" className="button text-weight-800 not-available"
               style={{ marginTop: 32, display: "block" }}>Download</a>
          </>
        }
      </span>
    </main>
  );
}
