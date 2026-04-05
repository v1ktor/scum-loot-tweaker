import {useState} from 'react';
import {Node} from '@/pages/nodes/Nodes.types.ts';
import {Badge} from '@/components/ui/badge.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Input} from '@/components/ui/input.tsx';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog.tsx';
import {PackageIcon} from 'lucide-react';
import {ScrollArea} from '@/components/ui/scroll-area.tsx';
import {ChevronsDownUpIcon, ChevronsUpDownIcon, XIcon} from 'lucide-react';
import {getItemName} from '@/utils/get-item-name.ts';
import {readFile, FILE_TYPE} from '@/utils/read-file.ts';
import {POST_SPAWN_ACTIONS_OPTIONS} from '@/data/post-spawn-actions-options.ts';
import {TreeSidebarItem} from '@/pages/spawners/nodes/tree-sidebar-item.tsx';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@/components/ui/breadcrumb.tsx';
import {countAllLeafItems, countFilteredLeafItems} from '@/pages/spawners/nodes/utils.ts';

function getActionLabel(action: string): string {
  return POST_SPAWN_ACTIONS_OPTIONS.find((o) => o.value === action)?.label ?? action;
}

interface NodeTreeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NodeTreeDialog({open, onOpenChange}: NodeTreeDialogProps) {
  const [title, setTitle] = useState('');
  const [treeNode, setTreeNode] = useState<Node | null>(null);
  const [filter, setFilter] = useState('');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [defaultExpanded, setDefaultExpanded] = useState(false);

  const navigateToBreadcrumb = (index: number) => {
    if (!treeNode) return;
    const targetPath = selectedPath.slice(0, index + 1);
    let current: Node | undefined = treeNode;
    for (let i = 1; i < targetPath.length; i++) {
      current = current?.Children?.find((c) => c.Name === targetPath[i]);
      if (!current) return;
    }
    if (current) {
      setSelectedNode(current);
      setSelectedPath(targetPath);
    }
  };
  const [resetKey, setResetKey] = useState(0);

  const openForNode = async (nodeId: string) => {
    const parts = nodeId.split('.');
    const fileName = parts[1] + '.json';
    const pathParts = parts.slice(1);

    try {
      const data = await readFile<Node>({value: fileName, label: fileName}, FILE_TYPE.Nodes);
      let current: Node | undefined = data;
      let parent: Node | undefined = undefined;

      for (const part of pathParts) {
        parent = current;
        current = current?.Children?.find((c) => {
          return c.Name.toLowerCase() === part.toLowerCase()
        });
        if (!current) break;
      }

      setTitle(nodeId);
      setFilter('');
      setDefaultExpanded(true);
      setResetKey((k) => k + 1);

      if (current && (!current.Children || current.Children.length === 0)) {
        const wrapper: Node = {
          Name: parent?.Name ?? nodeId,
          Rarity: parent?.Rarity ?? current.Rarity,
          Children: [current],
        };
        setTreeNode(wrapper);
        setSelectedNode(wrapper);
      } else {
        setTreeNode(current ?? null);
        setSelectedNode(current ?? null);
        setSelectedPath(current ? [current.Name] : []);
      }

      onOpenChange(true);
    } catch {
      setTitle(nodeId);
      setTreeNode(null);
      setFilter('');
      setSelectedNode(null);
      onOpenChange(true);
    }
  };

  return {
    openForNode,
    dialog: (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>Node tree structure.</DialogDescription>
          </DialogHeader>
          {treeNode ? (
            <>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Filter items..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className={filter ? 'pr-8' : ''}
                  />
                  {filter && (
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setFilter('')}
                    >
                      <XIcon className="h-4 w-4"/>
                    </button>
                  )}
                </div>
                {filter && treeNode && (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {countFilteredLeafItems(treeNode, filter)}/{countAllLeafItems(treeNode)} items
                  </span>
                )}
                <Button variant="outline" size="sm" title="Expand all" onClick={() => {
                  setDefaultExpanded(true);
                  setResetKey((k) => k + 1);
                }}>
                  <ChevronsUpDownIcon className="h-4 w-4"/>
                </Button>
                <Button variant="outline" size="sm" title="Collapse all" onClick={() => {
                  setDefaultExpanded(false);
                  setResetKey((k) => k + 1);
                }}>
                  <ChevronsDownUpIcon className="h-4 w-4"/>
                </Button>
              </div>
              <div className="flex gap-4 overflow-hidden min-h-0 flex-1">
                <ScrollArea className="w-64 shrink-0 rounded-md border p-2">
                  <TreeSidebarItem
                    key={`${resetKey}-${defaultExpanded}`}
                    node={treeNode}
                    depth={0}
                    filter={filter}
                    selectedNode={selectedNode}
                    onSelect={(node, path) => { setSelectedNode(node); setSelectedPath(path); }}
                    defaultExpanded={defaultExpanded}
                  />
                </ScrollArea>
                <div className="flex-1 flex flex-col rounded-md border overflow-hidden min-h-0">
                  {selectedNode ? (
                    <>
                      <div className="px-4 py-3 border-b shrink-0">
                        <Breadcrumb>
                          <BreadcrumbList>
                            {selectedPath.map((name, i) => (
                              <BreadcrumbItem key={i}>
                                {i > 0 && <BreadcrumbSeparator />}
                                {i === selectedPath.length - 1 ? (
                                  <BreadcrumbPage>{name}</BreadcrumbPage>
                                ) : (
                                  <BreadcrumbLink className="cursor-pointer" onClick={() => navigateToBreadcrumb(i)}>{name}</BreadcrumbLink>
                                )}
                              </BreadcrumbItem>
                            ))}
                          </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                          <Badge variant="outline">{selectedNode.Rarity}</Badge>
                          {selectedNode.PostSpawnActions?.map((action) => (
                            <Badge key={action} variant="secondary" className="text-[10px] px-1.5 py-0">{getActionLabel(action)}</Badge>
                          ))}
                        </div>
                      </div>
                      <ScrollArea className="flex-1 min-h-0">
                        {(() => {
                          const leafItems = selectedNode.Children?.filter(
                            (c) => !c.Children || c.Children.length === 0
                          ) ?? [];
                          const filteredItems = filter
                            ? leafItems.filter((item) =>
                              getItemName(item.Name).toLowerCase().includes(filter.toLowerCase())
                            )
                            : leafItems;
                          return filteredItems.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 p-3">
                              {filteredItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 rounded-md border p-2 hover:bg-accent/50 transition-colors">
                                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted">
                                    <PackageIcon className="size-5 text-muted-foreground"/>
                                  </div>
                                  <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="text-sm font-medium truncate">{getItemName(item.Name)}</span>
                                    <div className="flex flex-wrap items-center gap-1">
                                      <Badge variant="outline" className="w-fit text-[10px] px-1.5 py-0">{item.Rarity}</Badge>
                                      {item.PostSpawnActions?.map((action) => (
                                        <Badge key={action} variant="secondary" className="w-fit text-[10px] px-1.5 py-0">{getActionLabel(action)}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="p-4 text-sm text-muted-foreground">No items in this node.</p>
                          );
                        })()}
                      </ScrollArea>
                    </>
                  ) : (
                    <p className="p-4 text-sm text-muted-foreground">Select a node from the sidebar.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Node not found.</p>
          )}
        </DialogContent>
      </Dialog>
    ),
  };
}
