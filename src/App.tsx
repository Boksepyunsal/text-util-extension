import { useState, useEffect, useMemo } from 'react';
import { Plus, Copy, Trash2, Check, X, Search } from 'lucide-react';
import type { TextItem } from './types';
import { getItems, saveItems } from './lib/storage';

function App() {
  const [items, setItems] = useState<TextItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(items.map(i => i.category));
    return ['All', ...Array.from(cats).sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newCategory) return;

    const newItem: TextItem = {
      id: crypto.randomUUID(),
      title: newTitle,
      content: newContent,
      category: newCategory,
      createdAt: Date.now(),
    };

    const updated = [...items, newItem];
    setItems(updated);
    await saveItems(updated);
    
    setNewTitle('');
    setNewContent('');
    setNewCategory(''); 
    setIsFormOpen(false);
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Delete this item?')) return;
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    await saveItems(updated);
  };

  return (
    <div className="w-[400px] h-[500px] bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Text Util</h1>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          title="Add New Text"
        >
          <Plus size={20} />
        </button>
      </header>

      {/* Add Form Modal */}
      {isFormOpen && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-semibold text-gray-800">Add New Text</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Category</label>
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="e.g., Work, Personal"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                  list="category-suggestions"
                />
                <datalist id="category-suggestions">
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g., Office Address"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Content</label>
                <textarea 
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="The text you want to copy..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px] resize-none transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                Save Text
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Category Tabs & Search */}
        <div className="bg-white border-b border-gray-200">
          <div className="p-2 overflow-x-auto flex gap-2 no-scrollbar scroll-smooth" style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-blue-100 text-blue-700 shadow-sm ring-1 ring-blue-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="px-4 pb-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
             </div>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.length === 0 ? (
             <div className="text-center py-10 text-gray-400">
                <p>No items found.</p>
                <p className="text-sm">Click + to add one.</p>
             </div>
          ) : (
            filteredItems.map(item => (
                <TextCard key={item.id} item={item} onDelete={handleDelete} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

const TextCard = ({ item, onDelete }: { item: TextItem, onDelete: (id: string) => void }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(item.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 group">
            <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                            {item.category}
                        </span>
                        <h3 className="font-semibold text-gray-800 mt-1">{item.title}</h3>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-sm text-gray-600 break-all font-mono border border-gray-100 relative group/code">
                    <p className="line-clamp-2">{item.content}</p>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none" />
                </div>
                <div className="mt-3 flex justify-end">
                    <button 
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                            copied 
                                ? 'bg-green-100 text-green-700 ring-1 ring-green-200' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                        }`}
                    >
                        {copied ? (
                            <>
                                <Check size={14} strokeWidth={3} />
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;