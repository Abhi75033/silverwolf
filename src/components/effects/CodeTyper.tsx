import React, { useEffect, useMemo, useRef, useState } from "react";

interface CodeTyperProps {
  words: string[];
  typingSpeed?: number; // ms per char
  deletingSpeed?: number; // ms per char
  pauseTime?: number; // ms after complete word
}

const CodeTyper: React.FC<CodeTyperProps> = ({
  words,
  typingSpeed = 35,
  deletingSpeed = 25,
  pauseTime = 900,
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const activeWord = useMemo(() => words[index % words.length], [index, words]);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBlink((v) => !v), 500);
    return () => clearTimeout(timer);
  }, [blink]);

  useEffect(() => {
    if (!mounted.current) return;

    if (!deleting && subIndex === activeWord.length) {
      const t = setTimeout(() => setDeleting(true), pauseTime);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((i) => i + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, activeWord, words.length, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div className="font-mono text-muted-foreground">
      <div className="text-xs md:text-sm select-none">// Live preview</div>
      <pre className="overflow-hidden text-foreground text-sm md:text-base">
        <code>
          <span className="text-primary">const</span> <span className="text-wolf-blue">headline</span>
          <span className="text-primary"> = </span>
          <span className="text-tech-purple">"{activeWord.slice(0, subIndex)}"</span>
          <span className={`ml-1 inline-block h-5 w-[8px] align-[-3px] rounded-[1px] bg-primary ${blink ? "opacity-80" : "opacity-20"}`} />
          {";"}
        </code>
      </pre>
    </div>
  );
};

export default CodeTyper;
