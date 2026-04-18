import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 mb-8 sm:mb-16">
      <div className="relative rangefinder-border p-0.5 sm:p-1 bg-tactical-gray/50 border border-tactical-border">
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-bullseye">
          <Search className="w-4 h-4 sm:w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="RANGEFINDER: SEARCH PROMPT LIBRARY..."
          className="w-full bg-transparent border-none focus:ring-0 text-[10px] sm:text-xs font-mono py-3 sm:py-4 pl-10 sm:pl-12 pr-4 placeholder:text-gray-600 uppercase tracking-widest"
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[8px] sm:text-[10px] font-mono text-gray-600 hidden xs:block">
          MODE: PRECISION
        </div>
      </div>
    </div>
  );
}
