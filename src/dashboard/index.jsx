import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import GlobalApi from '../../service/GlobalApi';
import AddResume from './components/AddResume';
import ResumeCardItem from './components/ResumeCardItem';
import {
  Sparkles,
  FileText,
  Clock,
  FileX,
  Search,
  LayoutGrid,
  List as ListIcon,
  ArrowUpDown,
  ChevronDown,
  Pencil,
  Eye,
  Trash2,
  MoreVertical,
  TrendingUp,
  CalendarClock,
  X,
  Lightbulb,
  Command,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SORT_OPTIONS = [
  { id: 'updated_desc', label: 'Recently updated' },
  { id: 'title_asc', label: 'Title A → Z' },
  { id: 'title_desc', label: 'Title Z → A' },
  { id: 'created_asc', label: 'Oldest first' },
];

const FILTER_OPTIONS = [
  { id: 'all', label: 'All resumes' },
  { id: 'recent', label: 'Edited this week' },
];

const VIEW_MODES = { GRID: 'grid', LIST: 'list' };

const TIP_STORAGE_KEY = 'arb_dashboard_tip_dismissed';

/* ------------------------------------------------------------------ */
/*  Date utilities                                                     */
/* ------------------------------------------------------------------ */

/**
 * Resolves the most relevant timestamp for a resume record.
 * Falls back to createdAt when updatedAt is not present.
 */
function getResumeDate(resume) {
  const raw = resume?.updatedAt || resume?.createdAt;
  return raw ? new Date(raw) : null;
}

/**
 * Converts a Date into a short, human-friendly relative string
 * (e.g. "3h ago", "2d ago", "5w ago").
 */
function formatRelativeTime(date) {
  if (!date) return 'Unknown';
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 4) return `${diffWeek}w ago`;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** True when the given date falls within the last 7 days. */
function isWithinLastWeek(date) {
  if (!date) return false;
  const diffMs = Date.now() - date.getTime();
  return diffMs <= 7 * 24 * 60 * 60 * 1000;
}

/* ------------------------------------------------------------------ */
/*  Search / sort / filter pipeline                                    */
/* ------------------------------------------------------------------ */

/**
 * Applies search text, category filter, and sort order to the raw
 * resume list in a single pass. Pure function — safe to memoize.
 */
function filterAndSortResumes(list, { search, filterBy, sortBy }) {
  let result = [...list];

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter((r) => (r.title || 'untitled').toLowerCase().includes(q));
  }

  if (filterBy === 'recent') {
    result = result.filter((r) => isWithinLastWeek(getResumeDate(r)));
  }

  switch (sortBy) {
    case 'title_asc':
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      break;
    case 'title_desc':
      result.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
      break;
    case 'created_asc':
      result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
      break;
    case 'updated_desc':
    default:
      result.sort((a, b) => new Date(getResumeDate(b) || 0) - new Date(getResumeDate(a) || 0));
      break;
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Presentational: stat cards                                         */
/* ------------------------------------------------------------------ */

function StatCard({ icon, label, value, accent = 'purple' }) {
  const accentMap = {
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
  };
  return (
    <div className="flex items-center gap-3 bg-white border border-purple-100 rounded-xl px-4 py-3 shadow-sm">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${accentMap[accent]}`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toolbar controls                                                   */
/* ------------------------------------------------------------------ */

function SearchBar({ value, onChange, inputRef }) {
  return (
    <div className="relative flex-1 min-w-[220px]">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search resumes by title..."
        className="pl-9 pr-16 rounded-xl border-purple-200 focus:ring-purple-400"
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
        >
          <X size={14} />
        </button>
      ) : (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-gray-300 border border-gray-200 rounded px-1.5 py-0.5">
          <Command size={10} /> K
        </span>
      )}
    </div>
  );
}

function SortDropdown({ sortBy, setSortBy }) {
  const current = SORT_OPTIONS.find((o) => o.id === sortBy) || SORT_OPTIONS[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl px-3.5 py-2 hover:bg-gray-50 transition">
          <ArrowUpDown size={14} className="text-gray-400" />
          {current.label}
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs text-gray-400">Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SORT_OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.id}
            onClick={() => setSortBy(opt.id)}
            className={sortBy === opt.id ? 'text-purple-600 font-medium' : ''}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FilterChips({ filterBy, setFilterBy }) {
  return (
    <div className="flex items-center gap-2">
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setFilterBy(opt.id)}
          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition ${
            filterBy === opt.id
              ? 'bg-purple-600 text-white border-purple-600'
              : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-white">
      <button
        onClick={() => setViewMode(VIEW_MODES.GRID)}
        className={`p-1.5 rounded-lg transition ${
          viewMode === VIEW_MODES.GRID ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid size={16} />
      </button>
      <button
        onClick={() => setViewMode(VIEW_MODES.LIST)}
        className={`p-1.5 rounded-lg transition ${
          viewMode === VIEW_MODES.LIST ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
        }`}
        aria-label="List view"
      >
        <ListIcon size={16} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loading skeletons                                                  */
/* ------------------------------------------------------------------ */

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-full aspect-[3/4] rounded-2xl bg-purple-100/50 animate-pulse" />
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 w-full rounded-xl bg-purple-100/50 animate-pulse" />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty / no-results states                                          */
/* ------------------------------------------------------------------ */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-10 py-14">
      <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
        <FileX size={26} className="text-purple-400" />
      </div>
      <p className="text-gray-600 font-medium">No resumes yet</p>
      <p className="text-gray-400 text-sm mt-1 max-w-xs">
        Click the card above to create your first AI-powered resume.
      </p>
    </div>
  );
}

function NoResultsState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-10 py-14">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        <Search size={24} className="text-gray-400" />
      </div>
      <p className="text-gray-600 font-medium">No matching resumes</p>
      <p className="text-gray-400 text-sm mt-1 max-w-xs">
        Try a different search term or clear your filters.
      </p>
      <button onClick={onClear} className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700">
        Clear search & filters
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pro-tip banner (dismissible, remembered via localStorage)          */
/* ------------------------------------------------------------------ */

function ProTipBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(TIP_STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(TIP_STORAGE_KEY, 'true');
    } catch {
      /* ignore storage errors (private browsing etc.) */
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 mb-6">
      <div className="flex items-center gap-2 text-sm text-purple-700">
        <Lightbulb size={15} className="text-purple-500 shrink-0" />
        <span>
          Tip: press <strong>⌘K</strong> (or Ctrl+K) to jump straight to search.
        </span>
      </div>
      <button onClick={dismiss} className="text-purple-400 hover:text-purple-600 shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  List-view row (alternate rendering to ResumeCardItem)              */
/* ------------------------------------------------------------------ */

function ResumeListRow({ resume, refreshData }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await GlobalApi.DeleteResume(resume.documentId);
      toast.success('Resume deleted!');
      refreshData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const date = getResumeDate(resume);

  return (
    <div className="group flex items-center justify-between gap-4 bg-white border border-purple-100 rounded-xl px-4 py-3 hover:border-purple-300 hover:shadow-sm transition">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`} className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
          <FileText size={16} className="text-purple-500" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-700 truncate group-hover:text-purple-600 transition">
            {resume.title || 'Untitled'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">Edited {formatRelativeTime(date)}</p>
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1.5 rounded-lg hover:bg-purple-50 transition shrink-0">
            <MoreVertical size={16} className="text-gray-400 hover:text-purple-600" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
            className="gap-2 cursor-pointer"
          >
            <Pencil size={14} /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
            className="gap-2 cursor-pointer"
          >
            <Eye size={14} /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="gap-2 cursor-pointer text-red-500 focus:text-red-500">
            <Trash2 size={14} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Recent activity strip                                              */
/* ------------------------------------------------------------------ */

function RecentActivity({ resumes }) {
  const recent = useMemo(() => {
    return [...resumes]
      .filter((r) => getResumeDate(r))
      .sort((a, b) => getResumeDate(b) - getResumeDate(a))
      .slice(0, 3);
  }, [resumes]);

  if (recent.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <CalendarClock size={14} className="text-purple-400" />
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recent activity</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {recent.map((resume) => (
          <Link
            key={resume.documentId}
            to={`/dashboard/resume/${resume.documentId}/edit`}
            className="flex items-center gap-2 bg-white border border-purple-100 rounded-full px-3 py-1.5 text-xs text-gray-600 hover:border-purple-300 hover:text-purple-600 transition"
          >
            <FileText size={12} className="text-purple-400" />
            {resume.title || 'Untitled'}
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">{formatRelativeTime(getResumeDate(resume))}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Dashboard                                                      */
/* ------------------------------------------------------------------ */

const DashBoard = () => {
  const { user } = useUser();

  const [ResumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('updated_desc');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);
  const [highlightAdd, setHighlightAdd] = useState(false);

  const searchInputRef = useRef(null);
  const addResumeWrapperRef = useRef(null);

  useEffect(() => {
    if (user) GetResumeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Global ⌘K / Ctrl+K shortcut to focus the search box.
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const GetResumeList = () => {
    setLoading(true);
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => setResumeList(resp.data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const filteredResumes = useMemo(
    () => filterAndSortResumes(ResumeList, { search, filterBy, sortBy }),
    [ResumeList, search, filterBy, sortBy]
  );

  const stats = useMemo(() => {
    const total = ResumeList.length;
    const editedThisWeek = ResumeList.filter((r) => isWithinLastWeek(getResumeDate(r))).length;
    const mostRecentDate = ResumeList.reduce((latest, r) => {
      const d = getResumeDate(r);
      return d && (!latest || d > latest) ? d : latest;
    }, null);
    return { total, editedThisWeek, mostRecentDate };
  }, [ResumeList]);

  const handleClearFilters = () => {
    setSearch('');
    setFilterBy('all');
  };

  const scrollToCreate = () => {
    addResumeWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlightAdd(true);
    setTimeout(() => setHighlightAdd(false), 1500);
  };

  const hasActiveFilters = search.trim() !== '' || filterBy !== 'all';
  const showNoResults = !loading && ResumeList.length > 0 && filteredResumes.length === 0;
  const showEmpty = !loading && ResumeList.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-white">
      {/* ---------------------------------------------------------- */}
      {/* Hero header                                                 */}
      {/* ---------------------------------------------------------- */}
      <div className="bg-white border-b border-purple-100 px-10 md:px-20 lg:px-32 py-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Sparkles size={12} />
          AI Powered Resume Builder
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Resumes</h1>
            <p className="text-gray-400 mt-2 text-base">Create and manage your AI-powered resumes</p>
          </div>

          <button
            onClick={scrollToCreate}
            className="hidden md:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            <Sparkles size={15} />
            New Resume
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          <StatCard icon={<FileText size={16} />} label="Total resumes" value={stats.total} accent="purple" />
          <StatCard
            icon={<Clock size={16} />}
            label="Last edited"
            value={stats.mostRecentDate ? formatRelativeTime(stats.mostRecentDate) : '—'}
            accent="blue"
          />
          <StatCard
            icon={<TrendingUp size={16} />}
            label="Edited this week"
            value={stats.editedThisWeek}
            accent="green"
          />
          <StatCard icon={<Sparkles size={16} />} label="AI status" value="Enabled" accent="purple" />
        </div>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Toolbar + content                                           */}
      {/* ---------------------------------------------------------- */}
      <div className="px-10 md:px-20 lg:px-32 py-10">
        {!showEmpty && (
          <>
            <ProTipBanner />
            <RecentActivity resumes={ResumeList} />

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <SearchBar value={search} onChange={setSearch} inputRef={searchInputRef} />
              <FilterChips filterBy={filterBy} setFilterBy={setFilterBy} />
              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          </>
        )}

        {loading ? (
          viewMode === VIEW_MODES.GRID ? (
            <GridSkeleton />
          ) : (
            <ListSkeleton />
          )
        ) : showEmpty ? (
          <>
            <div
              ref={addResumeWrapperRef}
              className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 rounded-2xl transition-shadow ${
                highlightAdd ? 'ring-2 ring-purple-400 ring-offset-2' : ''
              }`}
            >
              <AddResume refreshData={GetResumeList} />
            </div>
            <EmptyState />
          </>
        ) : showNoResults ? (
          <NoResultsState onClear={handleClearFilters} />
        ) : viewMode === VIEW_MODES.GRID ? (
          <div
            ref={addResumeWrapperRef}
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 rounded-2xl transition-shadow ${
              highlightAdd ? 'ring-2 ring-purple-400 ring-offset-2' : ''
            }`}
          >
            {!hasActiveFilters && <AddResume refreshData={GetResumeList} />}
            {filteredResumes.map((resume, index) => (
              <ResumeCardItem resume={resume} key={resume.documentId || index} refreshData={GetResumeList} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredResumes.map((resume, index) => (
              <ResumeListRow resume={resume} key={resume.documentId || index} refreshData={GetResumeList} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
