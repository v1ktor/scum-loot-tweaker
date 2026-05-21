import fs from 'node:fs';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import type {GetSpawner} from '../../../../api/models/spawners/index.ts';
import {appRouter} from '../../../../api/procedures/router.ts';
import {createCallerFactory} from '../../../../connections/trpc/trpc.ts';

vi.mock('node:fs');

const createCaller = createCallerFactory(appRouter);
const caller = createCaller({});

const FILENAME = 'test_spawner.json';

const validSpawner: GetSpawner = {
  Probability: 10,
  QuantityMin: 1,
  QuantityMax: 3,
  Nodes: [{Rarity: 'Uncommon', Ids: ['ItemLootTreeNodes.Airfield.Misc']}],
};

describe('spawners.get', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('throws NOT_FOUND when spawners directory does not exist', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    await expect(caller.spawners.get(FILENAME)).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('throws NOT_FOUND when file does not exist', async () => {
    vi.mocked(fs.existsSync)
      .mockReturnValueOnce(true)   // spawnersDir exists
      .mockReturnValueOnce(false); // file does not exist

    await expect(caller.spawners.get(FILENAME)).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('throws NOT_FOUND with the filename in the message', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    await expect(caller.spawners.get(FILENAME)).rejects.toThrow(FILENAME);
  });

  it('returns parsed spawner when file exists', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockImplementation(() => JSON.stringify(validSpawner));

    const result = await caller.spawners.get(FILENAME);

    expect(result).toEqual(validSpawner);
  });

  it('throws on invalid JSON content', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockImplementation(() => 'not valid json');

    await expect(caller.spawners.get(FILENAME)).rejects.toThrow();
  });
});
