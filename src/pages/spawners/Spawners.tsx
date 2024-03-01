import Select, { GroupBase, MultiValue, SingleValue } from "react-select";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import React, { useEffect, useState } from "react";
import { ItemSelection, Option, settingsInitialState, Spawner, SpawnerItem } from "./Spawners.types.ts";
import { SPAWNER_OPTIONS } from "../../data/spawner-options.ts";
import { DROPDOWN_STYLES } from "../../components/dropdown/Dropdown.styles.ts";
import { FILE_TYPE, readFile } from "../../utils/read-file.ts";
import { Alert } from "../../components/alert/Alert.tsx";
import BigNumber from "bignumber.js";
import { isNumberAndGreaterThanZero } from "../../utils/validate-spawner.ts";
import { BOOLEAN_OPTIONS } from "../../data/boolean-options.ts";
import { Tooltip } from "react-tooltip";
import { IconInfo } from "../../components/icon-info/IconInfo.tsx";
import { POST_SPAWN_ACTIONS_OPTIONS } from "../../data/post-spawn-actions-options.ts";
import { ITEMS_OPTIONS } from "../../data/items-options.ts";
import { RARITY_OPTIONS } from "../../data/rarity-options.ts";
import { Rarity } from "../../app/rarity.ts";

export function Spawners() {
  const [selectedSpawner, setSelectedSpawner] = useState<Option | null>(null);
  const [jsonData, setJsonData] = useState<Spawner | null>(null);
  const [dataUrl, setDataUrl] = useState('');
  const [settingsFormValues, setSettingsFormValues] = useState(settingsInitialState);
  const [postSpawnActionValues, setPostSpawnActionValues] = useState<Option[]>([]);
  const [fixedItemValues, setFixedItemValues] = useState<SingleValue<Option>[]>([null]);
  const [itemValues, setItemValues] = useState<ItemSelection[]>([
    { selectedItem: null, selectedRarity: null }
  ]);

  useEffect(() => {
    if (!jsonData) {
      return;
    }

    const fixedItems = displayItemsInMultiSelect(jsonData.FixedItems || [], ITEMS_OPTIONS);
    setFixedItemValues(fixedItems);

    const postSpawnActions = displayItemsInMultiSelect(jsonData.PostSpawnActions || [], POST_SPAWN_ACTIONS_OPTIONS);
    setPostSpawnActionValues(postSpawnActions);

    const itemsAndRarity = mapItemsAndRarity(jsonData.Items || [], ITEMS_OPTIONS, RARITY_OPTIONS);
    setItemValues(itemsAndRarity);

  }, [jsonData]);

  const mapItemsAndRarity = (items: SpawnerItem[], itemsDb: Option[], rarityDb: Option[]) => {
    return items.map((item) => {
      const foundItem = itemsDb.find((dbItem) => dbItem.value === item.Id) || { value: item.Id, label: item.Id };
      const foundRarity = rarityDb.find((rarity) => rarity.value === item.Rarity) || { value: item.Rarity, label: item.Rarity };

      return {
        selectedItem: foundItem,
        selectedRarity: foundRarity,
      };
    });
  };

  const addFixedItemSelect = () => {
    setFixedItemValues([...fixedItemValues, null]);
  }

  const handleFixedItemsChange = (value: SingleValue<Option>, index: number) => {
    const updatedValues = fixedItemValues.map((item, i) =>
      i === index ? value : item
    );
    setFixedItemValues(updatedValues);
  }

  const displayItemsInMultiSelect = (itemNames: string[], itemsDb: Option[]) => {
    return itemNames.map((itemName) => {
      return itemsDb.find((item) => item.value === itemName) || { value: itemName, label: itemName }
    }) ?? [];
  }

  const handleSpawnerChange = async (spawnerValue: SingleValue<Option | null>) => {
    setSelectedSpawner(spawnerValue);
    if (!spawnerValue) {
      return
    }

    const spawnerJsonData = await readFile<Spawner>(spawnerValue, FILE_TYPE.Spawners);
    if (!spawnerJsonData) {
      return
    }

    setJsonData(spawnerJsonData);
    setSettingsFormValues({
      probabilityValue: spawnerJsonData.Probability ? BigNumber(spawnerJsonData.Probability).toString() : '',
      quantityMinValue: spawnerJsonData.QuantityMin ? BigNumber(spawnerJsonData.QuantityMin).toString() : '',
      quantityMaxValue: spawnerJsonData.QuantityMax ? BigNumber(spawnerJsonData.QuantityMax).toString() : '',
      allowDuplicatesValue: spawnerJsonData.AllowDuplicates ? `${spawnerJsonData.AllowDuplicates}` : '',
      shouldFilterItemsByZoneValue: spawnerJsonData.ShouldFilterItemsByZone ? `${spawnerJsonData.ShouldFilterItemsByZone}` : '',
      initialDamageValue: spawnerJsonData.InitialDamage ? BigNumber(spawnerJsonData.InitialDamage).toString() : '',
      randomDamageValue: spawnerJsonData.RandomDamage ? BigNumber(spawnerJsonData.RandomDamage).toString() : '',
      initialUsageValue: spawnerJsonData.InitialUsage ? BigNumber(spawnerJsonData.InitialUsage).toString() : '',
      randomUsageValue: spawnerJsonData.RandomUsage ? BigNumber(spawnerJsonData.RandomUsage).toString() : '',
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettingsFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string) => (newValue: SingleValue<Option | null>) => {
    setSettingsFormValues(prevValues => ({
      ...prevValues,
      [name]: newValue?.value || '',
    }));
  };

  const handlePostSpawnSelectMultiChange = (
    newValues: MultiValue<Option>,
  ) => {
    setPostSpawnActionValues([...newValues]);
  };

  const handleDownload = () => {
    const {
      probabilityValue,
      quantityMinValue,
      quantityMaxValue,
      initialUsageValue,
      initialDamageValue,
      randomDamageValue,
      randomUsageValue,
      allowDuplicatesValue,
      shouldFilterItemsByZoneValue
    } = settingsFormValues;
    const filteredFixedItems = fixedItemValues.map(item => item?.value).filter((value): value is string => value !== undefined);
    const items = itemValues
      .filter((item): item is { selectedItem: Option; selectedRarity: Option } => item.selectedItem !== null && item.selectedRarity !== null)
      .map((item) => {
        const Id = item.selectedItem.value;
        const RarityValue = item.selectedRarity.value as Rarity;
        return { Id, Rarity: RarityValue };
      })

    const data: Partial<Spawner> = {
      Probability: isNumberAndGreaterThanZero(probabilityValue)
        ? BigNumber(probabilityValue).toNumber()
        : undefined,
      QuantityMin: isNumberAndGreaterThanZero(quantityMinValue)
        ? BigNumber(quantityMinValue).toNumber()
        : undefined,
      QuantityMax: isNumberAndGreaterThanZero(quantityMaxValue)
        ? BigNumber(quantityMaxValue).toNumber()
        : undefined,
      AllowDuplicates: allowDuplicatesValue
        ? allowDuplicatesValue === 'true'
        : undefined,
      ShouldFilterItemsByZone: shouldFilterItemsByZoneValue
        ? shouldFilterItemsByZoneValue === 'true'
        : undefined,
      InitialDamage: initialDamageValue ? BigNumber(initialDamageValue).toNumber() : undefined,
      RandomDamage: randomDamageValue ? BigNumber(randomDamageValue).toNumber() : undefined,
      InitialUsage: initialUsageValue ? BigNumber(initialUsageValue).toNumber() : undefined,
      RandomUsage: randomUsageValue ? BigNumber(randomUsageValue).toNumber() : undefined,
      PostSpawnActions: postSpawnActionValues.length > 0 ? postSpawnActionValues.map(action => action.value) : undefined,
      Nodes: jsonData?.Nodes,
      FixedItems: filteredFixedItems.length > 0 ? filteredFixedItems : undefined,
      Items: items.length > 0 ? items : undefined,
      Subpresets: jsonData?.Subpresets,
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    setDataUrl(url);
  }

  const isDownloadDisabled = itemValues.some(item => item.selectedItem && !item.selectedRarity);

  const handleItemChange = (selectedOption: SingleValue<Option>, index: number) => {
    const newSelections = [...itemValues];
    newSelections[index].selectedItem = selectedOption;

    if (!selectedOption) {
      newSelections[index].selectedRarity = null;
    }

    setItemValues(newSelections);
  };

  const handleRarityChange = (selectedOption: SingleValue<Option>, index: number) => {
    const newSelections = [...itemValues];
    newSelections[index].selectedRarity = selectedOption;
    setItemValues(newSelections);
  };

  const handleAddNewItemRow = () => {
    setItemValues([...itemValues, { selectedItem: null, selectedRarity: null }]);
  }

  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Spawners</h1>
      <Alert children={'Here will be description of the spawners'}/>

      <span>
        <Select<Option, false, GroupBase<Option>>
          options={SPAWNER_OPTIONS}
          value={selectedSpawner}
          isSearchable={true}
          isClearable={true}
          styles={DROPDOWN_STYLES()}
          placeholder="Select spawner..."
          onChange={handleSpawnerChange}
        />
      </span>

      <span>
        {selectedSpawner &&
          <>
            <Tabs>
              <TabList>
                <Tab>Settings</Tab>
                <Tab>Items</Tab>
                <Tab>Fixed Items</Tab>
                <Tab>Nodes</Tab>
                <Tab>Subpresets</Tab>
              </TabList>

              <TabPanel>
                <div className={'form'}>
                  <div>
                    <label htmlFor="probability">Probability:</label>
                    <input type="text" id="probability" name="probabilityValue"
                           value={settingsFormValues.probabilityValue}
                           onChange={handleChange}/>
                    <IconInfo dataTooltipId={'probability-tooltip'}/>
                    <Tooltip id="probability-tooltip" className="tooltip" border="1px solid #343a40">
                      <ul>
                        <li>
                          "Probability": {settingsFormValues.probabilityValue || '15'}, indicates
                          a {settingsFormValues.probabilityValue || '15'}% drop rate
                          for the item,
                          which should be adjusted by
                          multiplying with the settings in your ServerSettings.ini and zone modifiers.
                        </li>
                        <li>If you desire a 100% drop chance, you can either remove the probability value or set it to
                          0.
                        </li>
                        <li>
                          If you set the probability to 100, the final drop chance won't be 100% because it still gets
                          adjusted by the ServerSettings.ini and zone modifiers.
                        </li>
                      </ul>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="quantity-min">Quantity Min:</label>
                    <input type="text" id="quantity-min" name="quantityMinValue"
                           value={settingsFormValues.quantityMinValue}
                           onChange={handleChange}/>
                  </div>
                  <div>
                    <label htmlFor="quantity-max">Quantity Max:</label>
                    <input type="text" id="quantity-max" name="quantityMaxValue"
                           value={settingsFormValues.quantityMaxValue}
                           onChange={handleChange}/>
                    <IconInfo dataTooltipId={'quantity-tooltip'}/>
                    <Tooltip id="quantity-tooltip" className="tooltip" border="1px solid #343a40">
                      <p>
                        If you set "QuantityMin" to 4 and "QuantityMax" to 9, the spawner will pick a number between 4
                        and 9 to determine how many items are dropped.
                      </p>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="allow-duplicates">Allow duplicates:</label>
                    <Select<Option, false, GroupBase<Option>>
                      options={BOOLEAN_OPTIONS}
                      value={settingsFormValues.allowDuplicatesValue ? {
                        value: settingsFormValues.allowDuplicatesValue,
                        label: settingsFormValues.allowDuplicatesValue
                      } : undefined}
                      isClearable={true}
                      isSearchable={false}
                      placeholder={"No value"}
                      className={'display-inline-block'}
                      styles={DROPDOWN_STYLES(false)}
                      name={'allowDuplicatesValue'}
                      onChange={handleSelectChange('allowDuplicatesValue')}
                    />
                    <IconInfo dataTooltipId={'allow-duplicates-tooltip'}/>
                    <Tooltip id="allow-duplicates-tooltip" className="tooltip" border="1px solid #343a40">
                      <ul>
                        <li>
                          "AllowDuplicates": false means you won't receive two of the same item. So, if the spawner
                          decides to drop 7 items but 3 are duplicates, you'll only receive 4 unique items.
                        </li>
                        <li>
                          "AllowDuplicates": true allows the spawner to spawn the same item multiple times.
                        </li>
                      </ul>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="should-filter-items-by-zone">Should filter items by zone:</label>
                    <Select<Option, false, GroupBase<Option>>
                      options={BOOLEAN_OPTIONS}
                      value={settingsFormValues.shouldFilterItemsByZoneValue ? {
                        value: settingsFormValues.shouldFilterItemsByZoneValue,
                        label: settingsFormValues.shouldFilterItemsByZoneValue
                      } : undefined}
                      isClearable={true}
                      isSearchable={false}
                      placeholder={"No value"}
                      className={'display-inline-block'}
                      name={'shouldFilterItemsByZoneValue'}
                      styles={DROPDOWN_STYLES(false)}
                      onChange={handleSelectChange('shouldFilterItemsByZoneValue')}
                    />
                    <IconInfo dataTooltipId={'should-filter-items-by-zone-tooltip'}/>
                    <Tooltip id="should-filter-items-by-zone-tooltip" className="tooltip" border="1px solid #343a40">
                      <ul>
                        <li>
                          This refers to the "Coastal," "Continental," and "Mountain" zone locations that are specified
                          in the Parameters.json file.
                        </li>
                        <li>
                          "ShouldFilterItemsByZone": true means that item spawning will be based on the zone
                          locations
                          set in the Parameters.json. If set to false, items can spawn in any location.
                        </li>
                      </ul>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="initial-damage">Initial damage:</label>
                    <input type="text" id="initial-damage" name="initialDamageValue"
                           value={settingsFormValues.initialDamageValue} onChange={handleChange}/>
                    <IconInfo dataTooltipId={'initial-damage-tooltip'}/>
                    <Tooltip id="initial-damage-tooltip" className="tooltip" border="1px solid #343a40">
                      <p>
                        "InitialDamage": 5 means that although the item spawns with 100% durability, the spawner
                        preset
                        will apply 5% durability damage to it. Therefore, you will receive the item at 95% durability.
                      </p>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="random-damage">Random damage:</label>
                    <input type="text" id="random-damage" name="randomDamageValue"
                           value={settingsFormValues.randomDamageValue}
                           onChange={handleChange}/>
                    <IconInfo dataTooltipId={'random-damage-tooltip'}/>
                    <Tooltip id="random-damage-tooltip" className="tooltip" border="1px solid #343a40">
                      <ul>
                        <li>"RandomDamage": 35 means the system will choose a random number between 0 and 35 and apply
                          that percentage as damage to the item's maximum durability.
                        </li>
                        <li>
                          In this case, with "InitialDamage": 5 and "RandomDamage": 35 having selected 25, the item will
                          spawn with 70% durability. This is calculated by subtracting the initial damage (5%) and the
                          random damage (25%) from 100%, resulting in 70% (100 - 5 - 25 = 70).
                        </li>
                      </ul>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="initial-usage">Initial usage:</label>
                    <input type="text" id="initial-usage" name="initialUsageValue"
                           value={settingsFormValues.initialUsageValue}
                           onChange={handleChange}/>
                    <IconInfo dataTooltipId={'initial-usage-tooltip'}/>
                    <Tooltip id="initial-usage-tooltip" className="tooltip" border="1px solid #343a40">
                      <p>
                        "InitialUsage": 5 means that 5% of the maximum uses of an item are removed. If the item has 20
                        uses, it will remove 1 use.
                      </p>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="random-usage">Random usage:</label>
                    <input type="text" id="random-usage" name="randomUsageValue"
                           value={settingsFormValues.randomUsageValue}
                           onChange={handleChange}/>
                    <IconInfo dataTooltipId={'random-usage-tooltip'}/>
                    <Tooltip id="random-usage-tooltip" className="tooltip" border="1px solid #343a40">
                      <ul>
                        <li>"RandomUsage": 35 means the system will select a random number between 0 and 35 and apply
                          that percentage as damage to the item's maximum uses.
                        </li>
                        <li>In this scenario, with "InitialUsage": 5 and "RandomUsage": 35 having selected 15, our item
                          will spawn with 16 out of 20 uses. This is calculated by first removing 5% of the maximum uses
                          (which is 1 use from 20), and then removing an additional 15% of the maximum uses (which is 3
                          uses from 20), resulting in 16 uses remaining (20 - 1 - 3 = 16).
                        </li>
                      </ul>
                    </Tooltip>
                  </div>
                  <div>
                    <label htmlFor="post-spawn-actions">Post spawn actions:</label>
                    <Select<Option, true, GroupBase<Option>>
                      options={POST_SPAWN_ACTIONS_OPTIONS}
                      value={postSpawnActionValues}
                      isMulti={true}
                      isClearable={true}
                      isSearchable={true}
                      placeholder={"No value"}
                      styles={DROPDOWN_STYLES<true>(true)}
                      onChange={handlePostSpawnSelectMultiChange}
                    />
                    <IconInfo dataTooltipId={'post-spawn-actions-tooltip'}/>
                    <Tooltip id="post-spawn-actions-tooltip" className="tooltip" border="1px solid #343a40">
                      <ul>
                        <li>AB Keycard - if the item is a keycard, assign that it can open the closest bunker.</li>
                        <li>Ammo Big Stash - if the item is ammo, sets the ammo count to 50-100% capacity of the caliber
                          (example: cal_22 maximum number is 20, it will be 10-20/20).
                        </li>
                        <li>Ammo Small Stash - if the item is ammo, sets the ammo count to 0-35% capacity of the caliber
                          (example: cal_22 maximum number is 20, it will be 0-7/20).
                        </li>
                        <li>Cash 200-500 - If the item is Cash, sets it's value to 200-500.</li>
                        <li>Cash 50-200 - If the item is Cash, sets it's value to 50-200.</li>
                        <li>Cash 1-100 - If the item is Cash, sets it's value to 1-100.</li>
                        <li>Clothes Dirtiness 93%-96% - if the item is clothes, sets the dirtiness to 93-96%.</li>
                        <li>Clothes Dirtiness 60%-85% - if the item is clothes, sets the dirtiness to 60-85%.</li>
                        <li>Clothes Dirtiness 0%-20% - if the item is clothes, sets the dirtiness to 0-20%.</li>
                        <li>0 Uses - All items with uses will spawn with 0 uses.</li>
                        <li>KB Keycard Cargo - TBA.</li>
                        <li>KB Keycard Police - TBA.</li>
                        <li>KB Keycard Radiation - TBA.</li>
                        <li>KB Keycard Sentry - TBA.</li>
                      </ul>
                    </Tooltip>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                {itemValues.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <Select<Option, false, GroupBase<Option>>
                        options={ITEMS_OPTIONS}
                        value={item.selectedItem}
                        onChange={(option) => handleItemChange(option, index)}
                        isClearable={true}
                        isSearchable={true}
                        placeholder={"Select item"}
                        styles={DROPDOWN_STYLES(false)}
                      />
                      <Select<Option, false, GroupBase<Option>>
                        options={RARITY_OPTIONS}
                        value={item.selectedRarity}
                        onChange={(option) => handleRarityChange(option, index)}
                        isSearchable={true}
                        isClearable={true}
                        placeholder={"Select rarity"}
                        styles={DROPDOWN_STYLES(false)}
                        isDisabled={!item.selectedItem}
                      />
                      <br/>
                    </div>
                ))}
                <button onClick={handleAddNewItemRow} style={{ padding: '8px 16px' }}>Add Row</button>
              </TabPanel>
              <TabPanel>
                <label htmlFor="fixed-items">Fixed items</label>
                {fixedItemValues && fixedItemValues.map((item, index) => (
                  <div key={index}> {/* Ensure each select has a unique key */}
                    <Select<Option, false, GroupBase<Option>>
                      options={ITEMS_OPTIONS}
                      value={item}
                      onChange={(value) => handleFixedItemsChange(value, index)}
                      isClearable={true}
                      isSearchable={true}
                      placeholder={"No value"}
                      styles={DROPDOWN_STYLES(true)}
                    />
                  </div>
                ))}
                <div>
                  <button onClick={addFixedItemSelect} style={{ padding: '8px 16px' }}>Add Fixed Item</button>
                </div>
              </TabPanel>
              <TabPanel>
                <Alert children={'Here will be a form for adding pre-made nodes'}/>

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
                <div>
                  <Alert children={'Here will be a form for adding subpresets'}/>
                  {jsonData && jsonData.Subpresets && jsonData.Subpresets.map((subpreset) => (
                    <p key={subpreset.Id}>Id: {subpreset.Id} - Rarity: {subpreset.Rarity}</p>
                  ))}
                </div>
              </TabPanel>
            </Tabs>
            <a href={dataUrl} download={selectedSpawner.value} onClick={handleDownload}
               className={`button text-weight-800 ${isDownloadDisabled ? 'disabled-link' : ''}`}
               style={{ marginTop: 32, display: "block" }}>Download</a>
          </>
        }
      </span>
    </main>
  );
}
