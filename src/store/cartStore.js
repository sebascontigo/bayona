import { create } from 'zustand'

const CART_ITEM_TYPES = new Set(['producto', 'servicio'])

export function createCartKey(type, name) {
  const normalizedType = String(type ?? '').trim()
  const normalizedName = String(name ?? '').trim()

  if (!CART_ITEM_TYPES.has(normalizedType)) {
    throw new TypeError(`Tipo de carrito no válido: ${normalizedType || 'vacío'}`)
  }
  if (!normalizedName) throw new TypeError('El artículo del carrito necesita un nombre.')

  return `${normalizedType}:${normalizedName}`
}

function normalizeCartItem(item) {
  const type = String(item?.type ?? '').trim()
  const name = String(item?.name ?? '').trim()
  const priceCOP = Math.round(Number(item?.priceCOP))
  const qty = Math.max(1, Math.floor(Number(item?.qty) || 1))

  if (!Number.isFinite(priceCOP) || priceCOP < 0) {
    throw new TypeError(`Precio COP no válido para ${name || 'el artículo'}.`)
  }

  return {
    key: createCartKey(type, name),
    type,
    name,
    priceCOP,
    qty,
    media: item?.media?.src ? item.media : null,
    icon: item?.icon ?? null,
    img: item?.img ?? null,
  }
}

export const selectCartCount = ({ items }) => items.reduce((count, item) => count + item.qty, 0)
export const totalCOP = ({ items }) => items.reduce(
  (total, item) => total + (item.priceCOP * item.qty),
  0,
)
export const selectCartTotalCOP = totalCOP

export const useCartStore = create((set) => ({
  items: [],
  isOpen: false,
  lastAddedKey: null,
  addItem: (item) => set((state) => {
    const nextItem = normalizeCartItem(item)
    const currentItem = state.items.find(({ key }) => key === nextItem.key)

    if (!currentItem) {
      return {
        items: [...state.items, nextItem],
        isOpen: true,
        lastAddedKey: nextItem.key,
      }
    }

    return {
      items: state.items.map((cartItem) => (
        cartItem.key === nextItem.key
          ? {
              ...cartItem,
              priceCOP: nextItem.priceCOP,
              qty: cartItem.qty + nextItem.qty,
              media: nextItem.media ?? cartItem.media,
              icon: nextItem.icon ?? cartItem.icon,
              img: nextItem.img ?? cartItem.img,
            }
          : cartItem
      )),
      isOpen: true,
      lastAddedKey: nextItem.key,
    }
  }),
  setOpen: (isOpen) => set({ isOpen: Boolean(isOpen) }),
  clearLastAddedItem: () => set({ lastAddedKey: null }),
  removeItem: (key) => set((state) => ({
    items: state.items.filter((item) => item.key !== key),
  })),
  updateQty: (key, qty) => set((state) => {
    const nextQty = Math.max(0, Math.floor(Number(qty) || 0))

    return {
      items: nextQty === 0
        ? state.items.filter((item) => item.key !== key)
        : state.items.map((item) => (item.key === key ? { ...item, qty: nextQty } : item)),
    }
  }),
  clear: () => set({ items: [], lastAddedKey: null }),
}))
