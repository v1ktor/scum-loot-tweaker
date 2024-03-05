import Select, { GroupBase, SingleValue } from "react-select";
import { Option } from "../spawners/Spawners.types.ts";
import { useState } from "react";
import { NODES_OPTIONS } from "../../data/nodes-options.ts";
import { Node } from "./Nodes.types.ts";
import { DROPDOWN_STYLES } from "../../components/dropdown/Dropdown.styles.ts";
import { FILE_TYPE, readFile } from "../../utils/read-file.ts";
import { Alert } from "../../components/alert/Alert.tsx";

export function Nodes() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [parsedNodes, setParsedNodes] = useState<Node[]>([]);

  const handleChange = async (newValue: SingleValue<Option | null>): Promise<void> => {
    setSelectedOption(newValue);

    if (newValue) {
      const data = await readFile<Node>(newValue, FILE_TYPE.Nodes);
      if (data) {
        setParsedNodes(parseNodes(data));
      }
    }
  }

  const parseNodes = (current: Node, parentPath = ''): Node[] => {
    const currentPath = parentPath ? `${parentPath}.${current.Name}` : current.Name;
    let nodes: Node[] = [];

    if (current.Children && current.Children.length > 0) {
      const itemNodes: Node[] = [];

      for (const child of current.Children) {
        if (child.Children && child.Children.length > 0) {
          nodes = nodes.concat(parseNodes(child, currentPath));
        } else {
          itemNodes.push(child);
        }
      }

      if (itemNodes.length > 0) {
        nodes.unshift({ Name: currentPath, Rarity: current.Rarity, Children: itemNodes });
      } else {
        nodes.unshift({ Name: currentPath, Rarity: current.Rarity });
      }
    }

    return nodes;
  }


  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Nodes</h1>
      <Alert children={'Here will be description of nodes'}/>

      <span>
        <Select<Option, false, GroupBase<Option>>
          options={NODES_OPTIONS}
          value={selectedOption}
          isSearchable={true}
          isClearable={true}
          styles={DROPDOWN_STYLES()}
          placeholder="Select node..."
          onChange={handleChange}
        />
      </span>

      <div>
        {selectedOption && parsedNodes && parsedNodes.map((node, index) => (
          <div key={index}>
            <div style={{
              color: '#9F9B93',
              fontSize: '14px',
              backgroundColor: '#141414',
              display: 'inline-block',
              padding: '2px 12px',
              borderRadius: '4px',
              marginBottom: '12px',
            }}>
              <strong>{node.Name}</strong> <span style={{ color: '#f9c666' }}>{node.Rarity}</span>
              {node.Children && node.Children.map((item, index) => (
                <div key={index}>{item.Name} <span style={{ color: '#f9c666' }}>{item.Rarity}</span></div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
