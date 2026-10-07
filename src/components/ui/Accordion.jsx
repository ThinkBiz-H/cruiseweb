import { useId, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/cn';

function AccordionItem({ item, open, onToggle, index }) {
  const uid = useId();
  const buttonId = `${uid}-btn`;
  const panelId = `${uid}-panel`;
  return (
    <div
      className={cn(
        'rounded-[18px] border bg-white transition-all duration-300',
        open ? 'border-brass/30 shadow-card' : 'border-line shadow-soft hover:border-brass/20 hover:shadow-card',
      )}
    >
      <h3 className="font-sans">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
        >
          <span className={cn('text-base font-bold transition-colors sm:text-lg', open ? 'text-brass' : 'text-foam group-hover:text-brass')}>
            {item.q}
          </span>
          <span
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[var(--ease-tide)]',
              open ? 'rotate-45 bg-brass text-white shadow-blue' : 'bg-tide text-brass group-hover:bg-brass/15',
            )}
          >
            <Plus className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl px-6 pb-6 leading-relaxed text-mist sm:px-7 sm:pr-16">{item.a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, defaultOpen = 0, className }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const toggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, i) => (
        <AccordionItem key={item.q} item={item} index={i} open={openIndex === i} onToggle={toggle} />
      ))}
    </div>
  );
}
