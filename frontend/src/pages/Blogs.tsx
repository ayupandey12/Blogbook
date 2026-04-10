import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcards";
import { Spinner } from "../components/Spinner";
import { useBlogs } from "../hooks/useblog";

export const Blogs = () => {
    const { loading, blogs } = useBlogs()

    const formatDate = (dateString?: string) => {
        if (!dateString) return new Date().toLocaleDateString();
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#efede7] text-[#191512]">
            <Appbar />
            <main className="mx-auto max-w-6xl px-4 pb-14 pt-7 sm:px-6">
                <section className="border-b border-t border-[#4a4339] py-10 text-center">
                    <div className="mx-auto max-w-4xl space-y-4">
                        <div className="text-2xl text-[#353027]">===</div>
                        <h1 className="font-['Cinzel'] text-5xl font-semibold uppercase leading-tight tracking-tight text-[#1d1814] sm:text-6xl">
                            Welcome To
                            <br />
                            <span className="text-[#c9b89d]">Story</span>Book
                        </h1>
                        <p className="font-['Cormorant_Garamond'] text-sm uppercase tracking-[0.42em] text-[#50483d]">
                            - Volume 2026 -
                        </p>
                        <p className="font-['Cormorant_Garamond'] text-base italic text-[#5c5143]">
                            Verified stories only . Open to all readers
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <a
                            href="/publish"
                            className="inline-flex justify-center rounded-full border border-[#ccbda3] bg-[#f3e6cf] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f271e] transition hover:bg-[#ead8b8]"
                        >
                            Publish your story
                        </a>
                        <a
                            href="/"
                            className="inline-flex justify-center rounded-full border border-[#4a4339] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#342d25] transition hover:bg-[#e6ded0]"
                        >
                            Home
                        </a>
                    </div>
                </section>

                <section className="mt-12">
                    {loading ? (
                        <div className="flex min-h-[40vh] items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {blogs.map((post) => (
                                <Blogcard
                                    key={post.id}
                                    id={post.id}
                                    title={post.title}
                                    content={post.content}
                                    image={post.image}
                                    authorname={post.author.name}
                                    publishedDate={formatDate(post.createdAt)}
                                    topic={post.title.split(" ").slice(0, 2).join(" ")}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}
