import { Option } from "../pages/spawners/Spawners.types.ts";
import { nodeFiles } from "virtual:file-list";

export const NODES_OPTIONS: Option[] = nodeFiles
  .map((filename) => ({
    value: filename,
    label: filename.replace('.json', ''),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
