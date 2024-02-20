import Select, { GroupBase, SingleValue, StylesConfig } from "react-select";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import React, { useState } from "react";
import { Option, Spawner } from "./Spawners.types.ts";
import { config } from "../../config.ts";

const options: Option[] = [
  { value: 'Landscape-Examine_GroundRocks.json', label: 'Landscape-Examine_GroundRocks.json' },
  {
    value: 'Buildings-Store-Hunting_Store-Examine_CashRegister.json',
    label: 'Buildings-Store-Hunting_Store-Examine_CashRegister.json'
  },
  { value: 'Buildings-Livingroom-Examine_Vine_Cabinet.json', label: 'Buildings-Livingroom-Examine_Vine_Cabinet.json' },
  { value: 'Water-Shipwrecks-World_Shelf.json', label: 'Water-Shipwrecks-World_Shelf.json' }
]

export function Spawners() {
  const styles: StylesConfig<Option, false, GroupBase<Option>> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#141414',
      border: '1px solid #272727',
      borderRadius: '8px',
      boxShadow: 'none',
      padding: '2px 8px',
      '&:hover': {
        border: '1px solid #806534',
      },
      '&:active': {
        border: '1px solid #806534',
      },
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#141414',
      border: '1px solid #272727',
      borderRadius: '8px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#141414',
      borderRadius: '8px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#272727' : '#141414',
      color: state.isSelected ? '#F9C666' : '#9F9B93',
      '&:hover': {
        backgroundColor: '#272727',
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#9F9B93',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#9F9B93',
      '&:hover': {
        color: '#806534',
      }
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#9F9B93',
      '&:hover': {
        color: '#806534',
      }
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#272727',
    }),
    input: (provided) => ({
      ...provided,
      color: '#9F9B93',
    }),
  }

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [jsonData, setJsonData] = useState<Spawner | null>(null);

  const readFile = async (option: Option): Promise<Spawner> => {
    try {
      const url = `${config.DATA_PATH}/spawners/${option.value}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch the spawner: ${option.value}`);
      }

      const jsonData = await response.json();

      return jsonData as Spawner;
    } catch (error) {
      throw new Error(`Could not fetch the spawner: ${option.value}`);
    }
  }

  const handleChange = async (newValue: SingleValue<Option | null>): Promise<void> => {
    setSelectedOption(newValue);

    if (newValue) {
      const data = await readFile(newValue);
      if (data) {
        setJsonData(data);
      }
    }
  }

  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Spawners</h1>

      <span>
        <Select<Option, false, GroupBase<Option>>
          options={options}
          value={selectedOption}
          isSearchable={true}
          isClearable={true}
          styles={styles}
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
                <div className="alert" role="alert">
                  <ul>
                    <li><strong>Abundant:</strong> 32 times more likely to be selected than <strong>Extremely Rare</strong></li>
                    <li><strong>Common:</strong> 16 times more likely to be selected than <strong>Extremely Rare</strong></li>
                    <li><strong>Uncommon:</strong> 8 times more likely to be selected than <strong>Extremely Rare</strong></li>
                    <li><strong>Rare:</strong> 4 times more likely to be selected than <strong>Extremely Rare</strong></li>
                    <li><strong>Very Rare:</strong> 2 times more likely to be selected than <strong>Extremely Rare</strong></li>
                    <li><strong>Extremely Rare:</strong> The same likelihood to be selected as any other <strong>Extremely Rare</strong> object in the set</li>
                  </ul>
                </div>

                {jsonData && jsonData.Items && jsonData.Items.map((item) => (
                  <p key={item.Id}>Id: {item.Id} - Rarity: {item.Rarity}</p>
                ))}
                <p>here will be a form for adding items and probability</p>
              </TabPanel>
              <TabPanel>
                {jsonData && jsonData.FixedItems && jsonData.FixedItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
                <p>here will be a form for adding fixed items</p>
              </TabPanel>
              <TabPanel>
                {jsonData && jsonData.Nodes && jsonData.Nodes.map((node, key) => (
                  <React.Fragment key="node-wrapper">
                    <p key={key}>Rarity: {node.Rarity}</p>
                    {node.Ids.map((id) => (
                      <p key={id}>{id}</p>
                    ))}
                  </React.Fragment>
                ))}
                <p>here will be a form for adding pre-made nodes</p>
              </TabPanel>
              <TabPanel>
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
                         defaultValue={String(jsonData?.AllowDuplicates)}/>
                </div>
                <div>
                  <label htmlFor="should-filter-items-by-zone">Should filter items by zone:</label>
                  <input type="text" id="should-filter-items-by-zone" name="should-filter-items-by-zone"
                         defaultValue={String(jsonData?.ShouldFilterItemsByZone)}/>
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
              </TabPanel>
            </Tabs>
            <a href="#" className="button text-weight-800" style={{marginTop: 32, display: "block"}}>Download</a>
          </>
        }
      </span>
    </main>
  );
}
