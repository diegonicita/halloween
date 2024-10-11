"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface ResourceInfo {
	public_id: string;
	secure_url: string;

	// You can add more properties as needed
}
export default function ButtonUpload() {
	const [resource, setResource] = useState<ResourceInfo>();
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (resource?.public_id) {
			const newUrl = `/cloudinary/${resource.public_id}`;

			// Use router.push to navigate to the new URL without reloading the page
			router.push(newUrl);

			// Alternatively, use router.replace if you want to replace the current history entry
			// router.replace(newUrl);
		}
	}, [resource?.public_id]);

	return (
		<section className="m-20">
			<CldUploadWidget
				uploadPreset="upload-image"
				options={{
					sources: ["local"],
					multiple: false,
					maxFiles: 1,
				}}
				onSuccess={(result) => {
					setResource(result?.info);
				}}
				onQueuesEnd={({ widget }) => {
					widget?.close();
				}}
			>
				{({ open }) => {
					function handleOnClick() {
						setResource(undefined);
						open();
					}
					return (
						<button
							type="button"
							className="btn btn-primary"
							onClick={handleOnClick}
						>
							Upload an Image
						</button>
					);
				}}
			</CldUploadWidget>
		</section>
	);
}
