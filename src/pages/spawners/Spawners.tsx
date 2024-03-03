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
import { POST_SPAWN_ACTIONS_OPTIONS } from "../../data/post-spawn-actions-options.ts";
import { ITEMS_OPTIONS } from "../../data/items-options.ts";
import { RARITY_OPTIONS } from "../../data/rarity-options.ts";
import { Rarity } from "../../app/rarity.ts";
import { ProbabilityTooltip } from "./tooltips/ProbabilityTooltip.tsx";
import { QuantityTooltip } from "./tooltips/QuantityTooltip.tsx";
import { AllowDuplicatesTooltip } from "./tooltips/AllowDuplicatesTooltip.tsx";
import { ShouldFilterItemsByZoneTooltip } from "./tooltips/ShouldFilterItemsByZoneTooltip.tsx";
import { InitialDamageTooltip } from "./tooltips/InitialDamageTooltip.tsx";
import { RandomDamageTooltip } from "./tooltips/RandomDamageTooltip.tsx";
import { InitialUsageTooltip } from "./tooltips/InitialUsageTooltip.tsx";
import { PostSpawnActionsTooltip } from "./tooltips/PostSpawnActionsTooltip.tsx";
import { RandomUsageTooltip } from "./tooltips/RandomUsageTooltip.tsx";

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
      const foundRarity = rarityDb.find((rarity) => rarity.value === item.Rarity) || {
        value: item.Rarity,
        label: item.Rarity
      };

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
      .filter((item): item is {
        selectedItem: Option;
        selectedRarity: Option
      } => item.selectedItem !== null && item.selectedRarity !== null)
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
      <Alert>
        <p>
          Place downloaded files in the following directories:<br/>
          Single Player: %LocalAppData%\SCUM\Saved\Config\WindowsNoEditor\Loot\Spawners\Presets\Override\<br/>
          Multiplayer: %Server%\SCUM\Saved\Config\WindowsServer\Loot\Spawners\Presets\Override\
          <br/>
          <br/>
          Do not rename the files, as the name is used to reference the spawner in the game!
        </p>
      </Alert>

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
                <div className="spawner-settings-form">

                  <div className="probability-label">
                    <label htmlFor="probability">Probability:</label>
                  </div>
                  <div className="probability-input">
                    <input type="text"
                           id="probability"
                           name="probabilityValue"
                           value={settingsFormValues.probabilityValue}
                           onChange={handleChange}/>
                  </div>
                  <div className="probability-tooltip">
                    <ProbabilityTooltip
                      probabilityValue={settingsFormValues.probabilityValue}/>
                  </div>

                  <div className="quantity-min-label">
                    <label htmlFor="quantity-min">Quantity Min:</label>
                  </div>
                  <div className="quantity-min-input">
                    <input
                      type="text"
                      id="quantity-min"
                      name="quantityMinValue"
                      value={settingsFormValues.quantityMinValue}
                      onChange={handleChange}/>
                  </div>

                  <div className="quantity-max-label">
                    <label htmlFor="quantity-max">Quantity Max:</label>
                  </div>
                  <div className="quantity-max-input">
                    <input
                      type="text"
                      id="quantity-max"
                      name="quantityMaxValue"
                      value={settingsFormValues.quantityMaxValue}
                      onChange={handleChange}/>
                  </div>
                  <div className="quantity-max-tooltip">
                    <QuantityTooltip/>
                  </div>

                  <div className="allow-duplicates-label">
                    <label htmlFor="allow-duplicates">Allow duplicates:</label>
                  </div>
                  <div className="allow-duplicates-input">
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
                  </div>
                  <div className="allow-duplicates-tooltip">
                    <AllowDuplicatesTooltip/>
                  </div>

                  <div className="should-filter-items-by-zone-label">
                    <label htmlFor="should-filter-items-by-zone">Should filter items by zone:</label>
                  </div>
                  <div className="should-filter-items-by-zone-input">
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
                  </div>
                  <div className="should-filter-items-by-zone-tooltip">
                    <ShouldFilterItemsByZoneTooltip/>
                  </div>

                  <div className="initial-damage-label">
                    <label htmlFor="initial-damage">Initial damage:</label>
                  </div>
                  <div className="initial-damage-input">
                    <input
                      type="text"
                      id="initial-damage"
                      name="initialDamageValue"
                      value={settingsFormValues.initialDamageValue}
                      onChange={handleChange}/>
                  </div>
                  <div className="initial-damage-tooltip">
                    <InitialDamageTooltip/>
                  </div>

                  <div className="random-damage-label">
                    <label htmlFor="random-damage">Random damage:</label>
                  </div>
                  <div className="random-damage-input">
                    <input
                      type="text"
                      id="random-damage"
                      name="randomDamageValue"
                      value={settingsFormValues.randomDamageValue}
                      onChange={handleChange}/>
                  </div>
                  <div className="random-damage-tooltip">
                    <RandomDamageTooltip/>
                  </div>

                  <div className="initial-usage-label">
                    <label htmlFor="initial-usage">Initial usage:</label>
                  </div>
                  <div className="initial-usage-input">
                    <input
                      type="text"
                      id="initial-usage"
                      name="initialUsageValue"
                      value={settingsFormValues.initialUsageValue}
                      onChange={handleChange}/>
                  </div>
                  <div className="initial-usage-tooltip">
                    <InitialUsageTooltip/>
                  </div>

                  <div className="random-usage-label">
                    <label htmlFor="random-usage">Random usage:</label>
                  </div>
                  <div className="random-usage-input">
                    <input
                      type="text"
                      id="random-usage"
                      name="randomUsageValue"
                      value={settingsFormValues.randomUsageValue}
                      onChange={handleChange}/>
                  </div>
                  <div className="random-usage-tooltip">
                    <RandomUsageTooltip/>
                  </div>

                  <div className="post-spawn-actions-label">
                    <label htmlFor="post-spawn-actions">Post spawn actions:</label>
                  </div>
                  <div className="post-spawn-actions-input">
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
                  </div>
                  <div className="post-span-actions-tooltip">
                    <PostSpawnActionsTooltip/>
                  </div>

                  <div className="spawner-image">
                    <img
                      src="https://placehold.co/400x400?text=Spawner+Image+\nComing+Later"
                      alt="spawner image placeholder"/>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                {itemValues.map((item, index) => (
                  <div key={index} className="spawner-items-form">
                    <div className="spawner-items-item-name-input">
                      <Select<Option, false, GroupBase<Option>>
                        options={ITEMS_OPTIONS}
                        value={item.selectedItem}
                        onChange={(option) => handleItemChange(option, index)}
                        isClearable={true}
                        isSearchable={true}
                        placeholder={"Select item"}
                        styles={DROPDOWN_STYLES(false)}
                      />
                    </div>
                    <div className="spawner-items-item-rarity-input">
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
                    </div>
                    <div className="spawner-items-delete-row"></div>
                    <br/>
                  </div>
                ))}
                <button onClick={handleAddNewItemRow} className="button text-weight-800">Add Item</button>
              </TabPanel>
              <TabPanel>
                {fixedItemValues && fixedItemValues.map((item, index) => (
                  <div key={index} className="spawner-fixed-items-form">
                    <div className="spawner-fixed-items-item-name-input">
                      <Select<Option, false, GroupBase<Option>>
                        options={ITEMS_OPTIONS}
                        value={item}
                        onChange={(value) => handleFixedItemsChange(value, index)}
                        isClearable={true}
                        isSearchable={true}
                        placeholder={"No value"}
                        styles={DROPDOWN_STYLES(false)}
                      />
                    </div>
                    <div className="spawner-fixed-items-delete-row"></div>
                  </div>
                ))}
                <div>
                  <button onClick={addFixedItemSelect} className="button text-weight-800">Add Fixed Item</button>
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
               style={{ marginTop: 48, display: "block" }}>Download</a>
          </>
        }
      </span>
    </main>
  );
}
