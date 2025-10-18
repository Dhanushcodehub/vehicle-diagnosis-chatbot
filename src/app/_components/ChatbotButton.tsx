// app/_components/ChatbotButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ChatbotSimple from "./ChatbotSimple";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg bg-indigo-500 hover:bg-indigo-600 px-5">
              Chat with AutoAid
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-slate-950/80 border-white/10">
            <DialogHeader>
              <DialogTitle>How can I help?</DialogTitle>
            </DialogHeader>
            <ChatbotSimple />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
