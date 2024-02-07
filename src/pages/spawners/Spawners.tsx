import Select, { StylesConfig } from "react-select";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export function Spawners() {

  const options = [
    { value: 'Landscape-Examine_GroundRocks.json', label: 'Landscape-Examine_GroundRocks.json' },
    {
      value: 'Buildings-Store-Hunting_Store-Examine_CashRegister.json',
      label: 'Buildings-Store-Hunting_Store-Examine_CashRegister.json'
    },
    { value: 'Buildings-Livingroom-Examine_Vine_Cabinet.json', label: 'Buildings-Livingroom-Examine_Vine_Cabinet.json' }
  ]

  const styles: StylesConfig = {
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
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#272727',
    }),
    input: (provided) => ({
      ...provided,
      color: '#9F9B93',
    }),
  }


  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Spawners</h1>
      <p>Buildings-Store-Hunting_Store-Examine_CashRegister.json</p>

      <span>
        <Select options={options} isSearchable={true} styles={styles} placeholder="Select spawner..."/>
      </span>

      <span>
        <Tabs>
          <TabList>
            <Tab>Items</Tab>
            <Tab>Fixed Items</Tab>
            <Tab>Nodes</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanel>
            <p>here will be a form for adding items and probability</p>
          </TabPanel>
          <TabPanel>
            <p>here will be a form for adding fixed items</p>
          </TabPanel>
          <TabPanel>
            <p>here will be a form for adding pre-made nodes</p>
          </TabPanel>
          <TabPanel>
            <div>
              <label htmlFor="quantity-min">Quantity Min:</label>
              <input type="text" id="quantity-min" name="apple"/>
            </div>
            <div>
              <label htmlFor="quantity-max">Quantity Max:</label>
              <input type="text" id="quantity-max" name="apple"/>
            </div>
            <div>
              <label htmlFor="allow-duplicates">Allow duplicates:</label>
              <input type="text" id="allow-duplicates" name="apple"/>
            </div>
            <div>
              <label htmlFor="should-filter-items-by-zone">Should filter items by zone:</label>
              <input type="text" id="should-filter-items-by-zone" name="apple"/>
            </div>
            <div>
              <label htmlFor="initial-damage">Initial damage:</label>
              <input type="text" id="initial-damage" name="apple"/>
            </div>
            <div>
              <label htmlFor="random-damage">Random damage:</label>
              <input type="text" id="random-damage" name="apple"/>
            </div>
            <div>
              <label htmlFor="initial-usage">Initial usage:</label>
              <input type="text" id="initial-usage" name="apple"/>
            </div>
            <div>
              <label htmlFor="random-usage">Random usage:</label>
              <input type="text" id="random-usage" name="apple"/>
            </div>
          </TabPanel>
        </Tabs>
      </span>
    </main>
  );
}
