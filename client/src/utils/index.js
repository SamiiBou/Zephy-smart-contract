export function clsx(obj = []) {
  if (Array.isArray(obj)) {
    return obj.filter(e => e).join(" ");
  }

  if (typeof obj === 'object') {
    return Object.entries(obj).filter(([_cls, state]) => state && _cls).map(([_class,]) => _class).join(' ')
  }
}

export function randomizeAvatars(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}