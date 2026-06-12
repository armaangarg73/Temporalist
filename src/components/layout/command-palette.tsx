"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { Mail, Calendar, Bot, Home, Settings } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Ask Temporalist anything..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => router.push("/")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </CommandItem>

            <CommandItem onSelect={() => router.push("/inbox")}>
              <Mail className="mr-2 h-4 w-4" />
              Inbox
            </CommandItem>

            <CommandItem onSelect={() => router.push("/calendar")}>
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </CommandItem>

            <CommandItem onSelect={() => router.push("/agent")}>
              <Bot className="mr-2 h-4 w-4" />
              Agent
            </CommandItem>

            <CommandItem onSelect={() => router.push("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Suggested">
            <CommandItem>Summarize Inbox</CommandItem>

            <CommandItem>Draft Follow Up Email</CommandItem>

            <CommandItem>Schedule Meeting</CommandItem>

            <CommandItem>Search Emails</CommandItem>
          </CommandGroup>

          <CommandGroup heading="Actions">
            <CommandItem>Connect Gmail</CommandItem>

            <CommandItem>Connect Calendar</CommandItem>

            <CommandItem>Compose Email</CommandItem>

            <CommandItem>Schedule Meeting</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
