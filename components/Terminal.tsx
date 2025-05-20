"use client";
import { useState, useRef, useEffect } from "react";
import { about, education, projects, skillsSections, profile } from "../data/profile";

const help = `Available commands:\nabout\neducation\nprojects\nskills\nclear\nhelp`;

function getCommandOutput(cmd: string) {
  switch (cmd) {
    case "about":
      return about;
    case "education":
      return education;
    case "projects":
      return projects
        .map(
          (p) =>
            `- ${p.name}${p.url ? ` (link: ${p.url})` : ""}\n  ${p.description}`
        )
        .join("\n\n");
    case "skills":
      return skillsSections
        .map(
          (section) =>
            `# ${section.title}\n  ${section.items.join(", ")}`
        )
        .join("\n\n");
    case "help":
      return help;
    case "clear":
      return null;
    default:
      return `Command not found: ${cmd}\nType 'help' to see available commands.`;
  }
}

export default function Terminal() {
  const [history, setHistory] = useState<{ cmd: string; output: string | null }[]>([{ cmd: "help", output: help }]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      if (!cmd) return;
      if (cmd === "clear") {
        setHistory([]);
      } else {
        const output = getCommandOutput(cmd);
        setHistory((h) => [...h, { cmd, output }]);
      }
      setInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-black text-green-400 font-mono border-t-4 border-green-700 shadow-2xl">
      <div className="bg-green-900/80 px-4 py-2 flex items-center gap-2">
        <span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span>
        <span className="w-3 h-3 bg-yellow-400 rounded-full inline-block"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
        <span className="ml-4 text-green-200 text-xs">ahmed@portfolio:~</span>
      </div>
      <div className="p-6 h-[calc(100vh-56px)] overflow-y-auto">
        <div className="mb-6">
          <span className="block text-green-300 text-lg font-bold">{profile.name}</span>
          <span className="block text-green-400 text-sm">{profile.location}</span>
          <span className="block text-green-400 text-sm">{profile.phone}</span>
          <div className="flex gap-4 mt-2 text-green-200 text-sm flex-wrap">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300">LinkedIn</a>
            <a
              href="/AHMEDSABRI-RESUME.pdf"
              download
              className="underline hover:text-green-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>
        </div>
        {history.map((item, idx) => (
          <div key={idx} className="mb-2">
            <span className="text-green-300">$ {item.cmd}</span>
            {item.output && (
              <pre className="whitespace-pre-wrap text-green-400 text-base ml-2">{item.output}</pre>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-300">$</span>
          <input
            ref={inputRef}
            className="bg-transparent outline-none border-none text-green-400 ml-2 w-full"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            aria-label="Terminal command input"
          />
        </div>
        <div ref={scrollRef} />
      </div>
    </div>
  );
}