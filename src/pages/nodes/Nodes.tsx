import Select, { GroupBase, SingleValue } from "react-select";
import { Option } from "../spawners/Spawners.types.ts";
import { useState } from "react";
import { NODES_OPTIONS } from "../../data/nodes-options.ts";
import { Node } from "./Nodes.types.ts";
import { DROPDOWN_STYLES } from "../../components/dropdown/Dropdown.styles.ts";
import { FILE_TYPE, readFile } from "../../utils/read-file.ts";

export function Nodes() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [jsonData, setJsonData] = useState<Node | null>(null);

  const handleChange = async (newValue: SingleValue<Option | null>): Promise<void> => {
    setSelectedOption(newValue);

    if (newValue) {
      const data = await readFile<Node>(newValue, FILE_TYPE.Nodes);
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
          styles={DROPDOWN_STYLES}
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
