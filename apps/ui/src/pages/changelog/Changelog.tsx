import {Badge} from '@/components/ui/badge.tsx';
import {config} from '@/config.ts';

export function Changelog() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-10">
      <div className="bg-muted/50 mx-auto w-full max-w-4xl rounded-xl text-sm p-8">
        <h1 className="scroll-m-20 flex items-center gap-x-4 text-4xl font-extrabold tracking-tight text-balance">
          Changelog
          <Badge variant="outline">{config.APP_VERSION}</Badge>
        </h1>

        <h2 className="scroll-m-20 border-b pb-2 mt-6 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.1.3
          </span>
          <span className="text-sm text-muted-foreground">
            Mar 21, 2026
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Added the number of settings for selected spawner to the tabs</li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-6 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.1.2
          </span>
          <span className="text-sm text-muted-foreground">
            Mar 17, 2026
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Fixed Items tab improvements:
            <ul className="my-2 ml-6 list-disc [&>li]:mt-1">
              <li>Added ability to change items</li>
              <li>Added ability to add new items</li>
              <li>Added ability to delete items</li>
              <li>Added ability to mass delete selected items</li>
              <li>Added sorting by item name and rarity</li>
            </ul>
          </li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-6 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.1.1
          </span>
          <span className="text-sm text-muted-foreground">
            Mar 17, 2026
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Items tab improvements:
            <ul className="my-2 ml-6 list-disc [&>li]:mt-1">
              <li>Added ability to change items</li>
              <li>Added ability to change item rarity</li>
              <li>Added ability to add new items</li>
              <li>Added ability to delete items</li>
              <li>Added ability to mass delete selected items</li>
              <li>Added sorting by item name and rarity</li>
            </ul>
          </li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-6 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.1.0
          </span>
          <span className="text-sm text-muted-foreground">
            Mar 16, 2026
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Added spawners, nodes, parameters and cooldown groups from <code
            className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">1.2.11.106289</code> game
            version
          </li>
          <li>Implemented new design</li>
          <li>Temporary removed ability to view items and nodes in the spawner view</li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-6 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.0.7
          </span>
          <span className="text-sm text-muted-foreground">
            Aug 30, 2025
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Added spawners, nodes, parameters and cooldown groups from <code
            className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">1.0.2.1.97804</code> game
            version
          </li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-8 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.0.6
          </span>
          <span className="text-sm text-muted-foreground">
            Oct 01, 2024
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Most of the items can now be changed in the spawners</li>
          <li>Added spawners, nodes, parameters and cooldown groups from <code
            className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">0.9542.80211</code> game
            version
          </li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-8 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.0.5
          </span>
          <span className="text-sm text-muted-foreground">
            Mar 05, 2024
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>It's now possible to inspect in-game nodes. It will show the name of the node and its rarity. If the node
            contains items, they will also be displayed along with their rarities.
          </li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-8 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.0.4
          </span>
          <span className="text-sm text-muted-foreground">
            Mar 03, 2024
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>It's now possible to remove node groups from the spawner.</li>
          <li>It's now possible to add node groups to the spawner.</li>
          <li>It's now possible to change id of the node in the spawner. Autocomplete of available nodes will come
            later.
          </li>
          <li>It's now possible to remove id of the node from the spawner.</li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-8 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.0.3
          </span>
          <span className="text-sm text-muted-foreground">
            Mar 03, 2024
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Added helper text that explains where to put spawner files.</li>
          <li>Added a placeholder image for the spawner, which will show a screenshot of how the spawner looks in the
            game.
          </li>
          <li>Fixed layout for Items and Fixed Items forms.</li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-8 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.0.2
          </span>
          <span className="text-sm text-muted-foreground">
            Feb 27, 2024
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Display spawner items and their rarity.</li>
          <li>It is now possible to edit existing items rarity.</li>
          <li>It is now possible to remove items from the spawner.</li>
          <li>It is now possible to add items to the spawner. Currently, only .50 BMG ammo is available. More items will
            be added soon!
          </li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 mt-8 first:mt-0 flex justify-between items-baseline">
          <span className="text-3xl font-semibold tracking-tight">
            0.0.1
          </span>
          <span className="text-sm text-muted-foreground">
            Feb 26, 2024
          </span>
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-1">
          <li>Initial release.</li>
          <li>Added spawner presets from the game.</li>
          <li>It is now possible to inspect spawner Items, Fixed Items, Nodes, Subpresets, and Settings.</li>
          <li>It is now possible to modify existing spawner settings. Added tooltips for some settings.</li>
          <li>It is now possible to remove fixed items from the spawner.</li>
          <li>It is now possible to add fixed items to the spawner. Currently, only .50 BMG ammo is available. More
            items will be added soon!
          </li>
          <li>Added nodes from the game. Currently displayed in JSON format. Pretty printing with the ability to modify
            will be available soon!
          </li>
        </ul>
      </div>
    </div>
  );
}
