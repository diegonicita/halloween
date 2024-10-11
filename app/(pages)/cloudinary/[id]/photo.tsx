"use client";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import Image from "next/image";
const TOPICS: Record<string, string> = {
	ghost: "Add scary ghosts to the background",
	zombies: "Add zombies to the background",
	devil: "Add some devils to the background",
	custom: "",
} as const;

export default function PhotoCloudinary({ id }: { id: string | undefined }) {
	const router = useRouter();
	const [imageUrl, setImageUrl] = useState(getCldImageUrl({ src: id }));
	const [loading, setLoading] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
	console.log(id, "photo");
	if (id == null) {
		router.push("/cloudinary");
		return null;
	}

	// useEffect(() => {
	// 	if (selectedTopic || id) {
	// 		const url = getCldImageUrl({
	// 			src: id,
	// 			replaceBackground: TOPICS[selectedTopic],
	// 		});
	// 		setPreviewUrl(url);
	// 		console.log(url, "topics");
	// 	}
	// }, [selectedTopic, id]);
	// const handleButtonClick = (topic: string) => {
	// 	setSelectedTopic(topic);
	// };
	// const handleDownload = () => {
	// 	if (!id) return;

	// 	const url = getCldImageUrl({ src: id, format: "avif" });
	// 	const a = document.createElement("a");
	// 	a.href = url;
	// 	a.download = "image.avif";
	// 	a.click();
	// 	console.log(url, "url");
	// };

	const handleButtonClick = (topic: string) => {
		const newUrl = getCldImageUrl({
			src: id,
		});
		setImageUrl(newUrl);
		setLoading(true);
		setSelectedTopic(topic);
		console.log(newUrl, "topics");
	};
	return (
		<>
			{id && (
				<CldImage
					alt="Uploaded image"
					src={imageUrl}
					width={500}
					height={500}
					crop="fill"
					sizes="100vw"
					style={{
						opacity: loading ? 0.3 : 1,
						transition: "opacity 0.3s ease",
					}}
					onLoad={() => {
						setLoading(false);
					}}
					replaceBackground={selectedTopic ? TOPICS[selectedTopic] : undefined}
				/>
			)}
			<div key={imageUrl} className="flex flex-row gap-5">
				{Object.keys(TOPICS).map((topic) => (
					<button
						className="btn btn-primary"
						type="button"
						key={topic}
						data-topic={topic}
						onClick={() => handleButtonClick(topic)}
					>
						{TOPICS[topic] || "Custom"}
					</button>
				))}
			</div>
			{/* <button type="button" onClick={handleDownload}>
				Download
			</button> */}
		</>
	);
}
