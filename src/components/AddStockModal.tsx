import React, { useState } from 'react';
import { X, Plus, Search } from 'lucide-react';
import { Stock, WatchlistTag } from '../types/Stock';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (stock: Stock) => void;
  availableTags: WatchlistTag[];
}

export default function AddStockModal({ isOpen, onClose, onAdd, availableTags }: AddStockModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [stockData, setStockData] = useState<Partial<Stock> | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const fetchYahooFinanceData = async (symbol: string): Promise<Partial<Stock> | null> => {
    try {
      // Using proxied Yahoo Finance API endpoint
      const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error('Empty response from API');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        throw new Error('Invalid JSON response from API');
      }

      if (data.chart?.result?.[0]) {
        const result = data.chart.result[0];
        const meta = result.meta;
        
        if (meta) {
          const currentPrice = meta.regularMarketPrice;
          const prevClose = meta.previousClose;
          const change = currentPrice - prevClose;
          const changePercent = (change / prevClose) * 100;

          return {
            symbol: meta.symbol,
            price: currentPrice,
            change: change,
            changePercent: changePercent,
            volume: meta.regularMarketVolume || 0,
            high: meta.regularMarketDayHigh || currentPrice,
            low: meta.regularMarketDayLow || currentPrice,
            preMarketPrice: meta.preMarketPrice,
            preMarketChange: meta.preMarketChange,
            preMarketChangePercent: meta.preMarketChangePercent,
          };
        }
      }
    } catch (error) {
      console.error(`Error fetching Yahoo Finance data for ${symbol}:`, error);
      throw error;
    }
    return null;
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const data = await fetchYahooFinanceData(searchQuery.toUpperCase());
      if (data) {
        setStockData(data);
      } else {
        alert('Stock not found. Please check the symbol and try again.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for stock. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stockData) {
      alert('Please search for a stock first.');
      return;
    }

    const newStock: Stock = {
      id: Date.now().toString(),
      symbol: stockData.symbol || searchQuery.toUpperCase(),
      name: `${stockData.symbol} Inc.`, // Yahoo doesn't provide company names in this endpoint
      price: stockData.price || 0,
      change: stockData.change || 0,
      changePercent: stockData.changePercent || 0,
      volume: stockData.volume || 0,
      high: stockData.high || stockData.price || 0,
      low: stockData.low || stockData.price || 0,
      notes: notes,
      tags: selectedTags,
      preMarketPrice: stockData.preMarketPrice,
      preMarketChange: stockData.preMarketChange,
      preMarketChangePercent: stockData.preMarketChangePercent
    };

    onAdd(newStock);
    
    // Reset form
    setSearchQuery('');
    setStockData(null);
    setSelectedTags([]);
    setNotes('');
    onClose();
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#2C2C2C] rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#F0F0F0]">Add Stock to Watchlist</h2>
          <button
            onClick={onClose}
            className="text-[#AAAAAA] hover:text-[#F0F0F0] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stock Search */}
          <div>
            <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
              Search Stock Symbol
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
                  placeholder="Enter symbol (e.g., AAPL, TSLA, NVDA)"
                  className="w-full pl-10 pr-4 py-2 bg-[#383838] border border-[#4A4A4A] rounded text-[#F0F0F0] focus:outline-none focus:border-[#39FF14]"
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="px-4 py-2 bg-[#39FF14] text-[#1A1A1A] rounded font-medium hover:bg-[#33E60C] transition-colors disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {/* Stock Data Preview */}
          {stockData && (
            <div className="bg-[#383838] rounded-lg p-4 border border-[#4A4A4A]">
              <h3 className="text-lg font-semibold text-[#F0F0F0] mb-3">Stock Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-[#AAAAAA]">Symbol:</span>
                  <div className="font-bold text-[#F0F0F0]">{stockData.symbol}</div>
                </div>
                <div>
                  <span className="text-[#AAAAAA]">Price:</span>
                  <div className="font-mono text-[#F0F0F0]">${stockData.price?.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-[#AAAAAA]">Change:</span>
                  <div className={`font-mono ${(stockData.change || 0) >= 0 ? 'text-[#39FF14]' : 'text-[#BF00FF]'}`}>
                    {(stockData.change || 0) >= 0 ? '+' : ''}${stockData.change?.toFixed(2)} ({(stockData.changePercent || 0) >= 0 ? '+' : ''}{stockData.changePercent?.toFixed(2)}%)
                  </div>
                </div>
                <div>
                  <span className="text-[#AAAAAA]">Volume:</span>
                  <div className="font-mono text-[#F0F0F0]">{stockData.volume?.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-[#AAAAAA]">High:</span>
                  <div className="font-mono text-[#F0F0F0]">${stockData.high?.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-[#AAAAAA]">Low:</span>
                  <div className="font-mono text-[#F0F0F0]">${stockData.low?.toFixed(2)}</div>
                </div>
                {stockData.preMarketPrice && (
                  <>
                    <div>
                      <span className="text-[#AAAAAA]">Pre-Market:</span>
                      <div className="font-mono text-[#F0F0F0]">${stockData.preMarketPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-[#AAAAAA]">Pre Change:</span>
                      <div className={`font-mono ${(stockData.preMarketChange || 0) >= 0 ? 'text-[#39FF14]' : 'text-[#BF00FF]'}`}>
                        {(stockData.preMarketChange || 0) >= 0 ? '+' : ''}${stockData.preMarketChange?.toFixed(2)}%
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tags Selection */}
          <div>
            <label className="block text-sm font-medium text-[#AAAAAA] mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.name)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    selectedTags.includes(tag.name)
                      ? 'text-[#1A1A1A] font-medium'
                      : 'text-[#F0F0F0] hover:text-[#1A1A1A]'
                  }`}
                  style={{
                    backgroundColor: selectedTags.includes(tag.name) ? tag.color : '#383838',
                    borderColor: tag.color,
                    borderWidth: '1px',
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#AAAAAA] mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-[#383838] border border-[#4A4A4A] rounded text-[#F0F0F0] focus:outline-none focus:border-[#39FF14] resize-none"
              placeholder="Trading notes..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#383838] text-[#AAAAAA] rounded hover:bg-[#4A4A4A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!stockData}
              className="flex-1 px-4 py-2 bg-[#39FF14] text-[#1A1A1A] rounded font-medium hover:bg-[#33E60C] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              Add Stock
            </button>
          </div>
        </form>

        {/* Yahoo Finance Attribution */}
        <div className="mt-4 pt-4 border-t border-[#383838] text-xs text-[#AAAAAA] text-center">
          Stock data provided by Yahoo Finance
        </div>
      </div>
    </div>
  );
}
