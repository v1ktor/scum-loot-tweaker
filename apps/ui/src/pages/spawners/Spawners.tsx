import {AlertCircleIcon} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert.tsx';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.tsx';
import {useState} from 'react';
import {SPAWNER_OPTIONS} from '@/data/spawner-options.ts';
import {FILE_TYPE, readFile} from '@/utils/read-file.ts';
import {Spawner} from '@/pages/spawners/Spawners.types.ts';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox.tsx';
import {Button} from '@/components/ui/button.tsx';
import {SettingsTab} from '@/pages/spawners/tabs/settings-tab.tsx';
import {ItemsTab} from '@/pages/spawners/tabs/items-tab.tsx';
import {FixedItemsTab} from '@/pages/spawners/tabs/fixed-items-tab.tsx';
import {NodesTab} from '@/pages/spawners/tabs/nodes-tab.tsx';
import {SubpresetsTab} from '@/pages/spawners/tabs/subpresets-tab.tsx';
import {Badge} from '@/components/ui/badge.tsx';

export function Spawners() {
  const [spawner, setSpawner] = useState<Spawner>({});
  const [fileName, setFileName] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const handleChange = async (args: {value: string, label: string}) => {
    let data: Spawner;

    try {
      data = await readFile<Spawner>({value: args.value, label: args.label}, FILE_TYPE.Spawners);
      setFileName(args.value);
    } catch (error) {
      throw new Error(`${error}`);
    }

    setSpawner(data);
  }

  const handleDownload = () => {
    const json = JSON.stringify(spawner, null, 2);
    const blob = new Blob([json], {type: 'application/json'});

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    setDownloadUrl(URL.createObjectURL(blob));
  }

  const calculateNumberOfSettings = (data: Spawner) => {
    const excludedKeys: (keyof Spawner)[] = ['Items', 'Subpresets', 'FixedItems', 'Nodes'];
    const settingsKeys = Object.keys(data).filter(
      (key) => !excludedKeys.includes(key as keyof Spawner)
    );

    return settingsKeys.length;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-10">
      <div className="bg-muted/50 mx-auto w-full max-w-6xl rounded-xl text-base p-8">
        <h1 className="scroll-m-20 flex items-center gap-x-4 text-4xl font-extrabold tracking-tight text-balance">
          Spawners
        </h1>

        <div className="grid w-full items-start gap-4 py-6">
          <Alert>
            <AlertCircleIcon/>
            <AlertTitle>Do not rename the files, as the name is used to reference the spawner in the game!</AlertTitle>
            <AlertCircleIcon/>
            <AlertTitle>Place downloaded files in the following directories:</AlertTitle>
            <AlertDescription>
              <ul>
                <li className="py-1">Single-Player: <code
                  className="bg-muted/70 font-mono px-1 py-0.5 rounded">%LocalAppData%\SCUM\Saved\Config\WindowsNoEditor\Loot\Spawners\Presets\Override\</code>
                </li>
                <li>Multiplayer: <code
                  className="bg-muted/70 font-mono px-1 py-0.5 rounded">%Server%\SCUM\Saved\Config\WindowsServer\Loot\Spawners\Presets\Override\</code>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        <div className="my-4">
          <Combobox
            items={SPAWNER_OPTIONS}
            itemToStringValue={(item: {label: string; value: string}) => item.label}
            onValueChange={(next) => {
              if (!next) {
                setSpawner({});
                setFileName('');
                setDownloadUrl('');
                return;
              }

              const selected = SPAWNER_OPTIONS.find((x) => x.value === next.value);
              if (selected) {
                void handleChange(selected);
              }
            }}
            autoHighlight={true}
          >
            <ComboboxInput placeholder="Select a spawner" showClear={true}/>
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(spawner: {label: string; value: string}) => (
                  <ComboboxItem key={spawner.value} value={spawner}>
                    {spawner.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <Tabs defaultValue="settings">
          <TabsList>
            <TabsTrigger value="settings">Settings<Badge variant='secondary'>{calculateNumberOfSettings(spawner)}</Badge></TabsTrigger>
            <TabsTrigger value="items">Items <Badge variant='secondary'>{spawner.Items?.length ?? 0}</Badge></TabsTrigger>
            <TabsTrigger value="fixed-items">Fixed Items<Badge variant='secondary'>{spawner.FixedItems?.length ?? 0}</Badge></TabsTrigger>
            <TabsTrigger value="nodes">Nodes <Badge variant='secondary'>{spawner.Nodes?.length ?? 0}</Badge></TabsTrigger>
            <TabsTrigger value="subpresets">Subpresets <Badge variant='secondary'>{spawner.Subpresets?.length ?? 0}</Badge></TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-0">
            <SettingsTab spawner={spawner} setSpawner={setSpawner}/>
          </TabsContent>
          <TabsContent value="items" className="mt-0">
            <ItemsTab key={fileName} spawner={spawner} setSpawner={setSpawner}/>
          </TabsContent>
          <TabsContent value="fixed-items" className="mt-0">
            <FixedItemsTab key={fileName} spawner={spawner} setSpawner={setSpawner}/>
          </TabsContent>
          <TabsContent value="nodes" className="mt-0">
            <NodesTab spawner={spawner} setSpawner={setSpawner}/>
          </TabsContent>
          <TabsContent value="subpresets" className="mt-0">
            <SubpresetsTab spawner={spawner} setSpawner={setSpawner}/>
          </TabsContent>
        </Tabs>
        <div className="flex flex-wrap items-center gap-2 md:flex-row pt-8">
          {fileName ? (
            <Button variant="outline" className="w-full" asChild onClick={handleDownload}>
              <a href={downloadUrl} download={fileName}>Download</a>
            </Button>
          ) : (
            <Button variant="outline" className="w-full" disabled>Download</Button>
          )}
        </div>
      </div>
    </div>
  );
}
