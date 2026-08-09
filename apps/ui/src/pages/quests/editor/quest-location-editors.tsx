import {Plus, Trash2} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import type {InteractionLocation, MapLocation} from '@/data/quests/quests.types.ts';
import {removeAt, updateAt} from '@/lib/array.ts';
import {Field, InfoHint, NumberInput, TextInput} from './quest-editor-fields.tsx';

function parseCoordinates(input: string): {X: number; Y: number; Z: number} | null {
  const positionPart = input.split('|')[0];
  const grab = (axis: string) => {
    const match = positionPart.match(new RegExp(`${axis}\\s*=\\s*(-?\\d+(?:\\.\\d+)?)`));
    return match ? Number(match[1]) : null;
  };
  const x = grab('X');
  const y = grab('Y');
  const z = grab('Z');
  if (x !== null && y !== null && z !== null) return {X: x, Y: y, Z: z};

  const nums = input
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  if (nums.length >= 3) return {X: nums[0], Y: nums[1], Z: nums[2]};

  return null;
}

function locationToText(location: MapLocation['Location']): string {
  if (typeof location === 'string') return location;
  return `${location.X}, ${location.Y}, ${location.Z}`;
}

export function MapLocationsEditor({
                                     value,
                                     onChange,
                                   }: {
  value: MapLocation[];
  onChange: (next: MapLocation[]) => void;
}) {
  const markers = value;

  const setLocation = (index: number, text: string) => {
    const parsed = parseCoordinates(text);
    onChange(updateAt(markers, index, {...markers[index], Location: parsed ?? text}));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Map markers (optional)</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange([...markers, {Location: {X: 0, Y: 0, Z: 0}, SizeFactor: 1}])}
        >
          <Plus/>
          Add marker
        </Button>
      </div>
      {markers.length === 0 ? (
        <p className="text-sm text-muted-foreground">No map markers.</p>
      ) : (
        markers.map((marker, i) => (
          <div key={i} className="flex items-end gap-2">
            <Field
              label={
                <span>
                                    Location — look it up on{' '}
                  <a
                    href="https://scum-map.com/en/catalog/scum/island"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                                        scum-map.com
                                    </a>
                                </span>
              }
              className="flex-1"
            >
              <TextInput
                value={locationToText(marker.Location)}
                onChange={(v) => setLocation(i, v)}
                placeholder="{X=… Y=… Z=…}  ·  #Teleport x y z  ·  x, y, z"
              />
            </Field>
            <Field label="Size" className="w-24">
              <NumberInput
                step={0.1}
                value={marker.SizeFactor}
                onChange={(v) => onChange(updateAt(markers, i, {...marker, SizeFactor: v ?? 0}))}
              />
            </Field>
            <Button
              variant="ghost"
              size="icon"
              title="Remove marker"
              onClick={() => onChange(removeAt(markers, i))}
            >
              <Trash2/>
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

export function InteractionLocationsEditor({
                                             value,
                                             onChange,
                                           }: {
  value: InteractionLocation[];
  onChange: (next: InteractionLocation[]) => void;
}) {
  const locations = value.length > 0 ? value : [{AnchorMesh: ''}];
  const set = (index: number, patch: Partial<InteractionLocation>) =>
    onChange(updateAt(locations, index, {...locations[index], ...patch}));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm font-medium">
                    Interaction points
                    <span className="text-destructive">*</span>
                    <InfoHint
                      text="Use #GetMeshInfo in-game while looking at an object to capture its mesh name, instance, transform, etc."/>
                </span>
        <Button variant="outline" size="sm" onClick={() => onChange([...locations, {AnchorMesh: ''}])}>
          <Plus/>
          Add point
        </Button>
      </div>
      {locations.map((location, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-md border p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Point {i + 1}</span>
            <Button
              variant="ghost"
              size="icon"
              title="Remove point"
              onClick={() => onChange(removeAt(locations, i))}
            >
              <Trash2/>
            </Button>
          </div>
          <Field label="Anchor mesh" required>
            <TextInput
              value={location.AnchorMesh}
              onChange={(v) => set(i, {AnchorMesh: v})}
              placeholder="/Game/World/…/BP_Switch.BP_Switch_C"
            />
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Instance">
              <NumberInput value={location.Instance} onChange={(v) => set(i, {Instance: v})}/>
            </Field>
            <Field label="Visible mesh">
              <TextInput
                value={location.VisibleMesh ?? ''}
                onChange={(v) => set(i, {VisibleMesh: v || undefined})}
                placeholder="/Game/…/Shape_Cube.Shape_Cube"
              />
            </Field>
          </div>
          <Field label="Fallback transform">
            <TextInput
              value={location.FallbackTransform ?? ''}
              onChange={(v) => set(i, {FallbackTransform: v || undefined})}
              placeholder="X=… Y=… Z=… Pitch=… Yaw=… Roll=…"
            />
          </Field>
        </div>
      ))}
    </div>
  );
}
