import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks/useblog";

export const Blog = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { loading, blog } = useBlog({ id: id ?? "" })

    useEffect(() => {
        if (!id) {
            navigate("/blogs")
        }
    }, [id, navigate])

    const formatDate = (dateString?: string) => {
        if (!dateString) return new Date().toLocaleDateString();
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#efede7] text-[#1d1914]">
                <Appbar />
                <div className="flex min-h-[70vh] items-center justify-center px-4">
                    <Spinner />
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#efede7] text-[#1d1914]">
                <Appbar />
                <main className="mx-auto max-w-5xl px-4 py-16 text-center">
                    <p className="font-['Cinzel'] text-lg font-semibold uppercase text-[#1d1914]">Blog not found.</p>
                    <Link
                        to="/blogs"
                        className="mt-6 inline-flex rounded-full border border-[#ccbda3] bg-[#f3e6cf] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f271e] transition hover:bg-[#ead8b8]"
                    >
                        Back to blogs
                    </Link>
                </main>
            </div>
        )
    }

    const topicLabel = blog.title.split(" ").slice(0, 2).join(" ")

    return (
        <div className="relative min-h-screen bg-[#efede7] text-[#1c1814]">
            <div className="pointer-events-none fixed inset-0">
                <img src={blog.image} alt={blog.title} className="h-screen w-screen object-cover" />
                <div className="absolute inset-0 bg-[#efede7]/78" />
            </div>
            <Appbar />
            <main className="relative z-10 mx-auto min-h-screen max-w-4xl px-4 pb-16 pt-8">
                <section className="text-center">
                    <h1 className="font-['Cinzel'] text-4xl font-semibold uppercase tracking-tight text-[#17130f] sm:text-6xl">
                        {blog.title}
                    </h1>
                    <p className="mt-3 font-['Cormorant_Garamond'] text-xs uppercase tracking-[0.3em] text-[#50473d]">
                        {topicLabel} . {formatDate(blog.createdAt)}
                    </p>
                    <div className="mx-auto mt-5 max-w-3xl border-b border-t border-[#4a4339] py-5 font-['Cormorant_Garamond'] text-lg italic text-[#3e372f]">
                        {blog.content.slice(0, 120)}...
                    </div>
                </section>

                <section className="relative mt-10 overflow-hidden border border-[#d7cab2] bg-[#f3ece0]/85 p-8 shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:p-10">
                    {/* <img
                        src={blog.image}
                        alt={blog.title}
                        className="pointer-events-none absolute -bottom-10 -left-16 hidden h-[85%] w-auto opacity-10 sm:block"
                    /> */}
                    <article className="relative font-['Cormorant_Garamond'] text-[22px] leading-8 text-[#2d261f]">
                        <div className="whitespace-pre-line first-letter:float-left first-letter:mr-2 first-letter:font-['Cinzel'] first-letter:text-6xl first-letter:font-semibold">
                            {blog.content}
                        </div>
                    </article>
                </section>

                <section className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#4a4339] pt-6">
                    <div className="font-['Cormorant_Garamond'] text-lg italic text-[#413830]">
                        By <span className="font-semibold not-italic">{blog.author.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center rounded-full border border-[#4a4339] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f271e] transition hover:bg-[#e6ded0]"
                        >
                            Back to blogs
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    )
}

export const Blogbyid = Blog