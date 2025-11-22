import React, { useState, useMemo } from "react";
import type { Column as ColumnType, TwitterMessage } from "./types/twitter";
import { Column } from "./components/Column";
import { mockMessages } from "./data/mockMessages";
import { Button } from "./components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "./components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

function App() {
  const [columns, setColumns] = useState<ColumnType[]>([
    { id: "1", title: "All Messages", filter: "" },
    { id: "2", title: "Earthquakes", filter: "#sismo" },
    { id: "3", title: "Weather", filter: "#weather" },
  ]);

  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn: ColumnType = {
        id: Date.now().toString(),
        title: newColumnTitle,
        filter: "",
      };
      setColumns([...columns, newColumn]);
      setNewColumnTitle("");
      setIsDialogOpen(false);
    }
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter((col) => col.id !== id));
  };

  const updateColumnFilter = (id: string, filter: string) => {
    setColumns(
      columns.map((col) => (col.id === id ? { ...col, filter } : col)),
    );
  };

  const getFilteredMessages = (filter: string): TwitterMessage[] => {
    if (!filter.trim()) {
      return mockMessages;
    }

    const lowerFilter = filter.toLowerCase();
    return mockMessages.filter((message) => {
      const contentLower = message.content.toLowerCase();
      const tagsLower = message.tags?.map((tag) => tag.toLowerCase()) || [];

      return (
        contentLower.includes(lowerFilter) ||
        tagsLower.some((tag) => tag.includes(lowerFilter.replace("#", "")))
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-white mb-1">X Message Filter Board</h1>
          <p className="text-gray-400">
            Organize and filter your X messages in customizable columns
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="w-5 h-5 mr-2" />
              Add Column
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                Create New Column
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-gray-300 mb-2 block">Column Title</label>
                <Input
                  type="text"
                  placeholder="Enter column title..."
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addColumn()}
                  className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                onClick={addColumn}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Create Column
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Columns Container */}
      <div
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ height: "calc(100vh - 180px)" }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            messages={getFilteredMessages(column.filter)}
            onRemove={removeColumn}
            onUpdateFilter={updateColumnFilter}
          />
        ))}

        {columns.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                No columns yet. Add your first column to get started!
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Column
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

App.displayName = "App";

export default App;
