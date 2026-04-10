import { atom, selectorFamily } from "recoil"
import type { Blog } from "../hooks/useblog"

export const blogdata = atom<Record<string, Blog>>({
    key: "blogdata",
    default: {}
})

/** Sync read from cache only. Populate via `useBlog` / `useBlogs` (they merge into `blogdata`). */
export const blogByIdSelector = selectorFamily({
    key: "blogByIdSelector",
    get:
        (id: string) =>
        ({ get }) =>
            get(blogdata)[id]
})
