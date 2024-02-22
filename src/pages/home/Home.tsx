import { Alert } from "../../components/alert/Alert.tsx";

export function Home() {
  return (
    <main className="flow content-grid">

      <h1 className='site-title'>Welcome to SCUM Loot Tweaker</h1>
      <Alert>
        Upcoming features:
        <ul>
          <li>Adding & removing items to/from the spawners</li>
          <li>Adding & removing fixed items to/from the spawners</li>
          <li>Adding & removing nodes to/from the spawners</li>
          <li>Copying settings, items and nodes between spawners (e.g. customize one puppet spawner and copy those
            settings to other puppet spawners)
          </li>
          <li>Customizing existing nodes and your own</li>
          <li>Customizing parameters (allowing certain items to be spawned in particular locations, tuning spawn
            cooldowns, etc)
          </li>
          <li>Allowing to customize spawners for specific zones or sectors (e.g. selecting a region on the map and
            allowing to spawn only guns in that region)
          </li>
        </ul>
      </Alert>

    </main>
  );
}
