"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";

export const HeaderSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/article/search?q=${query}`,
        );
        setResults(response.data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative pointer-events-auto" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-all text-white border border-white/20 active:scale-95 shadow-lg shadow-white/5"
      >
        <Search className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed sm:absolute top-[100px] sm:top-16 left-4 right-4 sm:left-auto sm:right-0 mx-auto sm:mx-0 w-auto sm:w-96 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden z-[70]"
          >
            <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center gap-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                placeholder="Search stories..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-foreground placeholder:text-muted-foreground"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              )}
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
              {results.length > 0 ? (
                results.map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/blogs/details/${post.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block p-3 hover:bg-primary/10 rounded-xl transition-all"
                  >
                    <p className="text-sm line-clamp-1 text-foreground">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {post.content}
                    </p>
                  </Link>
                ))
              ) : query.trim().length >= 2 ? (
                <div className="p-8 text-center">
                  <p className="text-sm font-bold text-foreground">
                    No stories found
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try different keywords or check spelling.
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm font-bold text-foreground">
                    What are you looking for?
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Type title or content to search...
                  </p>
                </div>
              )}
            </div>
            {results.length > 0 && (
              <div className="p-3 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10">
                <p className="text-[10px] text-center uppercase tracking-widest font-black text-muted-foreground">
                  {results.length} results found
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
