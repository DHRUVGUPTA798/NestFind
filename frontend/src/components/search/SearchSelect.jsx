import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function SearchSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const root = useRef(null)
  const listId = useId()
  const selected = options.find((option) => option.value === value) || options[0]

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => { if (!root.current?.contains(event.target)) setOpen(false) }
    const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const moveActive = (event) => {
    if (!open && ['ArrowDown', 'Enter', ' '].includes(event.key)) {
      event.preventDefault()
      setOpen(true)
      setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)))
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length)
    }
    if (event.key === 'Enter' && open) {
      event.preventDefault()
      onChange(options[activeIndex]?.value || '')
      setOpen(false)
    }
  }

  return (
    <div ref={root} className="relative min-w-0 flex-1">
      <button type="button" aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-activedescendant={open ? `${listId}-option-${activeIndex}` : undefined} onClick={() => { setOpen((state) => !state); setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value))) }} onKeyDown={moveActive} className="search-select-trigger flex w-full items-center justify-between gap-2 rounded-sm text-left text-sm font-semibold text-stone-900">
        <span className="truncate">{selected.label}</span><ChevronDown size={15} className="shrink-0 text-stone-400" />
      </button>
      {open && <div id={listId} role="listbox" aria-label={label} className="absolute left-0 top-full z-30 mt-3 max-h-64 w-56 overflow-y-auto rounded-xl border border-stone-200 bg-white p-1.5 shadow-xl">
        {options.map((option, index) => <button id={`${listId}-option-${index}`} key={option.value || 'any'} type="button" role="option" aria-selected={option.value === value} onMouseEnter={() => setActiveIndex(index)} onClick={() => { onChange(option.value); setOpen(false) }} className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm ${index === activeIndex ? 'bg-brand-50 text-brand-800' : 'text-stone-700'} ${option.value === value ? 'font-bold' : 'font-medium'}`}>
          {option.label}
        </button>)}
      </div>}
    </div>
  )
}
