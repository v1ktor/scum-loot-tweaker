import { Alert } from "../../components/alert/Alert.tsx";

export function Changelog() {
  const currentVersion = '0.0.6';

  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Changelog</h1>
      <Alert children={`Current version: ${currentVersion}`}></Alert>
      <div>
        <h2 style={{ display: 'inline' }}>0.0.6</h2> - 01.10.2024
        <ul>
          <li>Most of the items can now be changed in the spawners</li>
          <li>Added spawners, nodes, parameters and cooldown groups from 0.9542.80211 game version</li>
        </ul>
      </div>
      <div>
        <h2 style={{ display: 'inline' }}>0.0.5</h2> - 05.03.2024
        <ul>
          <li>It's now possible to inspect in-game nodes. It will show the name of the node and its rarity. If the node
            contains items, they will also be displayed along with their rarities.
          </li>
        </ul>
      </div>
      <div>
        <h2 style={{ display: 'inline' }}>0.0.4</h2> - 03.03.2024
        <ul>
          <li>It's now possible to remove node groups from the spawner.</li>
          <li>It's now possible to add node groups to the spawner.</li>
          <li>It's now possible to change id of the node in the spawner. Autocomplete of available nodes will come
            later.
          </li>
          <li>It's now possible to remove id of the node from the spawner.</li>
        </ul>
      </div>
      <div>
        <h2 style={{ display: 'inline' }}>0.0.3</h2> - 03.03.2024
        <ul>
          <li>Added helper text that explains where to put spawner files.</li>
          <li>Added a placeholder image for the spawner, which will show a screenshot of how the spawner looks in the
            game.
          </li>
          <li>Fixed layout for Items and Fixed Items forms.</li>
        </ul>
      </div>
      <div>
        <h2 style={{ display: 'inline' }}>0.0.2</h2> - 27.02.2024
        <ul>
          <li>Display spawner items and their rarity.</li>
          <li>It is now possible to edit existing items rarity.</li>
          <li>It is now possible to remove items from the spawner.</li>
          <li>It is now possible to add items to the spawner. Currently, only .50 BMG ammo is available. More items will
            be added soon!
          </li>
        </ul>
      </div>
      <div>
        <h2 style={{ display: 'inline' }}>0.0.1</h2> - 26.02.2024
        <ul>
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


    </main>
  );
}
