import { Option } from "../pages/spawners/Spawners.types.ts";
import { config } from "../config.ts";

export enum FILE_TYPE {
  Nodes = 'nodes',
  Spawners = 'spawners',
  Parameters = 'parameters',
}

const singleFileType: Record<FILE_TYPE, string> = {
  [FILE_TYPE.Nodes]: 'node',
  [FILE_TYPE.Spawners]: 'spawner',
  [FILE_TYPE.Parameters]: 'parameters',
}

export async function readFile<T>(option: Option, fileType: FILE_TYPE): Promise<T> {
  try {
    const url = `${config.DATA_PATH}/${fileType}/${option.value}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch the ${singleFileType[fileType]}: ${option.value}`);
    }

    const jsonData = await response.json();

    return jsonData as T;
  } catch (error) {
    throw new Error(`Could not fetch the ${singleFileType[fileType]}: ${option.value}`);
  }
}
