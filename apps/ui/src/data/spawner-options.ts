import { Option } from "../pages/spawners/Spawners.types.ts";
import { spawnerFiles } from "virtual:file-list";

function filenameToLabel(filename: string): string {
  return filename.replace(/-/g, ' ').replace(/_/g, ' ').replace('.json', '');
}

export const SPAWNER_OPTIONS: Option[] = spawnerFiles
  .map((filename) => ({
    value: filename,
    label: filenameToLabel(filename),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
