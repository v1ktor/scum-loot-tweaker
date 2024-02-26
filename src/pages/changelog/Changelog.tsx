import { Alert } from "../../components/alert/Alert.tsx";

export function Changelog() {
  const currentVersion = '0.0.1';

  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Changelog</h1>
      <div>
        <Alert children={`Current version: ${currentVersion}`}></Alert>
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
