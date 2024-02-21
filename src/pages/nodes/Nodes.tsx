import Select, { GroupBase, SingleValue, StylesConfig } from "react-select";
import { Option } from "../spawners/Spawners.types.ts";
import { useState } from "react";
import { NODES_OPTIONS } from "../../data/nodes-options.ts";
import { config } from "../../config.ts";
import { Node } from "./Nodes.types.ts";

export function Nodes() {
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
  const [jsonData, setJsonData] = useState<Node | null>(null);

  const readFile = async (option: Option): Promise<Node> => {
    try {
      const url = `${config.DATA_PATH}/nodes/${option.value}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch the node: ${option.value}`);
      }

      const jsonData = await response.json();

      return jsonData as Node;
    } catch (error) {
      throw new Error(`Could not fetch the node: ${option.value}`);
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

      <h1 className='site-title'>Nodes</h1>
      <div className="alert" role="alert">
        Here will be description of nodes
      </div>

      <span>
        <Select<Option, false, GroupBase<Option>>
          options={NODES_OPTIONS}
          value={selectedOption}
          isSearchable={true}
          isClearable={true}
          styles={styles}
          placeholder="Select node..."
          onChange={handleChange}
        />
      </span>

      <div>
        <pre>
            {jsonData && JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>

    </main>
  );
}
