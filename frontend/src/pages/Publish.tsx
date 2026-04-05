import { useContext, useEffect, useState, type ChangeEvent } from "react"
import type { Blogposttype } from "@ayushdevinfer1/medium-common"
import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { baseurl,cloudName,uploadPreset } from "../../config"
import { Auth } from "../context/context"
import { Skeleton } from "../components/Skeleton"

export const Publish = () => {
    const { loggedin } = useContext(Auth)
    const navigate = useNavigate();
    
    const [publish, setpublish] = useState<Blogposttype>({
        title: "",
        content: "",
        image: "" 
    })

    useEffect(() => {
        if (loggedin === null) return;
        if (loggedin === false) navigate("/signin");
    }, [loggedin, navigate])

    // --- Cloudinary Widget Logic ---
    const uploadImage = () => {
        // @ts-ignore (if you don't have types for cloudinary window object)
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: cloudName, // Replace with your Cloudinary Cloud Name
                uploadPreset: uploadPreset,  // Replace with your Upload Preset
                sources: ["local", "url", "camera"],
                multiple: false,
            },
            (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    // Update the 'image' field in your state with the secure URL
                    setpublish({ ...publish, image: result.info.secure_url });
                }
            }
        );
        widget.open();
    };

    if (loggedin === null) return (
        <div className="flex justify-center">
            <div className="max-w-5xl w-full p-8"><Skeleton /><Skeleton /><Skeleton /></div>
        </div>
    );

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8 px-4">
                <div className="max-w-5xl w-full flex flex-col gap-4">
                    <input 
                        onChange={(e) => setpublish({ ...publish, title: e.target.value })} 
                        type="text" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Title" 
                    />

                    <TextEditor onChange={(e) => setpublish({ ...publish, content: e.target.value })} />

                    {/* Replace file input with Cloudinary Button */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={uploadImage}
                            type="button"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium"
                        >
                            {publish.image ? "Change Image" : "Upload Image"}
                        </button>
                        {publish.image && (
                            <span className="text-green-600 text-sm font-medium">✓ Image ready</span>
                        )}
                    </div>

                    {/* Preview of the uploaded image */}
                    {publish.image && (
                        <img src={publish.image} alt="Preview" className="rounded-lg max-h-60 object-cover w-fit" />
                    )}

                    <button 
                        onClick={async () => {
                            try {
                                const response = await axios.post(`${baseurl}/api/v1/blog`, publish, {
                                    headers: { Authorization: localStorage.getItem("token") }
                                });
                                navigate(`/blog/${response.data.id}`)
                            } catch (error) {
                                console.error("Error publishing:", error);
                                alert(`post not published retry again`);
                            }
                        }} 
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 w-fit"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="w-full mb-4 border rounded-lg overflow-hidden">
            <textarea 
                onChange={onChange} 
                rows={8} 
                className="focus:outline-none block w-full p-3 text-sm text-gray-800 bg-white border-0" 
                placeholder="Write an article..." 
                required 
            />
        </div>
    )
}
