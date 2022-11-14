interface ArticleData {
    title: string;
    author: string;
    content: string;
    readMoreUrl: string;
    imageUrl: string;
}
function ArticleContainer({
    title,
    author,
    content,
    readMoreUrl,
    imageUrl,
}: ArticleData) {
    return (
        <div className="my-2 p-2 bg-slate-900/90 rounded" key={readMoreUrl}>
            <p className="text-white">{title}</p>
            <a href={readMoreUrl}>
                <img
                    src={imageUrl}
                    alt="relevant to news"
                    className="w-full rounded max-h-80"
                />
            </a>
            <p className="text-white">{content}</p>
            <div className="flex justify-center gap-4 bg-white/20 rounded">
                <p className="text-white">{author}</p>
                <a href={readMoreUrl} className="text-white underline">
                    Read More
                </a>
            </div>
        </div>
    );
}

export default ArticleContainer;
