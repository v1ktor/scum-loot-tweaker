import Select, { GroupBase, MultiValue, SingleValue } from "react-select";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import React, { useEffect, useState } from "react";
import { Option, Spawner } from "./Spawners.types.ts";
import { SPAWNER_OPTIONS } from "../../data/spawner-options.ts";
import { DROPDOWN_STYLES } from "../../components/dropdown/Dropdown.styles.ts";
import { FILE_TYPE, readFile } from "../../utils/read-file.ts";
import { Alert } from "../../components/alert/Alert.tsx";
import { AMMO } from "../../app/items/ammo.ts";
import BigNumber from "bignumber.js";
import { isNumberAndGreaterThanZero } from "../../utils/validate-spawner.ts";
import { BOOLEAN_OPTIONS } from "../../data/boolean-options.ts";
import { Tooltip } from "react-tooltip";
import { IconInfo } from "../../components/icon-info/IconInfo.tsx";
import { POST_SPAWN_ACTIONS_OPTIONS } from "../../data/post-spawn-actions-options.ts";

export function Spawners() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [jsonData, setJsonData] = useState<Spawner | null>(null);
  const [dataUrl, setDataUrl] = useState('');

  const [probabilityValue, setProbabilityValue] = useState<string | undefined>('');
  const [quantityMinValue, setQuantityMinValue] = useState<string | undefined>('');
  const [quantityMaxValue, setQuantityMaxValue] = useState<string | undefined>('');
  const [allowDuplicatesValue, setAllowDuplicatesValue] = useState<string | undefined>('');
  const [shouldFilterItemsByZoneValue, setShouldFilterItemsByZoneValue] = useState<string | undefined>('');
  const [initialDamageValue, setInitialDamageValue] = useState<string | undefined>('');
  const [randomDamageValue, setRandomDamageValue] = useState<string | undefined>('');
  const [initialUsageValue, setInitialUsageValue] = useState<string | undefined>('');
  const [randomUsageValue, setRandomUsageValue] = useState<string | undefined>('');
  const [postSpawnActionsValue, setPostSpawnActionsValue] = useState<Option[]>([]);

  useEffect(() => {
    const postSpawnActions = jsonData?.PostSpawnActions;

    if (postSpawnActions) {
      const combinedOptions = postSpawnActions.map((action) => {
        const existingOption = POST_SPAWN_ACTIONS_OPTIONS.find((option) => option.value === action);

        if (existingOption) {
          return existingOption;
        }

        return { value: action, label: action };
      })

      setPostSpawnActionsValue(combinedOptions);
    }
  }, [jsonData?.PostSpawnActions]);

  const handleChange = async (newValue: SingleValue<Option | null>): Promise<void> => {
    setSelectedOption(newValue);

    if (newValue) {
      const data = await readFile<Spawner>(newValue, FILE_TYPE.Spawners);
      if (data) {
        const probability = data.Probability ? BigNumber(data.Probability).toString() : '';
        const quantityMin = data.QuantityMin ? BigNumber(data.QuantityMin).toString() : '';
        const quantityMax = data.QuantityMax ? BigNumber(data.QuantityMax).toString() : '';
        const allowDuplicates = `${data.AllowDuplicates}` === 'true' || `${data.AllowDuplicates}` === 'false' ? `${data.AllowDuplicates}` : '';
        const shouldFilterItemsByZone = `${data.ShouldFilterItemsByZone}` === 'true' || `${data.ShouldFilterItemsByZone}` === 'false' ? `${data.ShouldFilterItemsByZone}` : '';
        const initialDamage = BigNumber(data.InitialDamage).toString();
        const randomDamage = BigNumber(data.RandomDamage).toString();
        const initialUsage = BigNumber(data.InitialUsage).toString();
        const randomUsage = BigNumber(data.RandomUsage).toString();

        setJsonData(data);
        setProbabilityValue(probability);
        setQuantityMinValue(quantityMin);
        setQuantityMaxValue(quantityMax);
        setAllowDuplicatesValue(allowDuplicates);
        setShouldFilterItemsByZoneValue(shouldFilterItemsByZone);
        setInitialDamageValue(initialDamage);
        setRandomDamageValue(randomDamage);
        setInitialUsageValue(initialUsage);
        setRandomUsageValue(randomUsage);
      }
    }
  }

  const handleAllowDuplicatesChange = (newValue: SingleValue<Option | null>): void => {
    setAllowDuplicatesValue(newValue?.value);
  }
  const handleShouldFilterItemsByZoneChange = (newValue: SingleValue<Option | null>): void => {
    setShouldFilterItemsByZoneValue(newValue?.value);
  }

  const handleDownload = () => {
    const probability = probabilityValue && isNumberAndGreaterThanZero(probabilityValue)
      ? { Probability: BigNumber(probabilityValue).toNumber() }
      : {}
    const quantityMin = quantityMinValue && isNumberAndGreaterThanZero(quantityMinValue)
      ? { QuantityMin: BigNumber(quantityMinValue).toNumber() }
      : {}
    const quantityMax = quantityMaxValue && isNumberAndGreaterThanZero(quantityMaxValue)
      ? { QuantityMax: BigNumber(quantityMaxValue).toNumber() }
      : {}
    const allowDuplicates = allowDuplicatesValue
      ? { AllowDuplicates: allowDuplicatesValue === 'true' }
      : {}
    const shouldFilterItemsByZone = shouldFilterItemsByZoneValue
      ? { ShouldFilterItemsByZone: shouldFilterItemsByZoneValue === 'true' }
      : {}
    const initialDamage = initialDamageValue ? BigNumber(initialDamageValue).toNumber() : 0;
    const randomDamage = randomDamageValue ? BigNumber(randomDamageValue).toNumber() : 0;
    const initialUsage = initialUsageValue ? BigNumber(initialUsageValue).toNumber() : 0;
    const randomUsage = randomUsageValue ? BigNumber(randomUsageValue).toNumber() : 0;
    const postSpawnActions = postSpawnActionsValue.map((action) => action.value).length > 0 ? { PostSpawnActions: postSpawnActionsValue.map((action) => action.value) } : {};

    const data: Spawner = {
      ...probability,
      ...quantityMin,
      ...quantityMax,
      ...allowDuplicates,
      ...shouldFilterItemsByZone,
      InitialDamage: initialDamage,
      RandomDamage: randomDamage,
      InitialUsage: initialUsage,
      RandomUsage: randomUsage,
      ...postSpawnActions,
    }

    console.log(data);

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    setDataUrl(url);
  }

  const handleProbabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProbabilityValue(event.target.value);
  }
  const handleQuantityMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityMinValue(event.target.value);
  }
  const handleQuantityMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityMaxValue(event.target.value);
  }
  const handleInitialDamageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialDamageValue(event.target.value);
  }
  const handleRandomDamageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRandomDamageValue(event.target.value);
  }
  const handleInitialUsageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialUsageValue(event.target.value);
  }
  const handleRandomUsageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRandomUsageValue(event.target.value);
  }
  const handlePostSpawnActionsChange = (
    newValue: MultiValue<Option>,
  ) => {
    setPostSpawnActionsValue(newValue != null ? [...newValue] : []);
  };

  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Spawners</h1>
      <Alert children={'Here will be description of the spawners'}/>

      <span>
        <Select<Option, false, GroupBase<Option>>
          options={SPAWNER_OPTIONS}
          value={selectedOption}
          isSearchable={true}
          isClearable={true}
          styles={DROPDOWN_STYLES()}
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
                <Alert children={'Here will be a form for adding items and probability'}/>

                {jsonData && jsonData.Items && jsonData.Items.map((item) => (
                  <p key={item.Id}>Id: {item.Id} - Rarity: {item.Rarity}</p>
                ))}
              </TabPanel>
              <TabPanel>
                <Alert children={'Here will be a form for adding fixed items'}/>

                {jsonData && jsonData.FixedItems && jsonData.FixedItems.map((item) => (
                  <p key={item}>{AMMO.get(item)?.name || item}</p>
                ))}
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
                <div className={'form'}>
                  <div>
                    <label htmlFor="probability">Probability:</label>
                    <input type="text" id="probability" name="probability" value={probabilityValue}
                           onChange={handleProbabilityChange}/>
                    <IconInfo dataTooltipId={'probability-tooltip'}/>
                    <Tooltip id="probability-tooltip" className="tooltip" border="1px solid #343a40">
                      <ul>
                        <li>
                          "Probability": {probabilityValue || '15'}, indicates a {probabilityValue || '15'}% drop rate
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
                    <input type="text" id="quantity-min" name="quantity-min" value={quantityMinValue}
                           onChange={handleQuantityMinChange}/>
                  </div>
                  <div>
                    <label htmlFor="quantity-max">Quantity Max:</label>
                    <input type="text" id="quantity-max" name="quantity-max" value={quantityMaxValue}
                           onChange={handleQuantityMaxChange}/>
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
                      value={allowDuplicatesValue ? {
                        value: allowDuplicatesValue,
                        label: allowDuplicatesValue
                      } : undefined}
                      isClearable={true}
                      isSearchable={false}
                      placeholder={"No value"}
                      className={'display-inline-block'}
                      styles={DROPDOWN_STYLES(false)}
                      onChange={handleAllowDuplicatesChange}
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
                      value={shouldFilterItemsByZoneValue ? {
                        value: shouldFilterItemsByZoneValue,
                        label: shouldFilterItemsByZoneValue
                      } : undefined}
                      isClearable={true}
                      isSearchable={false}
                      placeholder={"No value"}
                      className={'display-inline-block'}
                      styles={DROPDOWN_STYLES(false)}
                      onChange={handleShouldFilterItemsByZoneChange}
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
                    <input type="text" id="initial-damage" name="initial-damage"
                           value={initialDamageValue} onChange={handleInitialDamageChange}/>
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
                    <input type="text" id="random-damage" name="random-damage" value={randomDamageValue}
                           onChange={handleRandomDamageChange}/>
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
                    <input type="text" id="initial-usage" name="initial-usage" value={initialUsageValue}
                           onChange={handleInitialUsageChange}/>
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
                    <input type="text" id="random-usage" name="random-usage" value={randomUsageValue}
                           onChange={handleRandomUsageChange}/>
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
                      value={postSpawnActionsValue}
                      isMulti={true}
                      isClearable={true}
                      isSearchable={true}
                      placeholder={"No value"}
                      styles={DROPDOWN_STYLES<true>(true)}
                      onChange={handlePostSpawnActionsChange}
                    />
                    <IconInfo dataTooltipId={'post-spawn-actions-tooltip'}/>
                    <Tooltip id="post-spawn-actions-tooltip" className="tooltip" border="1px solid #343a40">
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
                    {jsonData && jsonData.PostSpawnActions && jsonData.PostSpawnActions.map((action) => (
                      <p key={action}>{action}</p>
                    ))}
                  </div>
                </div>
              </TabPanel>
            </Tabs>
            <a href={dataUrl} download={selectedOption.value} onClick={handleDownload}
               className="button text-weight-800"
               style={{ marginTop: 32, display: "block" }}>Download</a>
          </>
        }
      </span>
    </main>
  );
}
