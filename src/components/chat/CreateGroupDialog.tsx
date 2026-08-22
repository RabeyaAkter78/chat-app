import React, { useState } from "react";
import { X, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers } from "@/lib/mockData";
import { UserProfile } from "@/types/chat";

interface CreateGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (name: string, memberIds: string[]) => void;
}

export default function CreateGroupDialog({
  isOpen,
  onClose,
  onCreateGroup,
}: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    onCreateGroup(groupName.trim(), selectedMembers);
    setGroupName("");
    setSelectedMembers([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 font-semibold">
            <Users className="h-5 w-5 text-primary" />
            <span>Create New Group</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="e.g. Project Alpha, Family Chat"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="bg-zinc-50/50 dark:bg-zinc-950/30 border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Members</Label>
            <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              {mockUsers.map((user) => {
                const isSelected = selectedMembers.includes(user.id);
                return (
                  <div
                    key={user.id}
                    onClick={() => handleToggleMember(user.id)}
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 font-semibold text-sm">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-zinc-400 dark:text-zinc-500">{user.phone}</div>
                      </div>
                    </div>
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!groupName.trim()}>
              Create Group
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
