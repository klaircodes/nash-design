import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon.jsx';
import { ease, dur, liquid } from '../lib/motion.js';
import { MODELS, PROVIDERS, FILTERS, SORTS, PERSONAS, fmtDate } from '../lib/data.js';

const meta = m => `${fmtDate(m.date)} · ${m.tags.includes('vision') ? 'Vision'
  : m.tags.includes('open-source') ? 'Open source' : 'Text'}`;

export default function ModelPicker({ open, model, pinned, onPick, onPin, onClose }) {
  const [view, setView]     = useState({ kind:'root' });
  const [query, setQuery]   = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort]     = useState('newest');
  const [sortOpen, setSortOpen] = useState(false);

  /* a fresh open always starts at the root */
  useEffect(() => {
    if (open) { setView({ kind:'root' }); setQuery(''); setFilter('all'); setSortOpen(false); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key !== 'Escape') return;
      if (sortOpen) setSortOpen(false);
      else if (view.kind !== 'root') setView({ kind:'root' });
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, view, sortOpen, onClose]);

  const q = query.trim().toLowerCase();

  const match = m =>
    (filter === 'all' || m.tags.includes(filter)) &&
    (!q || m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q));

  const sorted = list => {
    const c = [...list];
    if (sort === 'az')     c.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'newest') c.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === 'oldest') c.sort((a, b) => a.date.localeCompare(b.date));
    return c;
  };

  /* root */
  const rootPinned = useMemo(
    () => sorted(MODELS.filter(m => pinned.includes(m.name) && match(m))),
    [pinned, q, filter, sort]);
  const rootProviders = useMemo(() => PROVIDERS
    .map(p => ({ ...p, count: MODELS.filter(m => m.provider === p.name && match(m)).length }))
    .filter(p => p.count > 0), [q, filter]);

  /* provider */
  const provModels = useMemo(() => {
    if (view.kind !== 'provider') return [];
    return sorted(MODELS.filter(m => m.provider === view.name && match(m)));
  }, [view, q, filter, sort]);
  const provPinned = provModels.filter(m => pinned.includes(m.name));
  const provRest   = provModels.filter(m => !pinned.includes(m.name));

  const personas = PERSONAS.filter(p => !q || p.toLowerCase().includes(q));

  const clearAll = () => { setQuery(''); setFilter('all'); };
  const filterLabel = FILTERS.find(f => f.key === filter)?.label;

  const Row = ({ m }) => (
    <motion.div className="mrow" onClick={() => onPick(m.name)}
      whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
      <div className="mt">
        <div className="mn">
          <span className="name">{m.name}</span>
          {m.isNew && <span className="newtag">New</span>}
        </div>
        <div className="mm">{meta(m)}</div>
      </div>
      {model === m.name && <span className="tick"><Icon name="check" size={16} /></span>}
      <motion.button
        className={`pinbtn ${pinned.includes(m.name) ? 'on' : ''}`}
        onClick={e => { e.stopPropagation(); onPin(m.name); }}
        aria-label={pinned.includes(m.name) ? 'Unpin' : 'Pin'}
        animate={{ opacity: pinned.includes(m.name) ? 1 : 0.45 }}
        whileHover={{ opacity: 1, color:'var(--t1)' }} whileTap={{ scale: 0.86 }}
        transition={{ duration: dur.hover, ease }}
      >
        <Icon name="pin" size={15} />
      </motion.button>
    </motion.div>
  );

  const Empty = ({ what }) => (
    <div className="mempty">
      <b>No {what} match{q ? ` “${query}”` : ''}</b>
      <p>{filter !== 'all'
        ? <>The <b style={{fontWeight:500}}>{filterLabel}</b> filter is narrowing this down.</>
        : 'Try a shorter search.'}</p>
      {(q || filter !== 'all') && <button onClick={clearAll}>Clear search and filters</button>}
    </div>
  );

  const Filters = () => (
    <div className="filterbar">
      <div className="filters">
        <span className="flabel">Filter</span>
        {FILTERS.map(f => (
          <motion.button key={f.key} className={`fpill ${filter === f.key ? 'on' : ''}`}
            onClick={() => setFilter(f.key)}
            whileHover={filter === f.key ? {} : { backgroundColor:'var(--border)' }}
            whileTap={{ scale: 0.97 }} transition={{ duration: dur.hover, ease }}>
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* outside the scrolling strip, so the menu is never clipped */}
      <motion.button className={`fsort ${sortOpen ? 'on' : ''}`}
        onClick={() => setSortOpen(v => !v)} aria-label="Sort"
        whileHover={{ backgroundColor:'var(--surface)', color:'var(--t1)' }}
        whileTap={{ scale: 0.94 }} transition={{ duration: dur.hover, ease }}>
        <Icon name="sort" size={15} />
      </motion.button>

      <AnimatePresence>
        {sortOpen && (
          <motion.div className="sortmenu"
            initial={{ opacity:0, y:-6, scale:.98 }} animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-6, scale:.98 }} transition={{ duration:0.18, ease }}>
            {SORTS.map(s => (
              <motion.button key={s.key} className="sortrow"
                onClick={() => { setSort(s.key); setSortOpen(false); }}
                whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}
                transition={{ duration: dur.hover, ease }}>
                {s.label}
                {sort === s.key && <span className="tick"><Icon name="check" size={14} /></span>}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const Search = ({ placeholder }) => (
    <div className="msearch">
      <Icon name="search" size={15} />
      <input autoFocus value={query} placeholder={placeholder}
             onChange={e => setQuery(e.target.value)} />
      {query && (
        <button className="clear" onClick={() => setQuery('')} aria-label="Clear search">
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );

  if (!open) return null;

  return (
    <motion.div className="scrim" onClick={onClose}
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      transition={{ duration:0.18, ease }}>
      <motion.div className="mpanel" onClick={e => e.stopPropagation()}
        initial={{ opacity:0, y:10, scale:.99 }} animate={{ opacity:1, y:0, scale:1 }}
        exit={{ opacity:0, y:8, scale:.99 }} transition={liquid}>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={view.kind + (view.name || '')}
            style={{ display:'flex', flexDirection:'column', minHeight:0, flex:1 }}
            initial={{ opacity:0, x: view.kind === 'root' ? -14 : 14 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x: view.kind === 'root' ? 14 : -14 }}
            transition={{ duration: dur.swap, ease }}>

            {view.kind === 'root' && (<>
              <div className="mhead">
                <div className="tt"><h3>Select Model</h3><small>17,000+ models · 200+ providers</small></div>
                <motion.button className="iconbtn" onClick={onClose}
                  whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}><Icon name="x" size={16} /></motion.button>
              </div>
              <Search placeholder="Search 17,000+ models..." />
              <Filters />
              <div className="mscroll">
                {rootPinned.length > 0 && (<>
                  <div className="mlabel">Pinned</div>
                  {rootPinned.map(m => <Row key={m.name} m={m} />)}
                </>)}

                {!q && filter === 'all' && (
                  <motion.button className="mrow card" onClick={() => setView({ kind:'personas' })}
                    whileHover={{ backgroundColor:'var(--elevated)' }} transition={{ duration: dur.hover, ease }}>
                    <div className="mt"><div className="mn"><span className="name">Personas</span></div>
                      <div className="mm">{PERSONAS.length} saved presets</div></div>
                    <Icon name="chevR" size={16} />
                  </motion.button>
                )}

                {rootProviders.length > 0 && (<>
                  <div className="mlabel">Providers · most used first</div>
                  {rootProviders.map(p => (
                    <motion.button key={p.name} className="mrow"
                      onClick={() => setView({ kind:'provider', name:p.name })}
                      whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
                      <div className="mt">
                        <div className="mn"><span className="name">{p.name}</span>
                          <span className="count">{p.count}</span></div>
                        <div className="mm">{p.note}</div>
                      </div>
                      <Icon name="chevR" size={16} />
                    </motion.button>
                  ))}
                </>)}

                {rootPinned.length === 0 && rootProviders.length === 0 && <Empty what="models" />}
              </div>
            </>)}

            {view.kind === 'provider' && (<>
              <div className="mhead">
                <motion.button className="iconbtn" onClick={() => setView({ kind:'root' })}
                  whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}><Icon name="chevL" size={16} /></motion.button>
                <div className="tt"><h3>{view.name}</h3>
                  <small>{MODELS.filter(m => m.provider === view.name).length} models · {
                    MODELS.filter(m => m.provider === view.name).every(m => m.tags.includes('vision'))
                      ? 'all support vision' : 'mixed capabilities'}</small></div>
                <motion.button className="iconbtn" onClick={onClose}
                  whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}><Icon name="x" size={16} /></motion.button>
              </div>
              <Search placeholder={`Search ${view.name} models...`} />
              <Filters />
              <div className="mscroll">
                {provPinned.length > 0 && (<>
                  <div className="mlabel">Pinned</div>
                  {provPinned.map(m => <Row key={m.name} m={m} />)}
                </>)}
                {provRest.length > 0 && (<>
                  <div className="mlabel">All models · {SORTS.find(s => s.key === sort).label.toLowerCase()}</div>
                  {provRest.map(m => <Row key={m.name} m={m} />)}
                </>)}
                {provModels.length === 0 && <Empty what={`${view.name} models`} />}
              </div>
            </>)}

            {view.kind === 'personas' && (<>
              <div className="mhead">
                <motion.button className="iconbtn" onClick={() => setView({ kind:'root' })}
                  whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}><Icon name="chevL" size={16} /></motion.button>
                <div className="tt"><h3>Personas</h3><small>{PERSONAS.length} saved presets</small></div>
                <motion.button className="iconbtn" onClick={onClose}
                  whileHover={{ backgroundColor:'var(--hover)', color:'var(--t1)' }}><Icon name="x" size={16} /></motion.button>
              </div>
              <Search placeholder="Search personas..." />
              <div className="mscroll">
                {personas.map(p => (
                  <motion.button key={p} className="mrow" onClick={() => onPick(p)}
                    whileHover={{ backgroundColor:'var(--hover)' }} transition={{ duration: dur.hover, ease }}>
                    <div className="mt"><div className="mn"><span className="name">{p}</span></div>
                      <div className="mm">Persona</div></div>
                    {model === p && <span className="tick"><Icon name="check" size={16} /></span>}
                  </motion.button>
                ))}
                {personas.length === 0 && <Empty what="personas" />}
              </div>
            </>)}

          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
