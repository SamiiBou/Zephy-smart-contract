export function clsx(obj: Record<string, boolean> | string[]) {
  if (Array.isArray(obj)) {
    return obj.filter(e => e).join(" ");
  }

  if (typeof obj === 'object') {
    return Object.entries(obj).filter(([_cls, state]) => state && _cls).map(([_class, _]) => _class).join(' ')
  }
}