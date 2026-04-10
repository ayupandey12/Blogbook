import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import { baseurl } from "../../config"
import { blogdata } from "../context/atom"

export interface Blog {
    title: string
    content: string
    image: string
    id: string
    author: {
        name: string
    }
    createdAt?: string
    updatedAt?: string
    published?: boolean
}

export const useBlog = ({ id }: { id: string }) => {
    const navigate = useNavigate()
    const [blogMap, setBlogMap] = useRecoilState(blogdata)
    const entry = id ? blogMap[id] : undefined
    const [loading, setLoading] = useState(() => !!(id && !blogMap[id]))

    useEffect(() => {
        if (!id) {
            setLoading(false)
            return
        }
        if (entry) {
            setLoading(false)
            return
        }

        setLoading(true)
        let cancelled = false

        const token = localStorage.getItem("token")
        const headers = token ? { Authorization: token } : {}

        axios
            .get(`${baseurl}/api/v1/blog/${id}`, { headers })
            .then((response) => {
                if (cancelled) return
                setBlogMap((prev) => ({ ...prev, [id]: response.data }))
                setLoading(false)
            })
            .catch(() => {
                if (cancelled) return
                alert(`blog is currently unavailable`)
                navigate("/blogs")
                setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [id, entry, navigate, setBlogMap])

    return { loading, blog: entry }
}

export const useBlogs = () => {
    const [loading, setloading] = useState(true)
    const [blogs, setblogs] = useState<Blog[]>([])
    const setBlogMap = useSetRecoilState(blogdata)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const headers = token ? { Authorization: token } : {}

        axios
            .get(`${baseurl}/api/v1/blog/bulk`, { headers })
            .then((response) => {
                const list = response.data as Blog[]
                setblogs(list)
                setBlogMap((prev) => {
                    const next = { ...prev }
                    for (const b of list) {
                        next[b.id] = b
                    }
                    return next
                })
                setloading(false)
            })
            .catch(() => {
                setloading(false)
            })
    }, [setBlogMap])

    return { loading, blogs }
}
