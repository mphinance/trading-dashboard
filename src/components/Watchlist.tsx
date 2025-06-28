import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Share2 } from 'lucide-react';
import { Stock, SortField, SortDirection, WatchlistTag } from '../types/Stock';
import { mockStocks, mockTags } from '../utils/mockData';
import WatchlistRow from './WatchlistRow';
import AddStockModal from './AddStockModal';
import ShareModal from './ShareModal';
import TagFilter from './TagFilter';

export default function Watchlist() {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [tags] = useState<WatchlistTag[]>(mockTags);
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedTagFilters, setSelectedTagFilters] = useState<string[]>([]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredStocks = selectedTagFilters.length === 0 
    ? stocks 
    : stocks.filter(stock => 
        selectedTagFilters.some(tag => stock.tags.includes(tag))
      );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  const handleUpdateNotes = (id: string, notes: string) => {
    setStocks(prev => prev.map(stock => 
      stock.id === id ? { ...stock, notes } : stock
    ));
  };

  const handleUpdateTags = (id: string, newTags: string[]) => {
    setStocks(prev => prev.map(stock => 
      stock.id === id ? { ...stock, tags: newTags } : stock
    ));
  };

  const handleAddStock = (newStock: Stock) => {
    setStocks(prev => [...prev, newStock]);
  };

  const handleRemoveStock = (id: string) => {
    setStocks(prev => prev.filter(stock => stock.id !== id));
  };

  const handleTagToggle = (tagName: string) => {
    setSelectedTagFilters(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedTagFilters([]);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <div className="w-4 h-4" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="text-[#39FF14]" /> : 
      <ChevronDown size={16} className="text-[#39FF14]" />;
  };

  return (
    <div className="bg-[#2C2C2C] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-[#383838]">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-[#F0F0F0]">Watchlist</h2>
          <TagFilter
            tags={tags}
            selectedTags={selectedTagFilters}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearAllFilters}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#BF00FF] text-[#F0F0F0] rounded font-medium hover:bg-[#A000E6] transition-colors"
          >
            <Share2 size={16} />
            Share
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#39FF14] text-[#1A1A1A] rounded font-medium hover:bg-[#33E60C] transition-colors"
          >
            <Plus size={16} />
            Add Stock
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#383838] bg-[#242424]">
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center gap-2 text-[#AAAAAA] hover:text-[#F0F0F0] transition-colors font-medium text-sm"
                >
                  Symbol
                  <SortIcon field="symbol" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center gap-2 text-[#AAAAAA] hover:text-[#F0F0F0] transition-colors font-medium text-sm ml-auto"
                >
                  Last Price
                  <SortIcon field="price" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('changePercent')}
                  className="flex items-center gap-2 text-[#AAAAAA] hover:text-[#F0F0F0] transition-colors font-medium text-sm ml-auto"
                >
                  Change / Pre-Market
                  <SortIcon field="changePercent" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('high')}
                  className="flex items-center gap-2 text-[#AAAAAA] hover:text-[#F0F0F0] transition-colors font-medium text-sm ml-auto"
                >
                  High
                  <SortIcon field="high" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('low')}
                  className="flex items-center gap-2 text-[#AAAAAA] hover:text-[#F0F0F0] transition-colors font-medium text-sm ml-auto"
                >
                  Low
                  <SortIcon field="low" />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort('volume')}
                  className="flex items-center gap-2 text-[#AAAAAA] hover:text-[#F0F0F0] transition-colors font-medium text-sm ml-auto"
                >
                  Volume
                  <SortIcon field="volume" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-[#AAAAAA] font-medium text-sm">Tags</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-[#AAAAAA] font-medium text-sm">Notes</span>
              </th>
            </tr>
          </thead>
          <tbody className="group">
            {sortedStocks.map((stock) => (
              <WatchlistRow
                key={stock.id}
                stock={stock}
                onUpdateNotes={handleUpdateNotes}
                onUpdateTags={handleUpdateTags}
                onRemoveStock={handleRemoveStock}
                availableTags={tags}
              />
            ))}
          </tbody>
        </table>
      </div>

      <AddStockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStock}
        availableTags={tags}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        stocks={stocks}
      />
    </div>
  );
}